#define main console_main_unused
#include "tender_automation.c"
#undef main

#include <shellapi.h>
#include <stdarg.h>

#define IDC_URL_EDIT        1001
#define IDC_URL_LIST        1002
#define IDC_ADD             1003
#define IDC_REMOVE          1004
#define IDC_CLEAR_URLS      1005
#define IDC_CRAWL           1006
#define IDC_CRAWL_SEND      1007
#define IDC_OPEN_REPORT     1008
#define IDC_CLEAR_HISTORY   1009
#define IDC_OPEN_FOLDER     1010
#define IDC_LOG             1011
#define IDC_STATUS          1012
#define IDC_SCHEDULE_ENABLE 1013
#define IDC_SCHEDULE_TIME1  1014
#define IDC_SCHEDULE_TIME2  1015
#define IDC_SAVE_SCHEDULE   1016
#define IDC_SCHEDULE_LABEL1 1017
#define IDC_SCHEDULE_LABEL2 1018
#define IDC_SCHEDULE_STATUS 1019
#define IDC_KEYWORD_EDIT    1020
#define IDC_SAVE_KEYWORDS   1021
#define IDC_KEYWORD_LABEL   1022

#define WM_GUI_LOG          (WM_APP + 1)
#define WM_GUI_DONE         (WM_APP + 2)

#define SCHEDULE_FILE_A     "D:\\TenderDocs\\schedule.txt"
#define SCHEDULE_TIMER_ID   2001
#define SCHEDULE_TIMER_MS   30000U

typedef struct ScheduleConfig {
    BOOL enabled;
    int minute1;
    int minute2;
    int lastRunDate[2];
} ScheduleConfig;

typedef struct AppState {
    HWND hwnd;
    HWND urlEdit;
    HWND urlList;
    HWND logEdit;
    HWND statusText;
    HWND scheduleCheck;
    HWND scheduleTime1;
    HWND scheduleTime2;
    HWND scheduleSaveButton;
    HWND scheduleLabel1;
    HWND scheduleLabel2;
    HWND scheduleStatus;
    HWND keywordLabel;
    HWND keywordEdit;
    HWND keywordSaveButton;
    HWND buttons[8];
    HFONT font;
    ScheduleConfig schedule;
    volatile LONG running;
} AppState;

typedef struct WorkerArgs {
    HWND hwnd;
    BOOL sendToWeChat;
    BOOL scheduledRun;
} WorkerArgs;

static AppState g_app;

static int MakeDateKey(const SYSTEMTIME *st) {
    if (st == NULL) {
        return 0;
    }

    return (int)st->wYear * 10000 + (int)st->wMonth * 100 + (int)st->wDay;
}

static void FormatMinuteText(int minuteOfDay, WCHAR *out, size_t outChars) {
    int hour;
    int minute;

    if (out == NULL || outChars == 0) {
        return;
    }

    if (minuteOfDay < 0 || minuteOfDay >= 24 * 60) {
        minuteOfDay = 8 * 60;
    }

    hour = minuteOfDay / 60;
    minute = minuteOfDay % 60;
    _snwprintf(out, outChars - 1U, L"%02d:%02d", hour, minute);
    out[outChars - 1U] = L'\0';
}

static BOOL ParseTimeText(const WCHAR *text, int *minuteOfDay) {
    WCHAR *endPtr;
    long hour;
    long minute;
    const WCHAR *p;

    if (text == NULL || minuteOfDay == NULL) {
        return FALSE;
    }

    p = text;
    while (*p == L' ' || *p == L'\t') {
        ++p;
    }

    hour = wcstol(p, &endPtr, 10);
    if (endPtr == p || *endPtr != L':') {
        return FALSE;
    }

    p = endPtr + 1;
    minute = wcstol(p, &endPtr, 10);
    while (*endPtr == L' ' || *endPtr == L'\t') {
        ++endPtr;
    }

    if (*endPtr != L'\0' || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        return FALSE;
    }

    *minuteOfDay = (int)(hour * 60 + minute);
    return TRUE;
}

static BOOL ParseAsciiTimeText(const char *text, int *minuteOfDay) {
    int hour;
    int minute;
    char tail;

    if (text == NULL || minuteOfDay == NULL) {
        return FALSE;
    }

    if (sscanf(text, "%d:%d%c", &hour, &minute, &tail) != 2) {
        return FALSE;
    }

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        return FALSE;
    }

    *minuteOfDay = hour * 60 + minute;
    return TRUE;
}

static void SetDefaultSchedule(ScheduleConfig *cfg) {
    if (cfg == NULL) {
        return;
    }

    cfg->enabled = FALSE;
    cfg->minute1 = 8 * 60;
    cfg->minute2 = 14 * 60;
    cfg->lastRunDate[0] = 0;
    cfg->lastRunDate[1] = 0;
}

static void LoadScheduleConfig(ScheduleConfig *cfg) {
    FILE *fp;
    char line[128];

    if (cfg == NULL) {
        return;
    }

    SetDefaultSchedule(cfg);

    fp = fopen(SCHEDULE_FILE_A, "r");
    if (fp == NULL) {
        return;
    }

    while (fgets(line, sizeof(line), fp) != NULL) {
        StripNewline(line);
        TrimAsciiInPlace(line);

        if (strncmp(line, "enabled=", 8) == 0) {
            cfg->enabled = atoi(line + 8) != 0;
        } else if (strncmp(line, "time1=", 6) == 0) {
            ParseAsciiTimeText(line + 6, &cfg->minute1);
        } else if (strncmp(line, "time2=", 6) == 0) {
            ParseAsciiTimeText(line + 6, &cfg->minute2);
        }
    }

    fclose(fp);
}

static BOOL SaveScheduleConfig(const ScheduleConfig *cfg) {
    FILE *fp;

    if (cfg == NULL) {
        return FALSE;
    }

    fp = fopen(SCHEDULE_FILE_A, "w");
    if (fp == NULL) {
        return FALSE;
    }

    fprintf(fp, "enabled=%d\n", cfg->enabled ? 1 : 0);
    fprintf(fp, "time1=%02d:%02d\n", cfg->minute1 / 60, cfg->minute1 % 60);
    fprintf(fp, "time2=%02d:%02d\n", cfg->minute2 / 60, cfg->minute2 % 60);
    fclose(fp);
    return TRUE;
}

static WCHAR *DupWideString(const WCHAR *s) {
    size_t chars;
    WCHAR *copy;

    if (s == NULL) {
        s = L"";
    }

    chars = wcslen(s) + 1U;
    copy = (WCHAR *)malloc(chars * sizeof(WCHAR));
    if (copy != NULL) {
        memcpy(copy, s, chars * sizeof(WCHAR));
    }

    return copy;
}

static void PostGuiLog(HWND hwnd, const WCHAR *text) {
    WCHAR *copy = DupWideString(text);
    if (copy != NULL) {
        PostMessageW(hwnd, WM_GUI_LOG, 0, (LPARAM)copy);
    }
}

static void PostGuiLogFmt(HWND hwnd, const WCHAR *fmt, ...) {
    WCHAR buffer[2048];
    va_list ap;

    va_start(ap, fmt);
    _vsnwprintf(buffer, ARRAY_COUNT(buffer) - 1U, fmt, ap);
    buffer[ARRAY_COUNT(buffer) - 1U] = L'\0';
    va_end(ap);

    PostGuiLog(hwnd, buffer);
}

static void AppendLogLine(HWND logEdit, const WCHAR *line) {
    int len;

    if (logEdit == NULL || line == NULL) {
        return;
    }

    len = GetWindowTextLengthW(logEdit);
    SendMessageW(logEdit, EM_SETSEL, (WPARAM)len, (LPARAM)len);
    SendMessageW(logEdit, EM_REPLACESEL, FALSE, (LPARAM)line);
    SendMessageW(logEdit, EM_REPLACESEL, FALSE, (LPARAM)L"\r\n");
}

static void UpdateScheduleControls(void) {
    WCHAR timeText[16];
    WCHAR status[256];

    if (g_app.scheduleCheck != NULL) {
        SendMessageW(g_app.scheduleCheck, BM_SETCHECK, g_app.schedule.enabled ? BST_CHECKED : BST_UNCHECKED, 0);
    }

    FormatMinuteText(g_app.schedule.minute1, timeText, ARRAY_COUNT(timeText));
    if (g_app.scheduleTime1 != NULL) {
        SetWindowTextW(g_app.scheduleTime1, timeText);
    }

    FormatMinuteText(g_app.schedule.minute2, timeText, ARRAY_COUNT(timeText));
    if (g_app.scheduleTime2 != NULL) {
        SetWindowTextW(g_app.scheduleTime2, timeText);
    }

    if (g_app.schedule.enabled) {
        WCHAR t1[16];
        WCHAR t2[16];
        FormatMinuteText(g_app.schedule.minute1, t1, ARRAY_COUNT(t1));
        FormatMinuteText(g_app.schedule.minute2, t2, ARRAY_COUNT(t2));
        _snwprintf(status, ARRAY_COUNT(status) - 1U, L"定时：已开启，%s 和 %s 自动生成并发送微信", t1, t2);
    } else {
        _snwprintf(status, ARRAY_COUNT(status) - 1U, L"定时：未开启");
    }
    status[ARRAY_COUNT(status) - 1U] = L'\0';

    if (g_app.scheduleStatus != NULL) {
        SetWindowTextW(g_app.scheduleStatus, status);
    }
}

static void SaveScheduleFromControls(HWND hwnd) {
    WCHAR time1[32];
    WCHAR time2[32];
    ScheduleConfig cfg;

    cfg = g_app.schedule;

    GetWindowTextW(g_app.scheduleTime1, time1, ARRAY_COUNT(time1));
    GetWindowTextW(g_app.scheduleTime2, time2, ARRAY_COUNT(time2));

    if (!ParseTimeText(time1, &cfg.minute1) || !ParseTimeText(time2, &cfg.minute2)) {
        MessageBoxW(hwnd, L"时间格式不正确，请使用 08:00 这样的 24 小时格式。", L"定时设置错误", MB_ICONWARNING);
        return;
    }

    cfg.enabled = SendMessageW(g_app.scheduleCheck, BM_GETCHECK, 0, 0) == BST_CHECKED;
    cfg.lastRunDate[0] = 0;
    cfg.lastRunDate[1] = 0;

    if (!SaveScheduleConfig(&cfg)) {
        MessageBoxW(hwnd, L"保存定时设置失败。", L"保存失败", MB_ICONERROR);
        return;
    }

    g_app.schedule = cfg;
    UpdateScheduleControls();
    AppendLogLine(g_app.logEdit, cfg.enabled ? L"定时自动发送已开启。" : L"定时自动发送已关闭。");
}

static BOOL Utf8ToWide(const char *src, WCHAR *dst, size_t dstChars) {
    int written;

    if (dst == NULL || dstChars == 0) {
        return FALSE;
    }
    dst[0] = L'\0';

    if (src == NULL) {
        return TRUE;
    }

    written = MultiByteToWideChar(CP_UTF8, 0, src, -1, dst, (int)dstChars);
    if (written > 0) {
        return TRUE;
    }

    written = MultiByteToWideChar(CP_ACP, 0, src, -1, dst, (int)dstChars);
    return written > 0;
}

static BOOL WideToUtf8(const WCHAR *src, char *dst, size_t dstBytes) {
    int written;

    if (dst == NULL || dstBytes == 0) {
        return FALSE;
    }
    dst[0] = '\0';

    if (src == NULL) {
        return TRUE;
    }

    written = WideCharToMultiByte(CP_UTF8, 0, src, -1, dst, (int)dstBytes, NULL, NULL);
    return written > 0;
}

static void RefreshKeywordEdit(void) {
    char keywordText[4096];
    WCHAR wideText[4096];

    LoadKeywords();
    BuildKeywordsSummary(keywordText, sizeof(keywordText));

    if (Utf8ToWide(keywordText, wideText, ARRAY_COUNT(wideText)) && g_app.keywordEdit != NULL) {
        SetWindowTextW(g_app.keywordEdit, wideText);
    }
}

static void SaveKeywordsFromControls(HWND hwnd) {
    WCHAR wideText[4096];
    char utf8Text[4096];
    WCHAR logLine[128];
    KeywordConfig cfg;

    GetWindowTextW(g_app.keywordEdit, wideText, ARRAY_COUNT(wideText));
    if (!WideToUtf8(wideText, utf8Text, sizeof(utf8Text))) {
        MessageBoxW(hwnd, L"关键词编码转换失败。", L"保存失败", MB_ICONERROR);
        return;
    }

    ParseKeywordsText(&cfg, utf8Text);
    if (cfg.count <= 0) {
        MessageBoxW(hwnd, L"请至少输入一个关键词。多个关键词可用逗号、顿号或换行分隔。", L"关键词为空", MB_ICONWARNING);
        return;
    }

    SaveKeywords(&cfg);
    g_keywords = cfg;
    RefreshKeywordEdit();

    _snwprintf(logLine, ARRAY_COUNT(logLine) - 1U, L"关键词已保存，共 %d 个。", cfg.count);
    logLine[ARRAY_COUNT(logLine) - 1U] = L'\0';
    AppendLogLine(g_app.logEdit, logLine);
}

static void RefreshUrlList(HWND hwnd) {
    char urls[MAX_URLS][MAX_URL_LEN];
    int count;
    int i;
    WCHAR wide[MAX_URL_LEN];
    WCHAR status[128];

    count = LoadUrls(urls);
    SendMessageW(g_app.urlList, LB_RESETCONTENT, 0, 0);

    for (i = 0; i < count; ++i) {
        Utf8ToWide(urls[i], wide, ARRAY_COUNT(wide));
        SendMessageW(g_app.urlList, LB_ADDSTRING, 0, (LPARAM)wide);
    }

    _snwprintf(status, ARRAY_COUNT(status) - 1U, L"已配置 %d 个爬取网址", count);
    status[ARRAY_COUNT(status) - 1U] = L'\0';
    SetWindowTextW(g_app.statusText, status);

    (void)hwnd;
}

static void SetRunningState(BOOL running) {
    int i;

    InterlockedExchange(&g_app.running, running ? 1 : 0);
    EnableWindow(g_app.urlEdit, !running);
    EnableWindow(g_app.urlList, !running);
    EnableWindow(g_app.scheduleCheck, !running);
    EnableWindow(g_app.scheduleTime1, !running);
    EnableWindow(g_app.scheduleTime2, !running);
    EnableWindow(g_app.scheduleSaveButton, !running);
    EnableWindow(g_app.keywordEdit, !running);
    EnableWindow(g_app.keywordSaveButton, !running);

    for (i = 0; i < (int)ARRAY_COUNT(g_app.buttons); ++i) {
        if (g_app.buttons[i] != NULL) {
            EnableWindow(g_app.buttons[i], !running);
        }
    }

    SetWindowTextW(g_app.statusText, running ? L"正在运行，请稍候..." : L"就绪");
}

static void AddUrlFromInput(HWND hwnd) {
    WCHAR wideUrl[MAX_URL_LEN];
    char url[MAX_URL_LEN];
    char urls[MAX_URLS][MAX_URL_LEN];
    int count;

    GetWindowTextW(g_app.urlEdit, wideUrl, ARRAY_COUNT(wideUrl));
    if (!WideToUtf8(wideUrl, url, sizeof(url))) {
        MessageBoxW(hwnd, L"网址编码转换失败。", L"添加失败", MB_ICONERROR);
        return;
    }

    TrimAsciiInPlace(url);
    if (!StartsWithHttpScheme(url)) {
        MessageBoxW(hwnd, L"请输入以 http:// 或 https:// 开头的网址。", L"网址格式不正确", MB_ICONWARNING);
        return;
    }

    count = LoadUrls(urls);
    if (count >= MAX_URLS) {
        MessageBoxW(hwnd, L"网址数量已达到上限。", L"添加失败", MB_ICONWARNING);
        return;
    }

    if (UrlAlreadyExists(urls, count, url)) {
        MessageBoxW(hwnd, L"这个网址已经在列表里。", L"无需重复添加", MB_ICONINFORMATION);
        return;
    }

    SafeCopy(urls[count], MAX_URL_LEN, url);
    ++count;

    if (!SaveUrls(urls, count)) {
        MessageBoxW(hwnd, L"保存网址配置失败。", L"添加失败", MB_ICONERROR);
        return;
    }

    SetWindowTextW(g_app.urlEdit, L"");
    RefreshUrlList(hwnd);
    AppendLogLine(g_app.logEdit, L"已添加爬取网址。");
}

static void RemoveSelectedUrl(HWND hwnd) {
    char urls[MAX_URLS][MAX_URL_LEN];
    int count;
    int sel;
    int i;

    sel = (int)SendMessageW(g_app.urlList, LB_GETCURSEL, 0, 0);
    if (sel == LB_ERR) {
        MessageBoxW(hwnd, L"请先在列表中选择一个网址。", L"没有选择", MB_ICONINFORMATION);
        return;
    }

    count = LoadUrls(urls);
    if (sel < 0 || sel >= count) {
        RefreshUrlList(hwnd);
        return;
    }

    for (i = sel; i < count - 1; ++i) {
        SafeCopy(urls[i], MAX_URL_LEN, urls[i + 1]);
    }
    --count;

    if (!SaveUrls(urls, count)) {
        MessageBoxW(hwnd, L"保存网址配置失败。", L"删除失败", MB_ICONERROR);
        return;
    }

    RefreshUrlList(hwnd);
    AppendLogLine(g_app.logEdit, L"已删除选中的网址。");
}

static void ClearAllUrls(HWND hwnd) {
    char urls[MAX_URLS][MAX_URL_LEN];

    if (MessageBoxW(hwnd, L"确定要清空全部爬取网址吗？", L"确认清空", MB_YESNO | MB_ICONQUESTION) != IDYES) {
        return;
    }

    ZeroMemory(urls, sizeof(urls));
    if (!SaveUrls(urls, 0)) {
        MessageBoxW(hwnd, L"保存网址配置失败。", L"清空失败", MB_ICONERROR);
        return;
    }

    RefreshUrlList(hwnd);
    AppendLogLine(g_app.logEdit, L"已清空网址列表。");
}

static void ClearProcessedHistory(HWND hwnd) {
    FILE *fp;

    if (MessageBoxW(hwnd, L"确定要清空已处理记录吗？清空后，同一批招标可能会再次出现在报告中。", L"确认清空历史", MB_YESNO | MB_ICONQUESTION) != IDYES) {
        return;
    }

    if (!DeleteFileA(HISTORY_LOG_A)) {
        DWORD err = GetLastError();
        if (err != ERROR_FILE_NOT_FOUND) {
            MessageBoxW(hwnd, L"删除历史记录文件失败。", L"清空失败", MB_ICONERROR);
            return;
        }
    }

    fp = fopen(HISTORY_LOG_A, "w");
    if (fp != NULL) {
        fclose(fp);
    }

    AppendLogLine(g_app.logEdit, L"已清空处理历史。");
}

static void OpenReportFile(HWND hwnd) {
    HINSTANCE result;

    result = ShellExecuteW(hwnd, L"open", REPORT_FILE_W, NULL, NULL, SW_SHOWNORMAL);
    if ((INT_PTR)result <= 32) {
        MessageBoxW(hwnd, L"报告文件还不存在，请先生成报告。", L"无法打开报告", MB_ICONINFORMATION);
    }
}

static void OpenTenderFolder(HWND hwnd) {
    ShellExecuteW(hwnd, L"open", BASE_DIR_W, NULL, NULL, SW_SHOWNORMAL);
}

static DWORD WINAPI CrawlWorkerThread(LPVOID param) {
    WorkerArgs *args = (WorkerArgs *)param;
    HWND hwnd = args->hwnd;
    BOOL sendToWeChat = args->sendToWeChat;
    BOOL scheduledRun = args->scheduledRun;
    char (*urls)[MAX_URL_LEN] = NULL;
    TenderItem *newItems = NULL;
    int urlCount;
    int newCount = 0;
    int failedCount = 0;
    BOOL ok = FALSE;

    free(args);

    urls = (char (*)[MAX_URL_LEN])malloc(sizeof(char) * MAX_URLS * MAX_URL_LEN);
    newItems = (TenderItem *)malloc(sizeof(TenderItem) * MAX_ITEMS);

    if (urls == NULL || newItems == NULL) {
        PostGuiLog(hwnd, L"内存不足，无法开始爬取。");
        goto done;
    }

    ZeroMemory(urls, sizeof(char) * MAX_URLS * MAX_URL_LEN);
    ZeroMemory(newItems, sizeof(TenderItem) * MAX_ITEMS);

    PostGuiLog(hwnd, L"开始读取网址配置...");
    urlCount = LoadUrls(urls);
    if (urlCount <= 0) {
        PostGuiLog(hwnd, L"还没有配置爬取网址，请先添加网址。");
        goto done;
    }

    PostGuiLogFmt(hwnd, L"开始爬取，共 %d 个网址。", urlCount);
    if (!CrawlConfiguredUrls(urls, urlCount, newItems, &newCount, &failedCount)) {
        PostGuiLog(hwnd, L"爬取过程失败。");
        goto done;
    }

    PostGuiLog(hwnd, L"正在生成报告文件...");
    if (!WriteReportFile(newItems, newCount, urlCount, failedCount)) {
        PostGuiLog(hwnd, L"报告生成失败。");
        goto done;
    }
    MarkItemsProcessed(newItems, newCount);

    PostGuiLogFmt(hwnd, L"报告已生成：匹配 %d 条，失败网址 %d 个。", newCount, failedCount);

    if (sendToWeChat) {
        PostGuiLog(hwnd, L"正在调用微信发送报告，请不要操作鼠标键盘...");
        if (!SendReportToWeChat()) {
            PostGuiLog(hwnd, L"微信发送失败。请确认电脑版微信已登录并处于可操作状态。");
            goto done;
        }
        PostGuiLog(hwnd, L"报告已发送到微信文件传输助手。");
    }

    ok = TRUE;

done:
    if (urls != NULL) {
        free(urls);
    }
    if (newItems != NULL) {
        free(newItems);
    }

    PostMessageW(hwnd, WM_GUI_DONE, ok ? 1 : 0, scheduledRun ? 1 : 0);
    return 0;
}

static BOOL StartCrawl(HWND hwnd, BOOL sendToWeChat, BOOL scheduledRun) {
    WorkerArgs *args;
    HANDLE thread;

    if (InterlockedCompareExchange(&g_app.running, 1, 1) != 0) {
        return FALSE;
    }

    args = (WorkerArgs *)malloc(sizeof(WorkerArgs));
    if (args == NULL) {
        if (!scheduledRun) {
            MessageBoxW(hwnd, L"内存不足，无法启动任务。", L"启动失败", MB_ICONERROR);
        }
        return FALSE;
    }

    args->hwnd = hwnd;
    args->sendToWeChat = sendToWeChat;
    args->scheduledRun = scheduledRun;

    SetRunningState(TRUE);
    if (scheduledRun) {
        AppendLogLine(g_app.logEdit, L"定时任务启动：生成报告并发送微信。");
    } else {
        AppendLogLine(g_app.logEdit, sendToWeChat ? L"任务启动：生成报告并发送微信。" : L"任务启动：生成报告。");
    }

    thread = CreateThread(NULL, 0, CrawlWorkerThread, args, 0, NULL);
    if (thread == NULL) {
        SetRunningState(FALSE);
        free(args);
        if (!scheduledRun) {
            MessageBoxW(hwnd, L"创建后台任务失败。", L"启动失败", MB_ICONERROR);
        }
        return FALSE;
    }

    CloseHandle(thread);
    return TRUE;
}

static void CheckScheduledRun(HWND hwnd) {
    SYSTEMTIME st;
    int nowMinute;
    int today;
    int i;
    int scheduleMinutes[2];

    if (!g_app.schedule.enabled) {
        return;
    }

    GetLocalTime(&st);
    nowMinute = (int)st.wHour * 60 + (int)st.wMinute;
    today = MakeDateKey(&st);
    scheduleMinutes[0] = g_app.schedule.minute1;
    scheduleMinutes[1] = g_app.schedule.minute2;

    for (i = 0; i < 2; ++i) {
        if (scheduleMinutes[i] != nowMinute) {
            continue;
        }

        if (g_app.schedule.lastRunDate[i] == today) {
            continue;
        }

        g_app.schedule.lastRunDate[i] = today;

        if (InterlockedCompareExchange(&g_app.running, 1, 1) != 0) {
            AppendLogLine(g_app.logEdit, L"定时时间已到，但当前任务仍在运行，已跳过本次自动发送。");
            return;
        }

        AppendLogLine(g_app.logEdit, L"定时时间已到，开始自动生成报告并发送微信。");
        if (!StartCrawl(hwnd, TRUE, TRUE)) {
            AppendLogLine(g_app.logEdit, L"定时任务启动失败。");
        }
        return;
    }
}

static HWND CreateControl(HWND parent, LPCWSTR className, LPCWSTR text, DWORD style, int id) {
    HWND h = CreateWindowExW(
        0,
        className,
        text,
        style | WS_CHILD | WS_VISIBLE,
        0,
        0,
        10,
        10,
        parent,
        (HMENU)(INT_PTR)id,
        GetModuleHandleW(NULL),
        NULL
    );

    if (h != NULL && g_app.font != NULL) {
        SendMessageW(h, WM_SETFONT, (WPARAM)g_app.font, TRUE);
    }

    return h;
}

static void LayoutControls(HWND hwnd) {
    RECT rc;
    int w;
    int h;
    int m = 16;
    int titleH = 32;
    int editH = 30;
    int buttonH = 32;
    int gap = 8;
    int rightW = 150;
    int logH;
    int listTop;
    int listH;
    int listW;
    int xRight;
    int keywordY;
    int scheduleY;
    int urlY;

    GetClientRect(hwnd, &rc);
    w = rc.right - rc.left;
    h = rc.bottom - rc.top;

    MoveWindow(GetDlgItem(hwnd, IDC_STATUS), m, m, w - 2 * m, titleH, TRUE);

    urlY = m + titleH + gap;
    MoveWindow(g_app.urlEdit, m, urlY, w - 2 * m - 110, editH, TRUE);
    MoveWindow(g_app.buttons[0], w - m - 100, urlY, 100, editH, TRUE);

    keywordY = urlY + editH + gap;
    MoveWindow(g_app.keywordLabel, m, keywordY + 5, 70, 22, TRUE);
    MoveWindow(g_app.keywordEdit, m + 72, keywordY, w - 2 * m - 72 - 110, editH, TRUE);
    MoveWindow(g_app.keywordSaveButton, w - m - 100, keywordY, 100, editH, TRUE);

    scheduleY = keywordY + editH + 10;
    MoveWindow(g_app.scheduleCheck, m, scheduleY, 160, editH, TRUE);
    MoveWindow(g_app.scheduleLabel1, m + 170, scheduleY + 5, 36, 22, TRUE);
    MoveWindow(g_app.scheduleTime1, m + 208, scheduleY, 72, editH, TRUE);
    MoveWindow(g_app.scheduleLabel2, m + 292, scheduleY + 5, 36, 22, TRUE);
    MoveWindow(g_app.scheduleTime2, m + 330, scheduleY, 72, editH, TRUE);
    MoveWindow(g_app.scheduleSaveButton, m + 414, scheduleY, 96, editH, TRUE);
    MoveWindow(g_app.scheduleStatus, m + 522, scheduleY + 5, w - m - 522, 22, TRUE);

    listTop = scheduleY + editH + 12;
    logH = h / 4;
    if (logH < 110) {
        logH = 110;
    }
    listH = h - listTop - logH - 3 * gap - buttonH;
    if (listH < 150) {
        listH = 150;
    }

    listW = w - 3 * m - rightW;
    xRight = m + listW + m;

    MoveWindow(g_app.urlList, m, listTop, listW, listH, TRUE);

    MoveWindow(g_app.buttons[1], xRight, listTop, rightW, buttonH, TRUE);
    MoveWindow(g_app.buttons[2], xRight, listTop + (buttonH + gap), rightW, buttonH, TRUE);
    MoveWindow(g_app.buttons[6], xRight, listTop + 2 * (buttonH + gap), rightW, buttonH, TRUE);
    MoveWindow(g_app.buttons[7], xRight, listTop + 3 * (buttonH + gap), rightW, buttonH, TRUE);

    MoveWindow(g_app.buttons[3], m, listTop + listH + gap, 150, buttonH, TRUE);
    MoveWindow(g_app.buttons[4], m + 160, listTop + listH + gap, 190, buttonH, TRUE);
    MoveWindow(g_app.buttons[5], m + 360, listTop + listH + gap, 120, buttonH, TRUE);

    MoveWindow(g_app.logEdit, m, listTop + listH + gap + buttonH + gap, w - 2 * m, logH, TRUE);
}

static LRESULT CALLBACK MainWndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {
    switch (msg) {
    case WM_CREATE:
        ZeroMemory(&g_app, sizeof(g_app));
        g_app.hwnd = hwnd;
        g_app.font = CreateFontW(
            -16,
            0,
            0,
            0,
            FW_NORMAL,
            FALSE,
            FALSE,
            FALSE,
            DEFAULT_CHARSET,
            OUT_DEFAULT_PRECIS,
            CLIP_DEFAULT_PRECIS,
            CLEARTYPE_QUALITY,
            DEFAULT_PITCH | FF_SWISS,
            L"Microsoft YaHei UI"
        );

        EnsureBaseDirectory();
        LoadScheduleConfig(&g_app.schedule);

        g_app.statusText = CreateControl(hwnd, L"STATIC", L"招标信息自动汇报工具", WS_TABSTOP, IDC_STATUS);
        g_app.urlEdit = CreateWindowExW(
            WS_EX_CLIENTEDGE,
            L"EDIT",
            L"",
            WS_CHILD | WS_VISIBLE | WS_TABSTOP | ES_AUTOHSCROLL,
            0,
            0,
            10,
            10,
            hwnd,
            (HMENU)(INT_PTR)IDC_URL_EDIT,
            GetModuleHandleW(NULL),
            NULL
        );
        SendMessageW(g_app.urlEdit, WM_SETFONT, (WPARAM)g_app.font, TRUE);
        SendMessageW(g_app.urlEdit, 0x1501, TRUE, (LPARAM)L"输入招标列表页网址，例如 https://example.com/list.html");

        g_app.urlList = CreateWindowExW(
            WS_EX_CLIENTEDGE,
            L"LISTBOX",
            L"",
            WS_CHILD | WS_VISIBLE | WS_TABSTOP | LBS_NOTIFY | WS_VSCROLL | WS_HSCROLL,
            0,
            0,
            10,
            10,
            hwnd,
            (HMENU)(INT_PTR)IDC_URL_LIST,
            GetModuleHandleW(NULL),
            NULL
        );
        SendMessageW(g_app.urlList, WM_SETFONT, (WPARAM)g_app.font, TRUE);

        g_app.keywordLabel = CreateControl(hwnd, L"STATIC", L"关键词", 0, IDC_KEYWORD_LABEL);
        g_app.keywordEdit = CreateWindowExW(
            WS_EX_CLIENTEDGE,
            L"EDIT",
            L"",
            WS_CHILD | WS_VISIBLE | WS_TABSTOP | ES_AUTOHSCROLL,
            0,
            0,
            10,
            10,
            hwnd,
            (HMENU)(INT_PTR)IDC_KEYWORD_EDIT,
            GetModuleHandleW(NULL),
            NULL
        );
        SendMessageW(g_app.keywordEdit, WM_SETFONT, (WPARAM)g_app.font, TRUE);
        SendMessageW(g_app.keywordEdit, 0x1501, TRUE, (LPARAM)L"例如：空调、维保、废品回收");
        g_app.keywordSaveButton = CreateControl(hwnd, L"BUTTON", L"保存关键词", WS_TABSTOP | BS_PUSHBUTTON, IDC_SAVE_KEYWORDS);

        g_app.scheduleCheck = CreateControl(hwnd, L"BUTTON", L"启用定时自动发送", WS_TABSTOP | BS_AUTOCHECKBOX, IDC_SCHEDULE_ENABLE);
        g_app.scheduleLabel1 = CreateControl(hwnd, L"STATIC", L"上午", 0, IDC_SCHEDULE_LABEL1);
        g_app.scheduleTime1 = CreateWindowExW(
            WS_EX_CLIENTEDGE,
            L"EDIT",
            L"",
            WS_CHILD | WS_VISIBLE | WS_TABSTOP | ES_AUTOHSCROLL,
            0,
            0,
            10,
            10,
            hwnd,
            (HMENU)(INT_PTR)IDC_SCHEDULE_TIME1,
            GetModuleHandleW(NULL),
            NULL
        );
        SendMessageW(g_app.scheduleTime1, WM_SETFONT, (WPARAM)g_app.font, TRUE);

        g_app.scheduleLabel2 = CreateControl(hwnd, L"STATIC", L"下午", 0, IDC_SCHEDULE_LABEL2);
        g_app.scheduleTime2 = CreateWindowExW(
            WS_EX_CLIENTEDGE,
            L"EDIT",
            L"",
            WS_CHILD | WS_VISIBLE | WS_TABSTOP | ES_AUTOHSCROLL,
            0,
            0,
            10,
            10,
            hwnd,
            (HMENU)(INT_PTR)IDC_SCHEDULE_TIME2,
            GetModuleHandleW(NULL),
            NULL
        );
        SendMessageW(g_app.scheduleTime2, WM_SETFONT, (WPARAM)g_app.font, TRUE);

        g_app.scheduleSaveButton = CreateControl(hwnd, L"BUTTON", L"保存定时", WS_TABSTOP | BS_PUSHBUTTON, IDC_SAVE_SCHEDULE);
        g_app.scheduleStatus = CreateControl(hwnd, L"STATIC", L"", 0, IDC_SCHEDULE_STATUS);

        g_app.buttons[0] = CreateControl(hwnd, L"BUTTON", L"添加网址", WS_TABSTOP | BS_PUSHBUTTON, IDC_ADD);
        g_app.buttons[1] = CreateControl(hwnd, L"BUTTON", L"删除选中", WS_TABSTOP | BS_PUSHBUTTON, IDC_REMOVE);
        g_app.buttons[2] = CreateControl(hwnd, L"BUTTON", L"清空网址", WS_TABSTOP | BS_PUSHBUTTON, IDC_CLEAR_URLS);
        g_app.buttons[3] = CreateControl(hwnd, L"BUTTON", L"生成报告", WS_TABSTOP | BS_PUSHBUTTON, IDC_CRAWL);
        g_app.buttons[4] = CreateControl(hwnd, L"BUTTON", L"生成报告并发送微信", WS_TABSTOP | BS_PUSHBUTTON, IDC_CRAWL_SEND);
        g_app.buttons[5] = CreateControl(hwnd, L"BUTTON", L"打开报告", WS_TABSTOP | BS_PUSHBUTTON, IDC_OPEN_REPORT);
        g_app.buttons[6] = CreateControl(hwnd, L"BUTTON", L"清空处理历史", WS_TABSTOP | BS_PUSHBUTTON, IDC_CLEAR_HISTORY);
        g_app.buttons[7] = CreateControl(hwnd, L"BUTTON", L"打开文件夹", WS_TABSTOP | BS_PUSHBUTTON, IDC_OPEN_FOLDER);

        g_app.logEdit = CreateWindowExW(
            WS_EX_CLIENTEDGE,
            L"EDIT",
            L"",
            WS_CHILD | WS_VISIBLE | WS_VSCROLL | ES_MULTILINE | ES_AUTOVSCROLL | ES_READONLY,
            0,
            0,
            10,
            10,
            hwnd,
            (HMENU)(INT_PTR)IDC_LOG,
            GetModuleHandleW(NULL),
            NULL
        );
        SendMessageW(g_app.logEdit, WM_SETFONT, (WPARAM)g_app.font, TRUE);

        RefreshUrlList(hwnd);
        RefreshKeywordEdit();
        UpdateScheduleControls();
        SetTimer(hwnd, SCHEDULE_TIMER_ID, SCHEDULE_TIMER_MS, NULL);
        AppendLogLine(g_app.logEdit, L"欢迎使用。先设置关键词和招标列表页网址，然后点击“生成报告”。可开启定时自动发送。");
        return 0;

    case WM_SIZE:
        LayoutControls(hwnd);
        return 0;

    case WM_COMMAND:
        switch (LOWORD(wParam)) {
        case IDC_ADD:
            AddUrlFromInput(hwnd);
            return 0;
        case IDC_REMOVE:
            RemoveSelectedUrl(hwnd);
            return 0;
        case IDC_CLEAR_URLS:
            ClearAllUrls(hwnd);
            return 0;
        case IDC_CRAWL:
            StartCrawl(hwnd, FALSE, FALSE);
            return 0;
        case IDC_CRAWL_SEND:
            StartCrawl(hwnd, TRUE, FALSE);
            return 0;
        case IDC_OPEN_REPORT:
            OpenReportFile(hwnd);
            return 0;
        case IDC_CLEAR_HISTORY:
            ClearProcessedHistory(hwnd);
            return 0;
        case IDC_OPEN_FOLDER:
            OpenTenderFolder(hwnd);
            return 0;
        case IDC_SAVE_SCHEDULE:
            SaveScheduleFromControls(hwnd);
            return 0;
        case IDC_SAVE_KEYWORDS:
            SaveKeywordsFromControls(hwnd);
            return 0;
        default:
            break;
        }
        break;

    case WM_TIMER:
        if (wParam == SCHEDULE_TIMER_ID) {
            CheckScheduledRun(hwnd);
            return 0;
        }
        break;

    case WM_GUI_LOG:
        AppendLogLine(g_app.logEdit, (const WCHAR *)lParam);
        free((void *)lParam);
        return 0;

    case WM_GUI_DONE:
        SetRunningState(FALSE);
        RefreshUrlList(hwnd);
        UpdateScheduleControls();
        if (lParam == 0) {
            MessageBoxW(
                hwnd,
                wParam ? L"任务完成。" : L"任务没有完成，请查看底部日志。",
                L"运行结果",
                wParam ? MB_ICONINFORMATION : MB_ICONWARNING
            );
        } else {
            AppendLogLine(g_app.logEdit, wParam ? L"定时任务完成。" : L"定时任务没有完成，请查看日志。");
        }
        return 0;

    case WM_CLOSE:
        if (InterlockedCompareExchange(&g_app.running, 1, 1) != 0) {
            if (MessageBoxW(hwnd, L"任务正在运行，确定要退出吗？", L"确认退出", MB_YESNO | MB_ICONQUESTION) != IDYES) {
                return 0;
            }
        }
        DestroyWindow(hwnd);
        return 0;

    case WM_DESTROY:
        KillTimer(hwnd, SCHEDULE_TIMER_ID);
        if (g_app.font != NULL) {
            DeleteObject(g_app.font);
            g_app.font = NULL;
        }
        PostQuitMessage(0);
        return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    WNDCLASSEXW wc;
    HWND hwnd;
    MSG msg;

    (void)hPrevInstance;
    (void)lpCmdLine;

    ZeroMemory(&wc, sizeof(wc));
    wc.cbSize = sizeof(wc);
    wc.lpfnWndProc = MainWndProc;
    wc.hInstance = hInstance;
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    wc.hIcon = LoadIcon(NULL, IDI_APPLICATION);
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wc.lpszClassName = L"TenderAutomationGuiWindow";

    if (!RegisterClassExW(&wc)) {
        MessageBoxW(NULL, L"注册窗口类失败。", L"启动失败", MB_ICONERROR);
        return 1;
    }

    hwnd = CreateWindowExW(
        0,
        wc.lpszClassName,
        L"招标信息自动汇报工具",
        WS_OVERLAPPEDWINDOW | WS_VISIBLE,
        CW_USEDEFAULT,
        CW_USEDEFAULT,
        920,
        640,
        NULL,
        NULL,
        hInstance,
        NULL
    );

    if (hwnd == NULL) {
        MessageBoxW(NULL, L"创建主窗口失败。", L"启动失败", MB_ICONERROR);
        return 1;
    }

    ShowWindow(hwnd, nCmdShow);
    UpdateWindow(hwnd);

    while (GetMessageW(&msg, NULL, 0, 0) > 0) {
        TranslateMessage(&msg);
        DispatchMessageW(&msg);
    }

    return (int)msg.wParam;
}
