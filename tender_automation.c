#define _CRT_SECURE_NO_WARNINGS
#define WIN32_LEAN_AND_MEAN

#include <windows.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stddef.h>
#include <wchar.h>

#if defined(__GNUC__)
#define MAYBE_UNUSED __attribute__((unused))
#else
#define MAYBE_UNUSED
#endif

#ifndef CF_HDROP
#define CF_HDROP 15
#endif

typedef struct DROPFILES_LOCAL_TAG {
    DWORD pFiles;
    POINT pt;
    BOOL fNC;
    BOOL fWide;
} DROPFILES_LOCAL;

typedef void *HINTERNET_LOCAL;

typedef HINTERNET_LOCAL (WINAPI *PFN_InternetOpenA)(LPCSTR, DWORD, LPCSTR, LPCSTR, DWORD);
typedef HINTERNET_LOCAL (WINAPI *PFN_InternetOpenUrlA)(HINTERNET_LOCAL, LPCSTR, LPCSTR, DWORD, DWORD, DWORD_PTR);
typedef HINTERNET_LOCAL (WINAPI *PFN_InternetConnectA)(HINTERNET_LOCAL, LPCSTR, WORD, LPCSTR, LPCSTR, DWORD, DWORD, DWORD_PTR);
typedef HINTERNET_LOCAL (WINAPI *PFN_HttpOpenRequestA)(HINTERNET_LOCAL, LPCSTR, LPCSTR, LPCSTR, LPCSTR, LPCSTR *, DWORD, DWORD_PTR);
typedef BOOL (WINAPI *PFN_HttpSendRequestA)(HINTERNET_LOCAL, LPCSTR, DWORD, LPVOID, DWORD);
typedef BOOL (WINAPI *PFN_InternetReadFile)(HINTERNET_LOCAL, LPVOID, DWORD, LPDWORD);
typedef BOOL (WINAPI *PFN_InternetCloseHandle)(HINTERNET_LOCAL);

typedef struct WinInetApi {
    HMODULE dll;
    PFN_InternetOpenA InternetOpenA_;
    PFN_InternetOpenUrlA InternetOpenUrlA_;
    PFN_InternetConnectA InternetConnectA_;
    PFN_HttpOpenRequestA HttpOpenRequestA_;
    PFN_HttpSendRequestA HttpSendRequestA_;
    PFN_InternetReadFile InternetReadFile_;
    PFN_InternetCloseHandle InternetCloseHandle_;
} WinInetApi;

typedef struct TenderItem {
    char id[64];
    char title[512];
    char url[1024];
    char source[1024];
    char contactName[256];
    char contactPhone[256];
    char budget[256];
    char deadline[256];
    char bidDocTime[256];
    char qualification[1024];
    char requirement[1024];
} TenderItem;

#define ARRAY_COUNT(a) (sizeof(a) / sizeof((a)[0]))

#define BASE_DIR_W             L"D:\\TenderDocs"
#define CONFIG_FILE_A          "D:\\TenderDocs\\sites.txt"
#define KEYWORDS_FILE_A        "D:\\TenderDocs\\keywords.txt"
#define HISTORY_LOG_A          "D:\\TenderDocs\\history_log.txt"
#define REPORT_FILE_W          L"D:\\TenderDocs\\\x6700\x65B0\x62DB\x6807\x4FE1\x606F\x6C47\x62A5.xlsx"

#define MAX_URLS               128
#define MAX_URL_LEN            1024
#define MAX_ITEMS              256
#define MAX_KEYWORDS           16
#define MAX_KEYWORD_LEN        128
#define MAX_DOWNLOAD_BYTES     (4U * 1024U * 1024U)
#define MAX_JSZBTB_PAGES       3
#define MAX_JSGGZY_PAGES       3
#define MAX_SHANDONG_PAGES     3

#define INTERNET_OPEN_TYPE_PRECONFIG_LOCAL 0
#define INTERNET_SERVICE_HTTP_LOCAL        3
#define INTERNET_FLAG_RELOAD_LOCAL         0x80000000UL
#define INTERNET_FLAG_NO_CACHE_WRITE_LOCAL 0x04000000UL
#define INTERNET_FLAG_NO_COOKIES_LOCAL     0x00080000UL
#define INTERNET_FLAG_NO_UI_LOCAL          0x00000200UL

#define U8_KW_AIRCON       "\xE7\xA9\xBA\xE8\xB0\x83"
#define U8_KW_MAINT        "\xE7\xBB\xB4\xE4\xBF\x9D"
#define U8_KW_RECYCLE      "\xE5\xBA\x9F\xE5\x93\x81\xE5\x9B\x9E\xE6\x94\xB6"
#define URL_KW_AIRCON      "%E7%A9%BA%E8%B0%83"
#define URL_KW_MAINT       "%E7%BB%B4%E4%BF%9D"
#define URL_KW_RECYCLE     "%E5%BA%9F%E5%93%81%E5%9B%9E%E6%94%B6"
#define U8_REPORT_TITLE    "\xE6\x9C\x80\xE6\x96\xB0\xE6\x8B\x9B\xE6\xA0\x87\xE4\xBF\xA1\xE6\x81\xAF\xE6\xB1\x87\xE6\x8A\xA5"
#define U8_REPORT_PATH     "D:\\TenderDocs\\\xE6\x9C\x80\xE6\x96\xB0\xE6\x8B\x9B\xE6\xA0\x87\xE4\xBF\xA1\xE6\x81\xAF\xE6\xB1\x87\xE6\x8A\xA5.xlsx"
#define U8_NO_TITLE        "\xEF\xBC\x88\xE6\x9C\xAA\xE6\x8F\x90\xE5\x8F\x96\xE5\x88\xB0\xE6\xA0\x87\xE9\xA2\x98\xEF\xBC\x89"

typedef struct KeywordConfig {
    char words[MAX_KEYWORDS][MAX_KEYWORD_LEN];
    int count;
} KeywordConfig;

static KeywordConfig g_keywords;

static void StripNewline(char *s) {
    if (s != NULL) {
        s[strcspn(s, "\r\n")] = '\0';
    }
}

static void TrimAsciiInPlace(char *s) {
    char *start;
    char *end;
    size_t len;

    if (s == NULL) {
        return;
    }

    start = s;
    while (*start != '\0' && isspace((unsigned char)*start)) {
        ++start;
    }

    if (start != s) {
        memmove(s, start, strlen(start) + 1);
    }

    len = strlen(s);
    if (len == 0) {
        return;
    }

    end = s + len - 1;
    while (end >= s && isspace((unsigned char)*end)) {
        *end = '\0';
        if (end == s) {
            break;
        }
        --end;
    }
}

static void SafeCopy(char *dst, size_t dstSize, const char *src) {
    size_t n;

    if (dst == NULL || dstSize == 0) {
        return;
    }

    if (src == NULL) {
        dst[0] = '\0';
        return;
    }

    n = strlen(src);
    if (n >= dstSize) {
        n = dstSize - 1;
    }

    memcpy(dst, src, n);
    dst[n] = '\0';
}

static void ResetDefaultKeywords(KeywordConfig *cfg) {
    if (cfg == NULL) {
        return;
    }

    ZeroMemory(cfg, sizeof(*cfg));
    SafeCopy(cfg->words[cfg->count++], MAX_KEYWORD_LEN, U8_KW_AIRCON);
    SafeCopy(cfg->words[cfg->count++], MAX_KEYWORD_LEN, U8_KW_MAINT);
    SafeCopy(cfg->words[cfg->count++], MAX_KEYWORD_LEN, U8_KW_RECYCLE);
}

static BOOL AddKeyword(KeywordConfig *cfg, const char *word) {
    char clean[MAX_KEYWORD_LEN];
    int i;

    if (cfg == NULL || word == NULL) {
        return FALSE;
    }

    SafeCopy(clean, sizeof(clean), word);
    TrimAsciiInPlace(clean);
    if (clean[0] == '\0') {
        return FALSE;
    }

    for (i = 0; i < cfg->count; ++i) {
        if (strcmp(cfg->words[i], clean) == 0) {
            return TRUE;
        }
    }

    if (cfg->count >= MAX_KEYWORDS) {
        return FALSE;
    }

    SafeCopy(cfg->words[cfg->count], MAX_KEYWORD_LEN, clean);
    cfg->count += 1;
    return TRUE;
}

static BOOL IsUtf8KeywordSeparatorAt(const unsigned char *p, int *bytes) {
    if (p == NULL || bytes == NULL) {
        return FALSE;
    }

    if (p[0] == 0xE3 && p[1] == 0x80 && p[2] == 0x81) {
        *bytes = 3; /* 、 */
        return TRUE;
    }

    if (p[0] == 0xEF && p[1] == 0xBC && (p[2] == 0x8C || p[2] == 0x9B)) {
        *bytes = 3; /* ， or ； */
        return TRUE;
    }

    return FALSE;
}

static void MAYBE_UNUSED ParseKeywordsText(KeywordConfig *cfg, char *text) {
    char *segment;
    char *p;

    if (cfg == NULL) {
        return;
    }

    ZeroMemory(cfg, sizeof(*cfg));
    if (text == NULL) {
        return;
    }

    segment = text;
    p = text;
    while (*p != '\0') {
        int sepBytes = 0;
        unsigned char c = (unsigned char)*p;

        if (c == ',' || c == ';' || c == '|' || c == '\r' || c == '\n' || c == '\t') {
            *p = '\0';
            AddKeyword(cfg, segment);
            ++p;
            segment = p;
            continue;
        }

        if (IsUtf8KeywordSeparatorAt((const unsigned char *)p, &sepBytes)) {
            *p = '\0';
            AddKeyword(cfg, segment);
            p += sepBytes;
            segment = p;
            continue;
        }

        ++p;
    }

    AddKeyword(cfg, segment);
}

static void SaveKeywords(const KeywordConfig *cfg) {
    FILE *fp;
    int i;

    if (cfg == NULL || cfg->count <= 0) {
        return;
    }

    fp = fopen(KEYWORDS_FILE_A, "w");
    if (fp == NULL) {
        return;
    }

    for (i = 0; i < cfg->count; ++i) {
        fprintf(fp, "%s\n", cfg->words[i]);
    }

    fclose(fp);
}

static void LoadKeywords(void) {
    FILE *fp;
    char line[512];

    ZeroMemory(&g_keywords, sizeof(g_keywords));

    fp = fopen(KEYWORDS_FILE_A, "r");
    if (fp != NULL) {
        while (fgets(line, sizeof(line), fp) != NULL) {
            StripNewline(line);
            AddKeyword(&g_keywords, line);
        }
        fclose(fp);
    }

    if (g_keywords.count <= 0) {
        ResetDefaultKeywords(&g_keywords);
        SaveKeywords(&g_keywords);
    }
}

static void BuildKeywordsSummary(char *out, size_t outSize) {
    int i;

    if (out == NULL || outSize == 0) {
        return;
    }

    out[0] = '\0';
    for (i = 0; i < g_keywords.count; ++i) {
        if (i > 0) {
            strncat(out, ", ", outSize - strlen(out) - 1U);
        }
        strncat(out, g_keywords.words[i], outSize - strlen(out) - 1U);
    }
}

static int AsciiCaseEqualN(const char *a, const char *b, size_t n) {
    size_t i;

    if (a == NULL || b == NULL) {
        return 0;
    }

    for (i = 0; i < n; ++i) {
        unsigned char ca = (unsigned char)a[i];
        unsigned char cb = (unsigned char)b[i];

        if (ca == '\0' || cb == '\0') {
            return ca == cb;
        }

        if (tolower(ca) != tolower(cb)) {
            return 0;
        }
    }

    return 1;
}

static int AsciiCaseEqual(const char *a, const char *b) {
    size_t i = 0;

    if (a == NULL || b == NULL) {
        return 0;
    }

    for (;;) {
        unsigned char ca = (unsigned char)a[i];
        unsigned char cb = (unsigned char)b[i];

        if (tolower(ca) != tolower(cb)) {
            return 0;
        }

        if (ca == '\0') {
            return 1;
        }

        ++i;
    }
}

static int StartsWithHttpScheme(const char *url) {
    if (url == NULL) {
        return 0;
    }

    return AsciiCaseEqualN(url, "http://", 7) || AsciiCaseEqualN(url, "https://", 8);
}

static const char *AsciiStrIstr(const char *haystack, const char *needle) {
    size_t needleLen;
    const char *p;

    if (haystack == NULL || needle == NULL) {
        return NULL;
    }

    needleLen = strlen(needle);
    if (needleLen == 0) {
        return haystack;
    }

    for (p = haystack; *p != '\0'; ++p) {
        size_t i;
        for (i = 0; i < needleLen; ++i) {
            unsigned char a = (unsigned char)p[i];
            unsigned char b = (unsigned char)needle[i];

            if (p[i] == '\0') {
                return NULL;
            }

            if (tolower(a) != tolower(b)) {
                break;
            }
        }

        if (i == needleLen) {
            return p;
        }
    }

    return NULL;
}

static BOOL EnsureBaseDirectory(void) {
    DWORD attr;

    if (CreateDirectoryW(BASE_DIR_W, NULL)) {
        return TRUE;
    }

    if (GetLastError() == ERROR_ALREADY_EXISTS) {
        attr = GetFileAttributesW(BASE_DIR_W);
        if (attr != INVALID_FILE_ATTRIBUTES && (attr & FILE_ATTRIBUTE_DIRECTORY)) {
            return TRUE;
        }
    }

    printf("ERROR: Failed to create/access D:\\TenderDocs. Win32 error=%lu\n", GetLastError());
    return FALSE;
}

static int LoadUrls(char urls[MAX_URLS][MAX_URL_LEN]) {
    FILE *fp;
    char line[MAX_URL_LEN];
    int count = 0;

    if (urls == NULL) {
        return 0;
    }

    fp = fopen(CONFIG_FILE_A, "r");
    if (fp == NULL) {
        fp = fopen(CONFIG_FILE_A, "w");
        if (fp != NULL) {
            fclose(fp);
        }
        return 0;
    }

    while (count < MAX_URLS && fgets(line, sizeof(line), fp) != NULL) {
        StripNewline(line);
        TrimAsciiInPlace(line);

        if (line[0] == '\0' || line[0] == '#') {
            continue;
        }

        if (!StartsWithHttpScheme(line)) {
            continue;
        }

        SafeCopy(urls[count], MAX_URL_LEN, line);
        ++count;
    }

    fclose(fp);
    return count;
}

static BOOL SaveUrls(char urls[MAX_URLS][MAX_URL_LEN], int count) {
    FILE *fp;
    int i;

    fp = fopen(CONFIG_FILE_A, "w");
    if (fp == NULL) {
        printf("ERROR: Failed to write URL config: %s\n", CONFIG_FILE_A);
        return FALSE;
    }

    for (i = 0; i < count; ++i) {
        fprintf(fp, "%s\n", urls[i]);
    }

    fclose(fp);
    return TRUE;
}

static void PrintUrls(char urls[MAX_URLS][MAX_URL_LEN], int count) {
    int i;

    printf("\nConfigured crawl URLs: %d\n", count);
    if (count == 0) {
        printf("  (empty)\n");
        return;
    }

    for (i = 0; i < count; ++i) {
        printf("  %2d. %s\n", i + 1, urls[i]);
    }
}

static int UrlAlreadyExists(char urls[MAX_URLS][MAX_URL_LEN], int count, const char *url) {
    int i;

    for (i = 0; i < count; ++i) {
        if (AsciiCaseEqual(urls[i], url)) {
            return 1;
        }
    }

    return 0;
}

static void AddUrlInteractive(char urls[MAX_URLS][MAX_URL_LEN], int *count) {
    char line[MAX_URL_LEN];

    if (*count >= MAX_URLS) {
        printf("URL list is full.\n");
        return;
    }

    printf("Enter URL to crawl (http:// or https://): ");
    if (fgets(line, sizeof(line), stdin) == NULL) {
        return;
    }

    StripNewline(line);
    TrimAsciiInPlace(line);

    if (!StartsWithHttpScheme(line)) {
        printf("Invalid URL. It must start with http:// or https://\n");
        return;
    }

    if (UrlAlreadyExists(urls, *count, line)) {
        printf("This URL already exists.\n");
        return;
    }

    SafeCopy(urls[*count], MAX_URL_LEN, line);
    *count += 1;

    if (SaveUrls(urls, *count)) {
        printf("URL saved.\n");
    }
}

static void RemoveUrlInteractive(char urls[MAX_URLS][MAX_URL_LEN], int *count) {
    char line[64];
    int index;
    int i;

    if (*count <= 0) {
        printf("URL list is empty.\n");
        return;
    }

    PrintUrls(urls, *count);
    printf("Enter index to remove: ");

    if (fgets(line, sizeof(line), stdin) == NULL) {
        return;
    }

    index = atoi(line);
    if (index < 1 || index > *count) {
        printf("Invalid index.\n");
        return;
    }

    for (i = index - 1; i < *count - 1; ++i) {
        SafeCopy(urls[i], MAX_URL_LEN, urls[i + 1]);
    }

    urls[*count - 1][0] = '\0';
    *count -= 1;

    if (SaveUrls(urls, *count)) {
        printf("URL removed.\n");
    }
}

static void ClearUrlsInteractive(char urls[MAX_URLS][MAX_URL_LEN], int *count) {
    char line[32];
    int i;

    printf("Clear all configured URLs? Type YES to confirm: ");
    if (fgets(line, sizeof(line), stdin) == NULL) {
        return;
    }

    StripNewline(line);
    if (strcmp(line, "YES") != 0) {
        printf("Canceled.\n");
        return;
    }

    for (i = 0; i < *count; ++i) {
        urls[i][0] = '\0';
    }

    *count = 0;

    if (SaveUrls(urls, *count)) {
        printf("All URLs cleared.\n");
    }
}

static void ClearHistoryInteractive(void) {
    char line[32];
    FILE *fp;

    printf("Clear processed history? Type YES to confirm: ");
    if (fgets(line, sizeof(line), stdin) == NULL) {
        return;
    }

    StripNewline(line);
    if (strcmp(line, "YES") != 0) {
        printf("Canceled.\n");
        return;
    }

    if (!DeleteFileA(HISTORY_LOG_A)) {
        DWORD err = GetLastError();
        if (err != ERROR_FILE_NOT_FOUND) {
            printf("ERROR: Failed to delete history log. Win32 error=%lu\n", err);
            return;
        }
    }

    fp = fopen(HISTORY_LOG_A, "w");
    if (fp != NULL) {
        fclose(fp);
    }

    printf("Processed history cleared.\n");
}

static BOOL LoadWinInet(WinInetApi *api) {
    FARPROC proc;

    if (api == NULL) {
        return FALSE;
    }

    ZeroMemory(api, sizeof(*api));

    api->dll = LoadLibraryA("wininet.dll");
    if (api->dll == NULL) {
        printf("ERROR: LoadLibrary(wininet.dll) failed. Win32 error=%lu\n", GetLastError());
        return FALSE;
    }

    proc = GetProcAddress(api->dll, "InternetOpenA");
    CopyMemory(&api->InternetOpenA_, &proc, sizeof(api->InternetOpenA_));

    proc = GetProcAddress(api->dll, "InternetOpenUrlA");
    CopyMemory(&api->InternetOpenUrlA_, &proc, sizeof(api->InternetOpenUrlA_));

    proc = GetProcAddress(api->dll, "InternetConnectA");
    CopyMemory(&api->InternetConnectA_, &proc, sizeof(api->InternetConnectA_));

    proc = GetProcAddress(api->dll, "HttpOpenRequestA");
    CopyMemory(&api->HttpOpenRequestA_, &proc, sizeof(api->HttpOpenRequestA_));

    proc = GetProcAddress(api->dll, "HttpSendRequestA");
    CopyMemory(&api->HttpSendRequestA_, &proc, sizeof(api->HttpSendRequestA_));

    proc = GetProcAddress(api->dll, "InternetReadFile");
    CopyMemory(&api->InternetReadFile_, &proc, sizeof(api->InternetReadFile_));

    proc = GetProcAddress(api->dll, "InternetCloseHandle");
    CopyMemory(&api->InternetCloseHandle_, &proc, sizeof(api->InternetCloseHandle_));

    if (api->InternetOpenA_ == NULL ||
        api->InternetOpenUrlA_ == NULL ||
        api->InternetConnectA_ == NULL ||
        api->HttpOpenRequestA_ == NULL ||
        api->HttpSendRequestA_ == NULL ||
        api->InternetReadFile_ == NULL ||
        api->InternetCloseHandle_ == NULL) {
        printf("ERROR: Failed to resolve WinINet functions.\n");
        FreeLibrary(api->dll);
        ZeroMemory(api, sizeof(*api));
        return FALSE;
    }

    return TRUE;
}

static void UnloadWinInet(WinInetApi *api) {
    if (api != NULL && api->dll != NULL) {
        FreeLibrary(api->dll);
        ZeroMemory(api, sizeof(*api));
    }
}

static BOOL AppendBytes(char **buffer, DWORD *length, DWORD *capacity, const BYTE *chunk, DWORD chunkSize) {
    DWORD needed;
    DWORD newCapacity;
    char *newBuffer;

    if (chunkSize == 0) {
        return TRUE;
    }

    if (*length >= MAX_DOWNLOAD_BYTES) {
        return TRUE;
    }

    if (chunkSize > MAX_DOWNLOAD_BYTES - *length) {
        chunkSize = MAX_DOWNLOAD_BYTES - *length;
    }

    needed = *length + chunkSize + 1;
    if (needed > *capacity) {
        newCapacity = *capacity == 0 ? 65536U : *capacity;
        while (newCapacity < needed) {
            if (newCapacity > MAX_DOWNLOAD_BYTES / 2U) {
                newCapacity = MAX_DOWNLOAD_BYTES + 1U;
                break;
            }
            newCapacity *= 2U;
        }

        newBuffer = (char *)realloc(*buffer, newCapacity);
        if (newBuffer == NULL) {
            return FALSE;
        }

        *buffer = newBuffer;
        *capacity = newCapacity;
    }

    memcpy(*buffer + *length, chunk, chunkSize);
    *length += chunkSize;
    (*buffer)[*length] = '\0';

    return TRUE;
}

static BOOL FetchUrlRaw(const char *url, char **outBytes, DWORD *outLength) {
    WinInetApi api;
    HINTERNET_LOCAL session = NULL;
    HINTERNET_LOCAL request = NULL;
    BYTE chunk[8192];
    DWORD readBytes = 0;
    DWORD flags;
    char *buffer = NULL;
    DWORD length = 0;
    DWORD capacity = 0;
    BOOL ok = FALSE;

    if (outBytes == NULL || outLength == NULL) {
        return FALSE;
    }

    *outBytes = NULL;
    *outLength = 0;

    if (!LoadWinInet(&api)) {
        return FALSE;
    }

    session = api.InternetOpenA_(
        "TenderAutomation/1.0",
        INTERNET_OPEN_TYPE_PRECONFIG_LOCAL,
        NULL,
        NULL,
        0
    );

    if (session == NULL) {
        printf("ERROR: InternetOpenA failed. Win32 error=%lu\n", GetLastError());
        goto cleanup;
    }

    flags = INTERNET_FLAG_RELOAD_LOCAL |
            INTERNET_FLAG_NO_CACHE_WRITE_LOCAL |
            INTERNET_FLAG_NO_COOKIES_LOCAL |
            INTERNET_FLAG_NO_UI_LOCAL;

    request = api.InternetOpenUrlA_(session, url, NULL, 0, flags, 0);
    if (request == NULL) {
        printf("ERROR: InternetOpenUrlA failed for %s. Win32 error=%lu\n", url, GetLastError());
        goto cleanup;
    }

    for (;;) {
        readBytes = 0;
        if (!api.InternetReadFile_(request, chunk, (DWORD)sizeof(chunk), &readBytes)) {
            printf("ERROR: InternetReadFile failed for %s. Win32 error=%lu\n", url, GetLastError());
            goto cleanup;
        }

        if (readBytes == 0) {
            break;
        }

        if (!AppendBytes(&buffer, &length, &capacity, chunk, readBytes)) {
            printf("ERROR: Out of memory while downloading %s\n", url);
            goto cleanup;
        }

        if (length >= MAX_DOWNLOAD_BYTES) {
            break;
        }
    }

    if (buffer == NULL) {
        buffer = (char *)malloc(1);
        if (buffer == NULL) {
            goto cleanup;
        }
        buffer[0] = '\0';
    }

    *outBytes = buffer;
    *outLength = length;
    buffer = NULL;
    ok = TRUE;

cleanup:
    if (request != NULL) {
        api.InternetCloseHandle_(request);
    }
    if (session != NULL) {
        api.InternetCloseHandle_(session);
    }
    if (buffer != NULL) {
        free(buffer);
    }
    UnloadWinInet(&api);
    return ok;
}

static BOOL LooksLikeUtf8(const unsigned char *s, DWORD len) {
    DWORD i = 0;

    while (i < len) {
        unsigned char c = s[i];

        if (c <= 0x7F) {
            ++i;
        } else if ((c & 0xE0) == 0xC0) {
            if (i + 1 >= len || (s[i + 1] & 0xC0) != 0x80 || c < 0xC2) {
                return FALSE;
            }
            i += 2;
        } else if ((c & 0xF0) == 0xE0) {
            if (i + 2 >= len || (s[i + 1] & 0xC0) != 0x80 || (s[i + 2] & 0xC0) != 0x80) {
                return FALSE;
            }
            i += 3;
        } else if ((c & 0xF8) == 0xF0) {
            if (i + 3 >= len ||
                (s[i + 1] & 0xC0) != 0x80 ||
                (s[i + 2] & 0xC0) != 0x80 ||
                (s[i + 3] & 0xC0) != 0x80) {
                return FALSE;
            }
            i += 4;
        } else {
            return FALSE;
        }
    }

    return TRUE;
}

static BOOL DeclaresUtf8(const char *bytes, DWORD len) {
    DWORD scanLen;
    char head[4097];
    DWORD i;

    if (bytes == NULL) {
        return FALSE;
    }

    scanLen = len < 4096U ? len : 4096U;
    for (i = 0; i < scanLen; ++i) {
        unsigned char c = (unsigned char)bytes[i];
        head[i] = (char)tolower(c);
    }
    head[scanLen] = '\0';

    return strstr(head, "charset=utf-8") != NULL ||
           strstr(head, "charset=\"utf-8\"") != NULL ||
           strstr(head, "charset='utf-8'") != NULL ||
           strstr(head, "charset=utf8") != NULL;
}

static BOOL ConvertRawToUtf8(const char *raw, DWORD rawLen, char **outUtf8) {
    int wchars;
    int utf8Bytes;
    WCHAR *wide = NULL;
    char *utf8 = NULL;

    if (outUtf8 == NULL) {
        return FALSE;
    }
    *outUtf8 = NULL;

    if (raw == NULL) {
        utf8 = (char *)malloc(1);
        if (utf8 == NULL) {
            return FALSE;
        }
        utf8[0] = '\0';
        *outUtf8 = utf8;
        return TRUE;
    }

    if (rawLen >= 3U &&
        (unsigned char)raw[0] == 0xEF &&
        (unsigned char)raw[1] == 0xBB &&
        (unsigned char)raw[2] == 0xBF) {
        raw += 3;
        rawLen -= 3;
    }

    if (DeclaresUtf8(raw, rawLen) || LooksLikeUtf8((const unsigned char *)raw, rawLen)) {
        utf8 = (char *)malloc((size_t)rawLen + 1U);
        if (utf8 == NULL) {
            return FALSE;
        }
        memcpy(utf8, raw, rawLen);
        utf8[rawLen] = '\0';
        *outUtf8 = utf8;
        return TRUE;
    }

    wchars = MultiByteToWideChar(CP_ACP, 0, raw, (int)rawLen, NULL, 0);
    if (wchars <= 0) {
        utf8 = (char *)malloc((size_t)rawLen + 1U);
        if (utf8 == NULL) {
            return FALSE;
        }
        memcpy(utf8, raw, rawLen);
        utf8[rawLen] = '\0';
        *outUtf8 = utf8;
        return TRUE;
    }

    wide = (WCHAR *)malloc(((size_t)wchars + 1U) * sizeof(WCHAR));
    if (wide == NULL) {
        return FALSE;
    }

    MultiByteToWideChar(CP_ACP, 0, raw, (int)rawLen, wide, wchars);
    wide[wchars] = L'\0';

    utf8Bytes = WideCharToMultiByte(CP_UTF8, 0, wide, wchars, NULL, 0, NULL, NULL);
    if (utf8Bytes <= 0) {
        free(wide);
        return FALSE;
    }

    utf8 = (char *)malloc((size_t)utf8Bytes + 1U);
    if (utf8 == NULL) {
        free(wide);
        return FALSE;
    }

    WideCharToMultiByte(CP_UTF8, 0, wide, wchars, utf8, utf8Bytes, NULL, NULL);
    utf8[utf8Bytes] = '\0';

    free(wide);
    *outUtf8 = utf8;
    return TRUE;
}

static BOOL FetchUrlUtf8(const char *url, char **outUtf8) {
    char *raw = NULL;
    DWORD rawLen = 0;
    BOOL ok;

    if (!FetchUrlRaw(url, &raw, &rawLen)) {
        return FALSE;
    }

    ok = ConvertRawToUtf8(raw, rawLen, outUtf8);
    free(raw);
    return ok;
}

static BOOL FetchHttpPostUtf8(
    const char *host,
    WORD port,
    const char *path,
    const char *body,
    const char *referer,
    char **outUtf8
) {
    WinInetApi api;
    HINTERNET_LOCAL session = NULL;
    HINTERNET_LOCAL connection = NULL;
    HINTERNET_LOCAL request = NULL;
    BYTE chunk[8192];
    DWORD readBytes = 0;
    DWORD flags;
    char *buffer = NULL;
    DWORD length = 0;
    DWORD capacity = 0;
    BOOL ok = FALSE;
    char headers[1024];

    if (host == NULL || path == NULL || body == NULL || outUtf8 == NULL) {
        return FALSE;
    }

    *outUtf8 = NULL;

    if (!LoadWinInet(&api)) {
        return FALSE;
    }

    session = api.InternetOpenA_(
        "TenderAutomation/1.0",
        INTERNET_OPEN_TYPE_PRECONFIG_LOCAL,
        NULL,
        NULL,
        0
    );

    if (session == NULL) {
        printf("ERROR: InternetOpenA failed for POST. Win32 error=%lu\n", GetLastError());
        goto cleanup;
    }

    connection = api.InternetConnectA_(
        session,
        host,
        port,
        NULL,
        NULL,
        INTERNET_SERVICE_HTTP_LOCAL,
        0,
        0
    );

    if (connection == NULL) {
        printf("ERROR: InternetConnectA failed for %s. Win32 error=%lu\n", host, GetLastError());
        goto cleanup;
    }

    flags = INTERNET_FLAG_RELOAD_LOCAL |
            INTERNET_FLAG_NO_CACHE_WRITE_LOCAL |
            INTERNET_FLAG_NO_COOKIES_LOCAL |
            INTERNET_FLAG_NO_UI_LOCAL;

    request = api.HttpOpenRequestA_(connection, "POST", path, NULL, NULL, NULL, flags, 0);
    if (request == NULL) {
        printf("ERROR: HttpOpenRequestA failed for %s%s. Win32 error=%lu\n", host, path, GetLastError());
        goto cleanup;
    }

    if (referer != NULL && referer[0] != '\0') {
        snprintf(
            headers,
            sizeof(headers),
            "Content-Type: application/json;charset=utf-8\r\n"
            "Accept: application/json, text/plain, */*\r\n"
            "Referer: %s\r\n",
            referer
        );
    } else {
        snprintf(
            headers,
            sizeof(headers),
            "Content-Type: application/json;charset=utf-8\r\n"
            "Accept: application/json, text/plain, */*\r\n"
        );
    }
    headers[sizeof(headers) - 1U] = '\0';

    if (!api.HttpSendRequestA_(request, headers, (DWORD)strlen(headers), (LPVOID)body, (DWORD)strlen(body))) {
        printf("ERROR: HttpSendRequestA failed for %s%s. Win32 error=%lu\n", host, path, GetLastError());
        goto cleanup;
    }

    for (;;) {
        readBytes = 0;
        if (!api.InternetReadFile_(request, chunk, (DWORD)sizeof(chunk), &readBytes)) {
            printf("ERROR: InternetReadFile failed for POST %s%s. Win32 error=%lu\n", host, path, GetLastError());
            goto cleanup;
        }

        if (readBytes == 0) {
            break;
        }

        if (!AppendBytes(&buffer, &length, &capacity, chunk, readBytes)) {
            printf("ERROR: Out of memory while reading POST response from %s%s\n", host, path);
            goto cleanup;
        }

        if (length >= MAX_DOWNLOAD_BYTES) {
            break;
        }
    }

    if (buffer == NULL) {
        buffer = (char *)malloc(1);
        if (buffer == NULL) {
            goto cleanup;
        }
        buffer[0] = '\0';
        length = 0;
    }

    ok = ConvertRawToUtf8(buffer, length, outUtf8);

cleanup:
    if (buffer != NULL) {
        free(buffer);
    }
    if (request != NULL) {
        api.InternetCloseHandle_(request);
    }
    if (connection != NULL) {
        api.InternetCloseHandle_(connection);
    }
    if (session != NULL) {
        api.InternetCloseHandle_(session);
    }
    UnloadWinInet(&api);
    return ok;
}

static void AppendUtf8Codepoint(char *dst, size_t dstSize, size_t *pos, unsigned long cp) {
    if (dst == NULL || pos == NULL || *pos >= dstSize) {
        return;
    }

    if (cp <= 0x7FUL) {
        if (*pos + 1U < dstSize) {
            dst[(*pos)++] = (char)cp;
        }
    } else if (cp <= 0x7FFUL) {
        if (*pos + 2U < dstSize) {
            dst[(*pos)++] = (char)(0xC0U | ((cp >> 6) & 0x1FU));
            dst[(*pos)++] = (char)(0x80U | (cp & 0x3FU));
        }
    } else if (cp <= 0xFFFFUL) {
        if (*pos + 3U < dstSize) {
            dst[(*pos)++] = (char)(0xE0U | ((cp >> 12) & 0x0FU));
            dst[(*pos)++] = (char)(0x80U | ((cp >> 6) & 0x3FU));
            dst[(*pos)++] = (char)(0x80U | (cp & 0x3FU));
        }
    } else if (cp <= 0x10FFFFUL) {
        if (*pos + 4U < dstSize) {
            dst[(*pos)++] = (char)(0xF0U | ((cp >> 18) & 0x07U));
            dst[(*pos)++] = (char)(0x80U | ((cp >> 12) & 0x3FU));
            dst[(*pos)++] = (char)(0x80U | ((cp >> 6) & 0x3FU));
            dst[(*pos)++] = (char)(0x80U | (cp & 0x3FU));
        }
    }
}

static int ParseHtmlEntity(const char *src, unsigned long *codepoint, size_t *consumed) {
    char entity[32];
    size_t i;
    char *endPtr;
    unsigned long value;
    int base = 10;
    const char *digits;

    if (src == NULL || src[0] != '&') {
        return 0;
    }

    if (strncmp(src, "&amp;", 5) == 0) {
        *codepoint = '&';
        *consumed = 5;
        return 1;
    }
    if (strncmp(src, "&lt;", 4) == 0) {
        *codepoint = '<';
        *consumed = 4;
        return 1;
    }
    if (strncmp(src, "&gt;", 4) == 0) {
        *codepoint = '>';
        *consumed = 4;
        return 1;
    }
    if (strncmp(src, "&quot;", 6) == 0) {
        *codepoint = '"';
        *consumed = 6;
        return 1;
    }
    if (strncmp(src, "&#39;", 5) == 0 || strncmp(src, "&apos;", 6) == 0) {
        *codepoint = '\'';
        *consumed = src[1] == '#' ? 5 : 6;
        return 1;
    }
    if (strncmp(src, "&nbsp;", 6) == 0) {
        *codepoint = ' ';
        *consumed = 6;
        return 1;
    }

    if (src[1] != '#') {
        return 0;
    }

    for (i = 0; i + 1U < sizeof(entity) && src[i] != '\0'; ++i) {
        entity[i] = src[i];
        if (src[i] == ';') {
            entity[i + 1U] = '\0';
            break;
        }
    }

    if (src[i] != ';') {
        return 0;
    }

    digits = entity + 2;
    if (*digits == 'x' || *digits == 'X') {
        base = 16;
        ++digits;
    }

    value = strtoul(digits, &endPtr, base);
    if (endPtr == digits || *endPtr != ';' || value > 0x10FFFFUL) {
        return 0;
    }

    *codepoint = value;
    *consumed = i + 1U;
    return 1;
}

static void NormalizeTitle(const char *src, char *dst, size_t dstSize) {
    size_t i = 0;
    size_t o = 0;
    int lastWasSpace = 1;

    if (dst == NULL || dstSize == 0) {
        return;
    }

    dst[0] = '\0';
    if (src == NULL) {
        return;
    }

    while (src[i] != '\0' && o + 1U < dstSize) {
        unsigned char c = (unsigned char)src[i];

        if (c == '&') {
            unsigned long cp = 0;
            size_t consumed = 0;
            if (ParseHtmlEntity(src + i, &cp, &consumed)) {
                if (cp <= 0x20UL) {
                    if (!lastWasSpace && o + 1U < dstSize) {
                        dst[o++] = ' ';
                        lastWasSpace = 1;
                    }
                } else {
                    AppendUtf8Codepoint(dst, dstSize, &o, cp);
                    lastWasSpace = 0;
                }
                i += consumed;
                continue;
            }
        }

        if (c == '\r' || c == '\n' || c == '\t' || c == ' ') {
            if (!lastWasSpace && o + 1U < dstSize) {
                dst[o++] = ' ';
                lastWasSpace = 1;
            }
            ++i;
            continue;
        }

        dst[o++] = src[i++];
        lastWasSpace = 0;
    }

    if (o > 0 && dst[o - 1U] == ' ') {
        --o;
    }
    dst[o] = '\0';
}

static void ExtractHtmlTitle(const char *html, char *title, size_t titleSize) {
    const char *titleStart;
    const char *tagEnd;
    const char *titleEnd;
    size_t rawLen;
    char rawTitle[1024];

    if (title == NULL || titleSize == 0) {
        return;
    }

    title[0] = '\0';

    titleStart = AsciiStrIstr(html, "<title");
    if (titleStart == NULL) {
        SafeCopy(title, titleSize, U8_NO_TITLE);
        return;
    }

    tagEnd = strchr(titleStart, '>');
    if (tagEnd == NULL) {
        SafeCopy(title, titleSize, U8_NO_TITLE);
        return;
    }

    ++tagEnd;
    titleEnd = AsciiStrIstr(tagEnd, "</title>");
    if (titleEnd == NULL) {
        SafeCopy(title, titleSize, U8_NO_TITLE);
        return;
    }

    rawLen = (size_t)(titleEnd - tagEnd);
    if (rawLen >= sizeof(rawTitle)) {
        rawLen = sizeof(rawTitle) - 1U;
    }

    memcpy(rawTitle, tagEnd, rawLen);
    rawTitle[rawLen] = '\0';

    NormalizeTitle(rawTitle, title, titleSize);
    if (title[0] == '\0') {
        SafeCopy(title, titleSize, U8_NO_TITLE);
    }
}

static BOOL ContainsTenderKeyword(const char *text) {
    int i;

    if (text == NULL) {
        return FALSE;
    }

    for (i = 0; i < g_keywords.count; ++i) {
        if (g_keywords.words[i][0] != '\0' && strstr(text, g_keywords.words[i]) != NULL) {
            return TRUE;
        }
    }

    return FALSE;
}

static BOOL ContainsAnyUtf8(const char *text, const char *const *needles, size_t needleCount) {
    size_t i;

    if (text == NULL) {
        return FALSE;
    }

    for (i = 0; i < needleCount; ++i) {
        if (needles[i] != NULL && strstr(text, needles[i]) != NULL) {
            return TRUE;
        }
    }

    return FALSE;
}

static BOOL IsActiveTenderInfo(const char *title, const char *categoryNum) {
    static const char *const badWords[] = {
        "\xE5\x85\xAC\xE7\xA4\xBA",
        "\xE4\xB8\xAD\xE6\xA0\x87",
        "\xE6\x88\x90\xE4\xBA\xA4",
        "\xE7\xBB\x93\xE6\x9E\x9C",
        "\xE6\x9B\xB4\xE6\xAD\xA3",
        "\xE5\x8F\x98\xE6\x9B\xB4",
        "\xE7\xBB\x88\xE6\xAD\xA2",
        "\xE5\xBA\x9F\xE6\xA0\x87",
        "\xE6\xB5\x81\xE6\xA0\x87",
        "\xE5\x90\x88\xE5\x90\x8C",
        "\xE9\xAA\x8C\xE6\x94\xB6",
        "\xE6\x9C\x80\xE9\xAB\x98\xE9\x99\x90\xE4\xBB\xB7",
        "\xE8\xBD\xAC\xE8\xAE\xA9",
        "\xE5\x87\xBA\xE7\xA7\x9F",
        "\xE7\xBB\xAD\xE7\xA7\x9F",
        "\xE6\x8C\x82\xE7\x89\x8C"
    };
    static const char *const activeWords[] = {
        "\xE6\x8B\x9B\xE6\xA0\x87\xE5\x85\xAC\xE5\x91\x8A",
        "\xE9\x87\x87\xE8\xB4\xAD\xE5\x85\xAC\xE5\x91\x8A",
        "\xE7\xAB\x9E\xE4\xBA\x89\xE6\x80\xA7\xE7\xA3\x8B\xE5\x95\x86\xE5\x85\xAC\xE5\x91\x8A",
        "\xE7\xAB\x9E\xE4\xBA\x89\xE6\x80\xA7\xE8\xB0\x88\xE5\x88\xA4\xE5\x85\xAC\xE5\x91\x8A",
        "\xE8\xAF\xA2\xE4\xBB\xB7\xE5\x85\xAC\xE5\x91\x8A",
        "\xE7\xAB\x9E\xE4\xBB\xB7\xE5\x85\xAC\xE5\x91\x8A",
        "\xE5\x85\xAC\xE5\xBC\x80\xE6\x8B\x9B\xE6\xA0\x87"
    };

    if (title == NULL || title[0] == '\0') {
        return FALSE;
    }

    if (ContainsAnyUtf8(title, badWords, ARRAY_COUNT(badWords))) {
        return FALSE;
    }

    if (ContainsAnyUtf8(title, activeWords, ARRAY_COUNT(activeWords))) {
        return TRUE;
    }

    if (categoryNum != NULL &&
        (strncmp(categoryNum, "003001001", 9) == 0 ||
         strncmp(categoryNum, "003002001", 9) == 0 ||
         strncmp(categoryNum, "003003001", 9) == 0 ||
         strncmp(categoryNum, "003004001", 9) == 0 ||
         strncmp(categoryNum, "003004002", 9) == 0)) {
        return TRUE;
    }

    return FALSE;
}

static int IsIgnoredHref(const char *href) {
    if (href == NULL || href[0] == '\0') {
        return 1;
    }

    if (href[0] == '#') {
        return 1;
    }

    return AsciiCaseEqualN(href, "javascript:", 11) ||
           AsciiCaseEqualN(href, "mailto:", 7) ||
           AsciiCaseEqualN(href, "tel:", 4);
}

static size_t Utf8SafePrefixLength(const char *s, size_t n) {
    const char *start;
    const char *end;
    const char *lead;
    unsigned char b;
    size_t expected = 1;

    if (s == NULL || n == 0) {
        return 0;
    }

    start = s;
    end = s + n;
    lead = end;

    while (lead > start && (((unsigned char)lead[-1] & 0xC0U) == 0x80U)) {
        --lead;
    }

    if (lead == end) {
        return n;
    }

    b = (unsigned char)*lead;
    if ((b & 0x80U) == 0) {
        expected = 1;
    } else if ((b & 0xE0U) == 0xC0U) {
        expected = 2;
    } else if ((b & 0xF0U) == 0xE0U) {
        expected = 3;
    } else if ((b & 0xF8U) == 0xF0U) {
        expected = 4;
    } else {
        return (size_t)(lead - start);
    }

    if ((size_t)(end - lead) >= expected) {
        return n;
    }

    return (size_t)(lead - start);
}

static void CopyRangeToString(char *dst, size_t dstSize, const char *start, const char *end) {
    size_t n;

    if (dst == NULL || dstSize == 0) {
        return;
    }

    dst[0] = '\0';
    if (start == NULL || end == NULL || end <= start) {
        return;
    }

    n = (size_t)(end - start);
    if (n >= dstSize) {
        n = dstSize - 1U;
    }
    n = Utf8SafePrefixLength(start, n);

    memcpy(dst, start, n);
    dst[n] = '\0';
}

static void ExtractHrefFromAnchorTag(const char *tagStart, const char *tagEnd, char *href, size_t hrefSize) {
    const char *p;

    if (href == NULL || hrefSize == 0) {
        return;
    }
    href[0] = '\0';

    if (tagStart == NULL || tagEnd == NULL || tagEnd <= tagStart) {
        return;
    }

    for (p = tagStart; p + 4 < tagEnd; ++p) {
        const char *q;
        char quote = '\0';
        const char *valueStart;
        const char *valueEnd;

        if (tolower((unsigned char)p[0]) != 'h' ||
            tolower((unsigned char)p[1]) != 'r' ||
            tolower((unsigned char)p[2]) != 'e' ||
            tolower((unsigned char)p[3]) != 'f') {
            continue;
        }

        q = p + 4;
        while (q < tagEnd && isspace((unsigned char)*q)) {
            ++q;
        }

        if (q >= tagEnd || *q != '=') {
            continue;
        }

        ++q;
        while (q < tagEnd && isspace((unsigned char)*q)) {
            ++q;
        }

        if (q >= tagEnd) {
            return;
        }

        if (*q == '"' || *q == '\'') {
            quote = *q;
            ++q;
        }

        valueStart = q;
        if (quote != '\0') {
            while (q < tagEnd && *q != quote) {
                ++q;
            }
            valueEnd = q;
        } else {
            while (q < tagEnd && !isspace((unsigned char)*q) && *q != '>') {
                ++q;
            }
            valueEnd = q;
        }

        CopyRangeToString(href, hrefSize, valueStart, valueEnd);
        TrimAsciiInPlace(href);
        return;
    }
}

static void ExtractTextFromHtmlFragment(const char *start, const char *end, char *text, size_t textSize) {
    char raw[2048];
    size_t rawLen = 0;
    const char *p;
    int inTag = 0;

    if (text == NULL || textSize == 0) {
        return;
    }
    text[0] = '\0';

    if (start == NULL || end == NULL || end <= start) {
        return;
    }

    for (p = start; p < end && rawLen + 1U < sizeof(raw); ++p) {
        if (*p == '<') {
            inTag = 1;
            if (rawLen > 0 && raw[rawLen - 1U] != ' ') {
                raw[rawLen++] = ' ';
            }
            continue;
        }

        if (*p == '>') {
            inTag = 0;
            continue;
        }

        if (!inTag) {
            raw[rawLen++] = *p;
        }
    }

    raw[rawLen] = '\0';
    NormalizeTitle(raw, text, textSize);
}

static void HtmlToCompactText(const char *html, char *text, size_t textSize) {
    const char *p;
    size_t o = 0;
    int inTag = 0;
    int lastWasSpace = 1;

    if (text == NULL || textSize == 0) {
        return;
    }
    text[0] = '\0';

    if (html == NULL) {
        return;
    }

    for (p = html; *p != '\0' && o + 1U < textSize; ++p) {
        unsigned char c = (unsigned char)*p;

        if (c == '<') {
            inTag = 1;
            if (!lastWasSpace && o + 1U < textSize) {
                text[o++] = ' ';
                lastWasSpace = 1;
            }
            continue;
        }

        if (c == '>') {
            inTag = 0;
            continue;
        }

        if (inTag) {
            continue;
        }

        if (c == '&') {
            unsigned long cp = 0;
            size_t consumed = 0;
            if (ParseHtmlEntity(p, &cp, &consumed)) {
                if (cp <= 0x20UL) {
                    if (!lastWasSpace && o + 1U < textSize) {
                        text[o++] = ' ';
                        lastWasSpace = 1;
                    }
                } else {
                    AppendUtf8Codepoint(text, textSize, &o, cp);
                    lastWasSpace = 0;
                }
                p += consumed - 1U;
                continue;
            }
        }

        if (c == '\r' || c == '\n' || c == '\t' || c == ' ') {
            if (!lastWasSpace && o + 1U < textSize) {
                text[o++] = ' ';
                lastWasSpace = 1;
            }
            continue;
        }

        text[o++] = *p;
        lastWasSpace = 0;
    }

    if (o > 0 && text[o - 1U] == ' ') {
        --o;
    }
    text[o] = '\0';
}

static void GetUrlOrigin(const char *url, char *origin, size_t originSize) {
    const char *schemeEnd;
    const char *hostStart;
    const char *hostEnd;

    if (origin == NULL || originSize == 0) {
        return;
    }
    origin[0] = '\0';

    schemeEnd = strstr(url, "://");
    if (schemeEnd == NULL) {
        return;
    }

    hostStart = schemeEnd + 3;
    hostEnd = strchr(hostStart, '/');
    if (hostEnd == NULL) {
        hostEnd = url + strlen(url);
    }

    CopyRangeToString(origin, originSize, url, hostEnd);
}

static void ResolveHrefUrl(const char *baseUrl, const char *href, char *outUrl, size_t outSize) {
    const char *schemeEnd;
    char origin[MAX_URL_LEN];
    char baseClean[MAX_URL_LEN];
    char *query;
    char *hash;
    char *lastSlash;

    if (outUrl == NULL || outSize == 0) {
        return;
    }
    outUrl[0] = '\0';

    if (href == NULL || href[0] == '\0') {
        return;
    }

    if (StartsWithHttpScheme(href)) {
        SafeCopy(outUrl, outSize, href);
        return;
    }

    schemeEnd = strstr(baseUrl, "://");
    if (schemeEnd == NULL) {
        SafeCopy(outUrl, outSize, href);
        return;
    }

    if (href[0] == '/' && href[1] == '/') {
        CopyRangeToString(outUrl, outSize, baseUrl, schemeEnd);
        strncat(outUrl, href, outSize - strlen(outUrl) - 1U);
        return;
    }

    GetUrlOrigin(baseUrl, origin, sizeof(origin));
    if (origin[0] == '\0') {
        SafeCopy(outUrl, outSize, href);
        return;
    }

    if (href[0] == '/') {
        snprintf(outUrl, outSize, "%s%s", origin, href);
        outUrl[outSize - 1U] = '\0';
        return;
    }

    SafeCopy(baseClean, sizeof(baseClean), baseUrl);
    query = strchr(baseClean, '?');
    if (query != NULL) {
        *query = '\0';
    }
    hash = strchr(baseClean, '#');
    if (hash != NULL) {
        *hash = '\0';
    }

    lastSlash = strrchr(baseClean, '/');
    if (lastSlash == NULL || lastSlash < strstr(baseClean, "://") + 3) {
        snprintf(outUrl, outSize, "%s/%s", origin, href);
    } else {
        *(lastSlash + 1) = '\0';
        snprintf(outUrl, outSize, "%s%s", baseClean, href);
    }

    outUrl[outSize - 1U] = '\0';
}

static unsigned long long Fnva64Update(unsigned long long hash, const char *s) {
    const unsigned char *p = (const unsigned char *)s;

    while (p != NULL && *p != '\0') {
        hash ^= (unsigned long long)(*p);
        hash *= 1099511628211ULL;
        ++p;
    }

    return hash;
}

static void MakeTenderId(const char *url, const char *title, char *id, size_t idSize) {
    unsigned long long hash = 1469598103934665603ULL;
    unsigned long hi;
    unsigned long lo;

    hash = Fnva64Update(hash, url);
    hash ^= (unsigned long long)'|';
    hash *= 1099511628211ULL;
    hash = Fnva64Update(hash, title);

    hi = (unsigned long)((hash >> 32) & 0xFFFFFFFFUL);
    lo = (unsigned long)(hash & 0xFFFFFFFFUL);

    snprintf(id, idSize, "URL-%08lX%08lX", hi, lo);
    id[idSize - 1U] = '\0';
}

static BOOL HistoryContainsId(const char *id) {
    FILE *fp;
    char line[256];

    fp = fopen(HISTORY_LOG_A, "r");
    if (fp == NULL) {
        return FALSE;
    }

    while (fgets(line, sizeof(line), fp) != NULL) {
        StripNewline(line);
        if (strcmp(line, id) == 0) {
            fclose(fp);
            return TRUE;
        }
    }

    fclose(fp);
    return FALSE;
}

static BOOL AppendHistoryId(const char *id) {
    FILE *fp;

    fp = fopen(HISTORY_LOG_A, "a");
    if (fp == NULL) {
        printf("ERROR: Failed to append history log: %s\n", HISTORY_LOG_A);
        return FALSE;
    }

    fprintf(fp, "%s\n", id);
    fclose(fp);
    return TRUE;
}

static const char *FindLastOccurrence(const char *text, const char *needle) {
    const char *p;
    const char *last = NULL;

    if (text == NULL || needle == NULL || needle[0] == '\0') {
        return NULL;
    }

    p = text;
    while ((p = strstr(p, needle)) != NULL) {
        last = p;
        ++p;
    }

    return last;
}

static const char *EarliestOccurrenceBefore(const char *start, const char *end, const char *needle) {
    const char *p;

    if (start == NULL || end == NULL || needle == NULL || needle[0] == '\0') {
        return NULL;
    }

    p = strstr(start, needle);
    if (p == NULL || p >= end) {
        return NULL;
    }

    return p;
}

static const char *FindContactBoundary(const char *start, const char *end) {
    static const char *const labels[] = {
        "\xE8\x81\x94\xE7\xB3\xBB\xE4\xBA\xBA",
        "\xE7\x94\xB5\xE8\xAF\x9D",
        "\xE5\x9C\xB0\xE5\x9D\x80",
        "\xE4\xBC\xA0\xE7\x9C\x9F",
        "\xE9\x82\xAE\xE7\xAE\xB1",
        "\xE9\x82\xAE\xE7\xBC\x96",
        "\xE6\x8B\x9B\xE6\xA0\x87\xE4\xBA\xBA",
        "\xE6\x8B\x9B\xE6\xA0\x87\xE4\xBB\xA3\xE7\x90\x86",
        "\xE4\xBB\xA3\xE7\x90\x86\xE6\x9C\xBA\xE6\x9E\x84",
        "\xE9\x87\x87\xE8\xB4\xAD\xE4\xBA\xBA",
        "\xE7\x9B\x91\xE7\x9D\xA3",
        "\xE9\x99\x84\xE4\xBB\xB6"
    };
    const char *best = end;
    size_t i;

    for (i = 0; i < ARRAY_COUNT(labels); ++i) {
        const char *p = EarliestOccurrenceBefore(start, end, labels[i]);
        if (p != NULL && p > start && p < best) {
            best = p;
        }
    }

    return best;
}

static void NormalizeFieldValue(const char *start, const char *end, char *out, size_t outSize) {
    char raw[512];

    CopyRangeToString(raw, sizeof(raw), start, end);
    NormalizeTitle(raw, out, outSize);
}

static BOOL ExtractLastFieldValueInRange(
    const char *start,
    const char *end,
    const char *label,
    char *out,
    size_t outSize
) {
    const char *p;
    BOOL found = FALSE;

    if (out == NULL || outSize == 0) {
        return FALSE;
    }
    out[0] = '\0';

    if (start == NULL || end == NULL || label == NULL) {
        return FALSE;
    }

    p = start;
    while (p < end) {
        const char *labelPos = strstr(p, label);
        const char *valueStart;
        const char *valueEnd;

        if (labelPos == NULL || labelPos >= end) {
            break;
        }

        valueStart = labelPos + strlen(label);
        while (valueStart < end &&
               (isspace((unsigned char)*valueStart) ||
                *valueStart == ':' ||
                (valueStart + 2 < end &&
                 (unsigned char)valueStart[0] == 0xEF &&
                 (unsigned char)valueStart[1] == 0xBC &&
                 (unsigned char)valueStart[2] == 0x9A))) {
            if (valueStart + 2 < end &&
                (unsigned char)valueStart[0] == 0xEF &&
                (unsigned char)valueStart[1] == 0xBC &&
                (unsigned char)valueStart[2] == 0x9A) {
                valueStart += 3;
            } else {
                ++valueStart;
            }
        }

        valueEnd = FindContactBoundary(valueStart, end);
        if (valueEnd > valueStart) {
            NormalizeFieldValue(valueStart, valueEnd, out, outSize);
            if (out[0] != '\0') {
                found = TRUE;
            }
        }

        p = valueStart + 1;
    }

    return found;
}

static void CleanContactNameValue(const char *raw, char *out, size_t outSize) {
    char temp[256];
    char *p;

    SafeCopy(temp, sizeof(temp), raw);

    p = strstr(temp, "\xEF\xBC\x88");
    if (p != NULL) {
        *p = '\0';
    }

    p = strchr(temp, '(');
    if (p != NULL) {
        *p = '\0';
    }

    p = strstr(temp, "\xE7\x94\xB5\xE8\xAF\x9D");
    if (p != NULL) {
        *p = '\0';
    }

    for (p = temp; *p != '\0'; ++p) {
        if (isdigit((unsigned char)*p)) {
            *p = '\0';
            break;
        }
    }

    NormalizeTitle(temp, out, outSize);
}

static BOOL IsUtf8PhoneSeparator(const char *p) {
    unsigned char b0;
    unsigned char b1;
    unsigned char b2;

    if (p == NULL) {
        return FALSE;
    }

    if (p[0] == '\0' || p[1] == '\0' || p[2] == '\0') {
        return FALSE;
    }

    b0 = (unsigned char)p[0];
    b1 = (unsigned char)p[1];
    b2 = (unsigned char)p[2];

    if (b0 == 0xE3 && b1 == 0x80 && b2 == 0x81) {
        return TRUE;
    }
    if (b0 == 0xEF && b1 == 0xBC && (b2 == 0x8C || b2 == 0x9B || b2 == 0x88 || b2 == 0x89)) {
        return TRUE;
    }
    if (b0 == 0xE8 && b1 == 0xBD && b2 == 0xAC) {
        return TRUE;
    }

    return FALSE;
}

static void CleanPhoneValue(const char *raw, char *out, size_t outSize) {
    const char *p;
    size_t o = 0;
    int started = 0;

    if (out == NULL || outSize == 0) {
        return;
    }
    out[0] = '\0';

    if (raw == NULL) {
        return;
    }

    for (p = raw; *p != '\0' && o + 1U < outSize; ) {
        unsigned char c = (unsigned char)*p;

        if (!started) {
            if (isdigit(c)) {
                started = 1;
                out[o++] = *p++;
            } else {
                ++p;
            }
            continue;
        }

        if (isdigit(c) || *p == '-' || *p == '+' || *p == ',' || *p == ';' || *p == '/' || *p == '(' || *p == ')') {
            out[o++] = *p++;
            continue;
        }

        if (IsUtf8PhoneSeparator(p) && o + 3U < outSize) {
            out[o++] = *p++;
            out[o++] = *p++;
            out[o++] = *p++;
            continue;
        }

        break;
    }

    out[o] = '\0';
    TrimAsciiInPlace(out);
}

static const char *FindEarliestLabel(const char *text, const char *const *labels, size_t labelCount, const char **matchedLabel) {
    const char *best = NULL;
    size_t i;

    if (matchedLabel != NULL) {
        *matchedLabel = NULL;
    }

    if (text == NULL || labels == NULL) {
        return NULL;
    }

    for (i = 0; i < labelCount; ++i) {
        const char *p;
        if (labels[i] == NULL || labels[i][0] == '\0') {
            continue;
        }

        p = strstr(text, labels[i]);
        if (p != NULL && (best == NULL || p < best)) {
            best = p;
            if (matchedLabel != NULL) {
                *matchedLabel = labels[i];
            }
        }
    }

    return best;
}

static const char *FindSummaryBoundary(const char *start, const char *limit) {
    static const char *const boundaries[] = {
        "预算金额", "最高限价", "招标控制价", "最高投标限价", "合同估算价",
        "投标截止", "开标时间", "提交投标文件", "响应文件提交",
        "获取招标文件", "获取采购文件", "招标文件的获取", "采购文件的获取",
        "投标人资格要求", "申请人的资格要求", "资格要求", "招标范围", "采购需求",
        "联系方式", "公告期限", "合同履行期限", "评标办法", "附件", "var imgList"
    };
    const char *best = limit;
    size_t i;

    for (i = 0; i < ARRAY_COUNT(boundaries); ++i) {
        const char *p = strstr(start, boundaries[i]);
        if (p != NULL && p > start && p < best) {
            best = p;
        }
    }

    return best;
}

static void ExtractBriefAfterLabels(
    const char *plain,
    const char *const *labels,
    size_t labelCount,
    size_t maxBytes,
    char *out,
    size_t outSize
) {
    const char *label = NULL;
    const char *labelPos;
    const char *valueStart;
    const char *valueLimit;
    const char *valueEnd;
    char raw[2048];

    if (out == NULL || outSize == 0) {
        return;
    }
    out[0] = '\0';

    labelPos = FindEarliestLabel(plain, labels, labelCount, &label);
    if (labelPos == NULL || label == NULL) {
        return;
    }

    valueStart = labelPos + strlen(label);
    while (*valueStart != '\0' &&
           (isspace((unsigned char)*valueStart) ||
            *valueStart == ':' ||
            *valueStart == '-' ||
            *valueStart == '_' ||
            (valueStart[1] != '\0' && valueStart[2] != '\0' &&
             (unsigned char)valueStart[0] == 0xEF &&
             (unsigned char)valueStart[1] == 0xBC &&
             ((unsigned char)valueStart[2] == 0x9A || (unsigned char)valueStart[2] == 0x9B)))) {
        if (valueStart[1] != '\0' && valueStart[2] != '\0' &&
            (unsigned char)valueStart[0] == 0xEF &&
            (unsigned char)valueStart[1] == 0xBC &&
            ((unsigned char)valueStart[2] == 0x9A || (unsigned char)valueStart[2] == 0x9B)) {
            valueStart += 3;
        } else {
            ++valueStart;
        }
    }

    valueLimit = valueStart + maxBytes;
    if (valueLimit > plain + strlen(plain)) {
        valueLimit = plain + strlen(plain);
    }

    valueEnd = FindSummaryBoundary(valueStart, valueLimit);
    if (valueEnd <= valueStart) {
        valueEnd = valueLimit;
    }

    CopyRangeToString(raw, sizeof(raw), valueStart, valueEnd);
    NormalizeTitle(raw, out, outSize);
}

static void ClearWeakBrief(char *text, size_t minBytes) {
    const char *p;
    size_t useful = 0;

    if (text == NULL || text[0] == '\0') {
        return;
    }

    for (p = text; *p != '\0'; ++p) {
        if (!isspace((unsigned char)*p) &&
            *p != ',' && *p != '.' && *p != ';' && *p != ':' &&
            *p != '-' && *p != '_' && *p != '/' &&
            (unsigned char)*p < 0xEF) {
            ++useful;
        }
    }

    if (strlen(text) < minBytes || useful == 0) {
        text[0] = '\0';
    }
}

static void PopulateTenderBriefFields(TenderItem *item, const char *plain) {
    static const char *const budgetLabels[] = {
        "预算金额", "最高限价", "招标控制价", "最高投标限价", "合同估算价", "项目估算价", "采购预算"
    };
    static const char *const deadlineLabels[] = {
        "并于",
        "投标文件递交的截止时间", "投标截止时间", "提交投标文件截止时间", "响应文件提交截止时间",
        "开标时间", "递交截止时间"
    };
    static const char *const docLabels[] = {
        "获取招标文件", "获取采购文件", "招标文件的获取", "采购文件的获取", "报名时间", "获取时间"
    };
    static const char *const qualificationLabels[] = {
        "投标人资格要求", "申请人的资格要求", "资格要求", "合格投标人的资格要求", "供应商资格要求"
    };
    static const char *const requirementLabels[] = {
        "采购需求", "招标范围", "项目概况", "建设规模", "服务范围", "主要标的信息"
    };

    if (item == NULL || plain == NULL) {
        return;
    }

    ExtractBriefAfterLabels(plain, budgetLabels, ARRAY_COUNT(budgetLabels), 220, item->budget, sizeof(item->budget));
    ExtractBriefAfterLabels(plain, deadlineLabels, ARRAY_COUNT(deadlineLabels), 220, item->deadline, sizeof(item->deadline));
    ExtractBriefAfterLabels(plain, docLabels, ARRAY_COUNT(docLabels), 260, item->bidDocTime, sizeof(item->bidDocTime));
    ExtractBriefAfterLabels(plain, qualificationLabels, ARRAY_COUNT(qualificationLabels), 760, item->qualification, sizeof(item->qualification));
    ExtractBriefAfterLabels(plain, requirementLabels, ARRAY_COUNT(requirementLabels), 640, item->requirement, sizeof(item->requirement));

    ClearWeakBrief(item->budget, 4);
    ClearWeakBrief(item->deadline, 8);
    ClearWeakBrief(item->bidDocTime, 8);
    ClearWeakBrief(item->qualification, 16);
    ClearWeakBrief(item->requirement, 16);
}

static void PopulateTenderContact(TenderItem *item) {
    char *html = NULL;
    char plain[65536];
    char rawName[256];
    char rawPhone[256];
    const char *sectionStart;
    const char *sectionEnd;
    static const char *const endMarkers[] = {
        "\xE6\x8B\x9B\xE6\x8A\x95\xE6\xA0\x87\xE7\x9B\x91\xE7\x9D\xA3",
        "\xE7\x9B\x91\xE7\x9D\xA3\xE7\xAE\xA1\xE7\x90\x86",
        "\xE9\x99\x84\xE4\xBB\xB6",
        "\xE5\x8F\x91\xE5\xB8\x83\xE6\x97\xB6\xE9\x97\xB4"
    };
    size_t i;

    if (item == NULL || item->url[0] == '\0') {
        return;
    }

    item->contactName[0] = '\0';
    item->contactPhone[0] = '\0';
    rawName[0] = '\0';
    rawPhone[0] = '\0';

    if (!FetchUrlUtf8(item->url, &html)) {
        return;
    }

    HtmlToCompactText(html, plain, sizeof(plain));
    free(html);

    PopulateTenderBriefFields(item, plain);

    sectionStart = FindLastOccurrence(plain, "\xE8\x81\x94\xE7\xB3\xBB\xE6\x96\xB9\xE5\xBC\x8F");
    if (sectionStart == NULL) {
        sectionStart = plain;
    }

    sectionEnd = plain + strlen(plain);
    for (i = 0; i < ARRAY_COUNT(endMarkers); ++i) {
        const char *p = EarliestOccurrenceBefore(sectionStart + 1, sectionEnd, endMarkers[i]);
        if (p != NULL && p < sectionEnd) {
            sectionEnd = p;
        }
    }

    if (ExtractLastFieldValueInRange(
        sectionStart,
        sectionEnd,
        "\xE8\x81\x94\xE7\xB3\xBB\xE4\xBA\xBA",
        rawName,
        sizeof(rawName)
    )) {
        CleanContactNameValue(rawName, item->contactName, sizeof(item->contactName));
    }

    if (ExtractLastFieldValueInRange(
        sectionStart,
        sectionEnd,
        "\xE7\x94\xB5\xE8\xAF\x9D",
        rawPhone,
        sizeof(rawPhone)
    )) {
        CleanPhoneValue(rawPhone, item->contactPhone, sizeof(item->contactPhone));
    }
}

static BOOL TenderCandidateExists(const TenderItem *items, int count, const char *id) {
    int i;

    if (items == NULL || id == NULL) {
        return FALSE;
    }

    for (i = 0; i < count; ++i) {
        if (strcmp(items[i].id, id) == 0) {
            return TRUE;
        }
    }

    return FALSE;
}

static BOOL TenderCandidateTitleExists(const TenderItem *items, int count, const char *title) {
    int i;

    if (items == NULL || title == NULL || title[0] == '\0') {
        return FALSE;
    }

    for (i = 0; i < count; ++i) {
        if (strcmp(items[i].title, title) == 0) {
            return TRUE;
        }
    }

    return FALSE;
}

static void AddTenderCandidate(
    const char *sourceUrl,
    const char *itemUrl,
    const char *title,
    TenderItem *newItems,
    int *newCount
) {
    char id[64];

    if (sourceUrl == NULL || itemUrl == NULL || title == NULL || newItems == NULL || newCount == NULL) {
        return;
    }

    if (*newCount >= MAX_ITEMS) {
        return;
    }

    MakeTenderId(itemUrl, title, id, sizeof(id));
    if (TenderCandidateExists(newItems, *newCount, id)) {
        return;
    }

    SafeCopy(newItems[*newCount].id, sizeof(newItems[*newCount].id), id);
    SafeCopy(newItems[*newCount].title, sizeof(newItems[*newCount].title), title);
    SafeCopy(newItems[*newCount].url, sizeof(newItems[*newCount].url), itemUrl);
    SafeCopy(newItems[*newCount].source, sizeof(newItems[*newCount].source), sourceUrl);
    PopulateTenderContact(&newItems[*newCount]);
    *newCount += 1;
}

static void MarkItemsProcessed(const TenderItem *items, int itemCount) {
    int i;

    if (items == NULL || itemCount <= 0) {
        return;
    }

    for (i = 0; i < itemCount; ++i) {
        if (!HistoryContainsId(items[i].id)) {
            AppendHistoryId(items[i].id);
        }
    }
}

static int IsJszbtbUrl(const char *url) {
    if (url == NULL) {
        return 0;
    }

    return AsciiStrIstr(url, "jszbtb.com") != NULL;
}

static int IsJsggzyUrl(const char *url) {
    if (url == NULL) {
        return 0;
    }

    return AsciiStrIstr(url, "jsggzy.jszwfw.gov.cn") != NULL;
}

static int IsShandongGgzyUrl(const char *url) {
    if (url == NULL) {
        return 0;
    }

    return AsciiStrIstr(url, "ggzyjyzx.shandong.gov.cn") != NULL;
}

static const char *FindJsonFieldColon(const char *start, const char *end, const char *field) {
    char pattern[128];
    const char *p;
    const char *colon;

    snprintf(pattern, sizeof(pattern), "\"%s\"", field);
    pattern[sizeof(pattern) - 1U] = '\0';

    p = start;
    while (p != NULL && p < end) {
        p = strstr(p, pattern);
        if (p == NULL || p >= end) {
            return NULL;
        }

        colon = p + strlen(pattern);
        while (colon < end && isspace((unsigned char)*colon)) {
            ++colon;
        }

        if (colon < end && *colon == ':') {
            return colon;
        }

        p += strlen(pattern);
    }

    return NULL;
}

static BOOL ExtractJsonStringField(const char *start, const char *end, const char *field, char *out, size_t outSize) {
    const char *p;
    size_t o = 0;

    if (out == NULL || outSize == 0) {
        return FALSE;
    }
    out[0] = '\0';

    p = FindJsonFieldColon(start, end, field);
    if (p == NULL) {
        return FALSE;
    }

    ++p;
    while (p < end && isspace((unsigned char)*p)) {
        ++p;
    }

    if (p >= end || *p != '"') {
        return FALSE;
    }

    ++p;
    while (p < end && *p != '\0' && o + 1U < outSize) {
        if (*p == '"') {
            out[o] = '\0';
            return TRUE;
        }

        if (*p == '\\' && p + 1 < end) {
            ++p;
            switch (*p) {
            case '"':
            case '\\':
            case '/':
                out[o++] = *p++;
                break;
            case 'n':
            case 'r':
            case 't':
                out[o++] = ' ';
                ++p;
                break;
            case 'u':
                out[o++] = '?';
                p += 5;
                break;
            default:
                out[o++] = *p++;
                break;
            }
            continue;
        }

        out[o++] = *p++;
    }

    out[o] = '\0';
    return out[0] != '\0';
}

static BOOL ExtractJsonIdField(const char *start, const char *end, char *out, size_t outSize) {
    const char *p;
    size_t o = 0;

    if (out == NULL || outSize == 0) {
        return FALSE;
    }
    out[0] = '\0';

    p = FindJsonFieldColon(start, end, "id");
    if (p == NULL) {
        return FALSE;
    }

    ++p;
    while (p < end && isspace((unsigned char)*p)) {
        ++p;
    }

    if (p < end && *p == '"') {
        return ExtractJsonStringField(start, end, "id", out, outSize);
    }

    while (p < end && o + 1U < outSize && (isdigit((unsigned char)*p) || *p == '-')) {
        out[o++] = *p++;
    }

    out[o] = '\0';
    return out[0] != '\0';
}

static void UrlEncodeUtf8(const char *src, char *dst, size_t dstSize) {
    static const char hex[] = "0123456789ABCDEF";
    size_t o = 0;

    if (dst == NULL || dstSize == 0) {
        return;
    }
    dst[0] = '\0';

    if (src == NULL) {
        return;
    }

    while (*src != '\0' && o + 1U < dstSize) {
        unsigned char c = (unsigned char)*src++;

        if ((c >= 'A' && c <= 'Z') ||
            (c >= 'a' && c <= 'z') ||
            (c >= '0' && c <= '9') ||
            c == '-' || c == '_' || c == '.' || c == '~') {
            dst[o++] = (char)c;
        } else if (o + 3U < dstSize) {
            dst[o++] = '%';
            dst[o++] = hex[(c >> 4) & 0x0FU];
            dst[o++] = hex[c & 0x0FU];
        } else {
            break;
        }
    }

    dst[o] = '\0';
}

static int HexDigitValue(int ch) {
    if (ch >= '0' && ch <= '9') {
        return ch - '0';
    }
    if (ch >= 'a' && ch <= 'f') {
        return ch - 'a' + 10;
    }
    if (ch >= 'A' && ch <= 'F') {
        return ch - 'A' + 10;
    }
    return -1;
}

static void PercentDecodeUrlComponent(const char *src, char *dst, size_t dstSize) {
    size_t o = 0;

    if (dst == NULL || dstSize == 0) {
        return;
    }
    dst[0] = '\0';

    if (src == NULL) {
        return;
    }

    while (*src != '\0' && o + 1U < dstSize) {
        if (*src == '%' && isxdigit((unsigned char)src[1]) && isxdigit((unsigned char)src[2])) {
            int hi = HexDigitValue((unsigned char)src[1]);
            int lo = HexDigitValue((unsigned char)src[2]);
            if (hi >= 0 && lo >= 0) {
                dst[o++] = (char)((hi << 4) | lo);
                src += 3;
                continue;
            }
        }

        dst[o++] = (*src == '+') ? ' ' : *src;
        ++src;
    }

    dst[o] = '\0';
}

static BOOL DecodeJsonStringValue(const char **cursor, const char *end, char *out, size_t outSize) {
    const char *p;
    size_t o = 0;

    if (cursor == NULL || *cursor == NULL || out == NULL || outSize == 0) {
        return FALSE;
    }

    out[0] = '\0';
    p = *cursor;
    if (end == NULL) {
        end = p + strlen(p);
    }

    if (p >= end || *p != '"') {
        return FALSE;
    }
    ++p;

    while (p < end && *p != '\0') {
        unsigned char ch = (unsigned char)*p++;

        if (ch == '"') {
            out[o] = '\0';
            *cursor = p;
            return TRUE;
        }

        if (ch == '\\' && p < end) {
            ch = (unsigned char)*p++;
            switch (ch) {
            case '"':
            case '\\':
            case '/':
                if (o + 1U < outSize) {
                    out[o++] = (char)ch;
                }
                break;
            case 'b':
            case 'f':
            case 'n':
            case 'r':
            case 't':
                if (o + 1U < outSize) {
                    out[o++] = ' ';
                }
                break;
            case 'u':
                if (p + 4 <= end) {
                    int h0 = HexDigitValue((unsigned char)p[0]);
                    int h1 = HexDigitValue((unsigned char)p[1]);
                    int h2 = HexDigitValue((unsigned char)p[2]);
                    int h3 = HexDigitValue((unsigned char)p[3]);
                    if (h0 >= 0 && h1 >= 0 && h2 >= 0 && h3 >= 0) {
                        unsigned long cp = ((unsigned long)h0 << 12) |
                                           ((unsigned long)h1 << 8) |
                                           ((unsigned long)h2 << 4) |
                                           (unsigned long)h3;
                        AppendUtf8Codepoint(out, outSize, &o, cp);
                        p += 4;
                    }
                }
                break;
            default:
                if (o + 1U < outSize) {
                    out[o++] = (char)ch;
                }
                break;
            }
            continue;
        }

        if (o + 1U < outSize) {
            out[o++] = (char)ch;
        }
    }

    out[o] = '\0';
    *cursor = p;
    return out[0] != '\0';
}

static void ExtractShandongActualUrl(const char *href, char *outUrl, size_t outSize) {
    const char *urlParam;
    char encoded[MAX_URL_LEN];
    size_t n = 0;

    if (outUrl == NULL || outSize == 0) {
        return;
    }
    outUrl[0] = '\0';

    if (href == NULL || href[0] == '\0') {
        return;
    }

    urlParam = AsciiStrIstr(href, "url=");
    if (urlParam != NULL) {
        urlParam += 4;
        while (urlParam[n] != '\0' && urlParam[n] != '&' && n + 1U < sizeof(encoded)) {
            encoded[n] = urlParam[n];
            ++n;
        }
        encoded[n] = '\0';
        PercentDecodeUrlComponent(encoded, outUrl, outSize);
        if (StartsWithHttpScheme(outUrl)) {
            return;
        }
    }

    ResolveHrefUrl(
        "https://ggzyjyzx.shandong.gov.cn/jsearchfront/search.do",
        href,
        outUrl,
        outSize
    );
}

static int ExtractJsggzyItemsFromJson(
    const char *json,
    const char *sourceUrl,
    TenderItem *newItems,
    int *newCount
) {
    const char *p;
    int addedBefore;
    int rowIndex = 0;

    if (json == NULL || sourceUrl == NULL || newItems == NULL || newCount == NULL) {
        return 0;
    }

    addedBefore = *newCount;
    p = strstr(json, "\"records\"");
    if (p != NULL) {
        const char *arrayStart = strchr(p, '[');
        if (arrayStart != NULL) {
            p = arrayStart + 1;
        } else {
            p = json;
        }
    } else {
        p = json;
    }

    while (*p != '\0' && *newCount < MAX_ITEMS) {
        const char *objStart = strchr(p, '{');
        const char *q;
        int depth = 0;
        int inString = 0;
        int escaped = 0;
        char id[128];
        char rawTitle[1024];
        char title[512];
        char linkUrl[MAX_URL_LEN];
        char itemUrl[MAX_URL_LEN];
        char categoryNum[64];

        if (objStart == NULL) {
            break;
        }

        for (q = objStart; *q != '\0'; ++q) {
            char ch = *q;

            if (inString) {
                if (escaped) {
                    escaped = 0;
                } else if (ch == '\\') {
                    escaped = 1;
                } else if (ch == '"') {
                    inString = 0;
                }
                continue;
            }

            if (ch == '"') {
                inString = 1;
            } else if (ch == '{') {
                ++depth;
            } else if (ch == '}') {
                --depth;
                if (depth == 0) {
                    ++q;
                    break;
                }
            }
        }

        if (*q == '\0' && depth != 0) {
            break;
        }

        id[0] = '\0';
        rawTitle[0] = '\0';
        title[0] = '\0';
        linkUrl[0] = '\0';
        itemUrl[0] = '\0';
        categoryNum[0] = '\0';

        if (!ExtractJsonStringField(objStart, q, "title", rawTitle, sizeof(rawTitle))) {
            ExtractJsonStringField(objStart, q, "titlenew", rawTitle, sizeof(rawTitle));
        }

        if (rawTitle[0] != '\0') {
            ExtractTextFromHtmlFragment(rawTitle, rawTitle + strlen(rawTitle), title, sizeof(title));
            if (title[0] == '\0') {
                NormalizeTitle(rawTitle, title, sizeof(title));
            }
        }

        ExtractJsonStringField(objStart, q, "categorynum", categoryNum, sizeof(categoryNum));

        if (title[0] != '\0' &&
            ContainsTenderKeyword(title) &&
            IsActiveTenderInfo(title, categoryNum)) {
            if (!ExtractJsonStringField(objStart, q, "id", id, sizeof(id))) {
                if (!ExtractJsonStringField(objStart, q, "infoid", id, sizeof(id))) {
                    ExtractJsonIdField(objStart, q, id, sizeof(id));
                }
            }

            ExtractJsonStringField(objStart, q, "linkurl", linkUrl, sizeof(linkUrl));

            if (linkUrl[0] != '\0') {
                if (StartsWithHttpScheme(linkUrl)) {
                    SafeCopy(itemUrl, sizeof(itemUrl), linkUrl);
                } else if (linkUrl[0] == '/') {
                    snprintf(itemUrl, sizeof(itemUrl), "http://jsggzy.jszwfw.gov.cn%s", linkUrl);
                } else {
                    snprintf(itemUrl, sizeof(itemUrl), "http://jsggzy.jszwfw.gov.cn/%s", linkUrl);
                }
                itemUrl[sizeof(itemUrl) - 1U] = '\0';
            } else if (id[0] != '\0') {
                SafeCopy(itemUrl, sizeof(itemUrl), sourceUrl);
                strncat(itemUrl, "#", sizeof(itemUrl) - strlen(itemUrl) - 1U);
                strncat(itemUrl, id, sizeof(itemUrl) - strlen(itemUrl) - 1U);
            } else {
                char rowSuffix[64];
                snprintf(rowSuffix, sizeof(rowSuffix), "#row-%d", rowIndex);
                rowSuffix[sizeof(rowSuffix) - 1U] = '\0';
                SafeCopy(itemUrl, sizeof(itemUrl), sourceUrl);
                strncat(itemUrl, rowSuffix, sizeof(itemUrl) - strlen(itemUrl) - 1U);
            }

            AddTenderCandidate(sourceUrl, itemUrl, title, newItems, newCount);
        }

        ++rowIndex;
        p = q;
    }

    return *newCount - addedBefore;
}

static BOOL CrawlJsggzyApi(const char *sourceUrl, TenderItem *newItems, int *newCount, int *failedCount) {
    int successCount = 0;
    int k;
    int page;

    for (k = 0; k < g_keywords.count; ++k) {
        for (page = 0; page < MAX_JSGGZY_PAGES && *newCount < MAX_ITEMS; ++page) {
            char body[4096];
            char *json = NULL;
            int offset = page * 20;

            snprintf(
                body,
                sizeof(body),
                "{\"token\":\"\",\"pn\":%d,\"rn\":20,\"sdt\":\"\",\"edt\":\"\","
                "\"wd\":\"\",\"inc_wd\":\"\",\"exc_wd\":\"\",\"fields\":\"title\","
                "\"cnum\":\"001\",\"sort\":\"{\\\"infodatepx\\\":\\\"0\\\"}\","
                "\"ssort\":\"title\",\"cl\":200,\"terminal\":\"\","
                "\"highlights\":\"title\",\"accuracy\":\"\",\"noParticiple\":\"1\","
                "\"searchRange\":null,\"isBusiness\":\"1\",\"statistics\":null,"
                "\"condition\":[{\"fieldName\":\"titlenew\",\"isLike\":true,"
                "\"likeType\":0,\"equal\":\"%s\"}],"
                "\"time\":[{\"fieldName\":\"infodatepx\",\"startTime\":\"\",\"endTime\":\"\"}],"
                "\"unionCondition\":[]}",
                offset,
                g_keywords.words[k]
            );
            body[sizeof(body) - 1U] = '\0';

            if (!FetchHttpPostUtf8(
                    "jsggzy.jszwfw.gov.cn",
                    80,
                    "/inteligentsearch/rest/esinteligentsearch/getFullTextDataNew",
                    body,
                    "http://jsggzy.jszwfw.gov.cn/jyxx/tradeInfonew.html",
                    &json
                )) {
                continue;
            }

            ++successCount;
            ExtractJsggzyItemsFromJson(json, sourceUrl, newItems, newCount);
            free(json);
        }
    }

    if (successCount == 0 && failedCount != NULL) {
        *failedCount += 1;
    }

    return successCount > 0;
}

static int ExtractJszbtbItemsFromJson(
    const char *json,
    const char *sourceUrl,
    const char *detailType,
    TenderItem *newItems,
    int *newCount
) {
    const char *p;
    int addedBefore;

    if (json == NULL || sourceUrl == NULL || detailType == NULL || newItems == NULL || newCount == NULL) {
        return 0;
    }

    addedBefore = *newCount;
    p = json;

    while (*p != '\0' && *newCount < MAX_ITEMS) {
        const char *objStart = strchr(p, '{');
        const char *q;
        int depth = 0;
        int inString = 0;
        int escaped = 0;
        char id[64];
        char title[512];
        char itemUrl[MAX_URL_LEN];

        if (objStart == NULL) {
            break;
        }

        for (q = objStart; *q != '\0'; ++q) {
            char ch = *q;

            if (inString) {
                if (escaped) {
                    escaped = 0;
                } else if (ch == '\\') {
                    escaped = 1;
                } else if (ch == '"') {
                    inString = 0;
                }
                continue;
            }

            if (ch == '"') {
                inString = 1;
            } else if (ch == '{') {
                ++depth;
            } else if (ch == '}') {
                --depth;
                if (depth == 0) {
                    ++q;
                    break;
                }
            }
        }

        if (*q == '\0' && depth != 0) {
            break;
        }

        id[0] = '\0';
        title[0] = '\0';

        if (ExtractJsonIdField(objStart, q, id, sizeof(id))) {
            if (!ExtractJsonStringField(objStart, q, "bulletinName", title, sizeof(title))) {
                if (!ExtractJsonStringField(objStart, q, "publicityName", title, sizeof(title))) {
                    if (!ExtractJsonStringField(objStart, q, "noticeName", title, sizeof(title))) {
                        ExtractJsonStringField(objStart, q, "bulletinname", title, sizeof(title));
                    }
                }
            }

            if (title[0] != '\0' && ContainsTenderKeyword(title) && IsActiveTenderInfo(title, NULL)) {
                snprintf(itemUrl, sizeof(itemUrl), "https://www.jszbtb.com/#/bulletindetail/%s/%s", detailType, id);
                itemUrl[sizeof(itemUrl) - 1U] = '\0';
                AddTenderCandidate(sourceUrl, itemUrl, title, newItems, newCount);
            }
        }

        p = q;
    }

    return *newCount - addedBefore;
}

static BOOL CrawlJszbtbApi(const char *sourceUrl, TenderItem *newItems, int *newCount, int *failedCount) {
    typedef struct JszbtbEndpoint {
        const char *apiName;
        const char *detailType;
    } JszbtbEndpoint;

    static const JszbtbEndpoint endpoints[] = {
        { "HomeQulifyBulletin", "QulifyBulletin" },
        { "HomeTenderBulletin", "TenderBulletin" },
        { "HomeWinCandidateBulletin", "WinCandidateBulletin" },
        { "HomeWinBidBulletin", "WinBidBulletin" },
        { "AmendBulletin", "AmendBulletin" },
        { "HomePlanBulletin", "PlanBulletin" },
        { "HomePrivateBulletin", "PrivateBulletinDetail" },
        { "HomeContractBulletin", "ContractBulletin" }
    };

    int successCount = 0;
    size_t e;
    int k;
    int page;

    for (e = 0; e < ARRAY_COUNT(endpoints); ++e) {
        for (k = 0; k < g_keywords.count; ++k) {
            for (page = 1; page <= MAX_JSZBTB_PAGES && *newCount < MAX_ITEMS; ++page) {
                char apiUrl[2048];
                char encodedKeyword[512];
                char *json = NULL;

                UrlEncodeUtf8(g_keywords.words[k], encodedKeyword, sizeof(encodedKeyword));

                snprintf(
                    apiUrl,
                    sizeof(apiUrl),
                    "https://api.jszbtb.com/DataSyncApi/%s?PageSize=20&CurrentPage=%d&pageSize=20&currentPage=%d&Keyword=%s",
                    endpoints[e].apiName,
                    page,
                    page,
                    encodedKeyword
                );
                apiUrl[sizeof(apiUrl) - 1U] = '\0';

                if (!FetchUrlUtf8(apiUrl, &json)) {
                    continue;
                }

                ++successCount;
                ExtractJszbtbItemsFromJson(json, sourceUrl, endpoints[e].detailType, newItems, newCount);
                free(json);
            }
        }
    }

    if (successCount == 0 && failedCount != NULL) {
        *failedCount += 1;
    }

    return successCount > 0;
}

static void ExtractShandongTitleText(const char *start, const char *end, char *title, size_t titleSize) {
    char raw[2048];
    size_t rawLen = 0;
    const char *p;
    int inTag = 0;

    if (title == NULL || titleSize == 0) {
        return;
    }
    title[0] = '\0';

    if (start == NULL || end == NULL || end <= start) {
        return;
    }

    for (p = start; p < end && rawLen + 1U < sizeof(raw); ++p) {
        if (*p == '<') {
            inTag = 1;
            continue;
        }

        if (*p == '>') {
            inTag = 0;
            continue;
        }

        if (!inTag) {
            raw[rawLen++] = *p;
        }
    }

    raw[rawLen] = '\0';
    NormalizeTitle(raw, title, titleSize);
}

static int ScanShandongResultHtml(const char *sourceUrl, const char *html, TenderItem *newItems, int *newCount) {
    const char *p;
    int matchedLinks = 0;

    if (sourceUrl == NULL || html == NULL || newItems == NULL || newCount == NULL) {
        return 0;
    }

    p = html;
    while (*p != '\0' && *newCount < MAX_ITEMS) {
        const char *aStart;
        const char *tagEnd;
        const char *aEnd;
        char href[MAX_URL_LEN];
        char itemUrl[MAX_URL_LEN];
        char title[512];

        aStart = AsciiStrIstr(p, "<a");
        if (aStart == NULL) {
            break;
        }

        tagEnd = strchr(aStart, '>');
        if (tagEnd == NULL) {
            break;
        }

        aEnd = AsciiStrIstr(tagEnd + 1, "</a>");
        if (aEnd == NULL) {
            p = tagEnd + 1;
            continue;
        }

        ExtractHrefFromAnchorTag(aStart, tagEnd, href, sizeof(href));
        ExtractShandongTitleText(tagEnd + 1, aEnd, title, sizeof(title));

        if (title[0] != '\0' &&
            !IsIgnoredHref(href) &&
            ContainsTenderKeyword(title) &&
            IsActiveTenderInfo(title, NULL)) {
            ExtractShandongActualUrl(href, itemUrl, sizeof(itemUrl));
            if (itemUrl[0] != '\0') {
                if (!TenderCandidateTitleExists(newItems, *newCount, title)) {
                    AddTenderCandidate(sourceUrl, itemUrl, title, newItems, newCount);
                    matchedLinks += 1;
                }
            }
        }

        p = aEnd + 4;
    }

    return matchedLinks;
}

static int ExtractShandongItemsFromJson(
    const char *json,
    const char *sourceUrl,
    TenderItem *newItems,
    int *newCount
) {
    const char *p;
    const char *end;
    const char *arrayStart;
    int addedBefore;

    if (json == NULL || sourceUrl == NULL || newItems == NULL || newCount == NULL) {
        return 0;
    }

    addedBefore = *newCount;
    p = strstr(json, "\"result\"");
    if (p == NULL) {
        return 0;
    }

    arrayStart = strchr(p, '[');
    if (arrayStart == NULL) {
        return 0;
    }

    p = arrayStart + 1;
    end = json + strlen(json);

    while (p < end && *p != '\0' && *newCount < MAX_ITEMS) {
        char resultHtml[65536];

        while (p < end && (*p == ',' || isspace((unsigned char)*p))) {
            ++p;
        }

        if (p >= end || *p == ']') {
            break;
        }

        if (*p != '"') {
            ++p;
            continue;
        }

        if (DecodeJsonStringValue(&p, end, resultHtml, sizeof(resultHtml))) {
            ScanShandongResultHtml(sourceUrl, resultHtml, newItems, newCount);
        }
    }

    return *newCount - addedBefore;
}

static BOOL CrawlShandongGgzyApi(const char *sourceUrl, TenderItem *newItems, int *newCount, int *failedCount) {
    int successCount = 0;
    int k;
    int page;

    for (k = 0; k < g_keywords.count; ++k) {
        for (page = 1; page <= MAX_SHANDONG_PAGES && *newCount < MAX_ITEMS; ++page) {
            char apiUrl[2048];
            char encodedKeyword[512];
            char *json = NULL;

            UrlEncodeUtf8(g_keywords.words[k], encodedKeyword, sizeof(encodedKeyword));
            snprintf(
                apiUrl,
                sizeof(apiUrl),
                "https://ggzyjyzx.shandong.gov.cn/jsearchfront/interfaces/cateSearch.do"
                "?websiteid=370000000000110&q=%s&p=%d&pg=20&cateid=15503"
                "&pos=title%%2Ccontent%%2C_default_search&pq=&oq=&eq=&begin=&end=&tpl=1164",
                encodedKeyword,
                page
            );
            apiUrl[sizeof(apiUrl) - 1U] = '\0';

            if (!FetchUrlUtf8(apiUrl, &json)) {
                continue;
            }

            ++successCount;
            ExtractShandongItemsFromJson(json, sourceUrl, newItems, newCount);
            free(json);
        }
    }

    if (successCount == 0 && failedCount != NULL) {
        *failedCount += 1;
    }

    return successCount > 0;
}

static int ScanHtmlForTenderLinks(const char *sourceUrl, const char *html, TenderItem *newItems, int *newCount) {
    const char *p;
    int matchedLinks = 0;

    if (sourceUrl == NULL || html == NULL || newItems == NULL || newCount == NULL) {
        return 0;
    }

    p = html;
    while (*p != '\0' && *newCount < MAX_ITEMS) {
        const char *aStart;
        const char *tagEnd;
        const char *aEnd;
        char href[MAX_URL_LEN];
        char itemUrl[MAX_URL_LEN];
        char text[512];

        aStart = AsciiStrIstr(p, "<a");
        if (aStart == NULL) {
            break;
        }

        tagEnd = strchr(aStart, '>');
        if (tagEnd == NULL) {
            break;
        }

        aEnd = AsciiStrIstr(tagEnd + 1, "</a>");
        if (aEnd == NULL) {
            p = tagEnd + 1;
            continue;
        }

        ExtractHrefFromAnchorTag(aStart, tagEnd, href, sizeof(href));
        ExtractTextFromHtmlFragment(tagEnd + 1, aEnd, text, sizeof(text));

        if (text[0] != '\0' &&
            !IsIgnoredHref(href) &&
            ContainsTenderKeyword(text) &&
            IsActiveTenderInfo(text, NULL)) {
            ResolveHrefUrl(sourceUrl, href, itemUrl, sizeof(itemUrl));
            if (itemUrl[0] != '\0') {
                AddTenderCandidate(sourceUrl, itemUrl, text, newItems, newCount);
                matchedLinks += 1;
            }
        }

        p = aEnd + 4;
    }

    return matchedLinks;
}

static const char *GetMatchedKeywordText(const char *title) {
    int i;

    if (title == NULL) {
        return "";
    }

    for (i = 0; i < g_keywords.count; ++i) {
        if (g_keywords.words[i][0] != '\0' && strstr(title, g_keywords.words[i]) != NULL) {
            return g_keywords.words[i];
        }
    }

    return "";
}

static const char *FieldOrDash(const char *text) {
    return text != NULL && text[0] != '\0' ? text : "-";
}

typedef struct XmlBuffer {
    char *data;
    DWORD length;
    DWORD capacity;
} XmlBuffer;

typedef struct ZipEntry {
    char name[128];
    DWORD crc32;
    DWORD size;
    DWORD compressedSize;
    DWORD offset;
    WORD dosTime;
    WORD dosDate;
} ZipEntry;

typedef struct ZipWriter {
    HANDLE file;
    DWORD offset;
    ZipEntry entries[16];
    int count;
} ZipWriter;

static BOOL XbAppend(XmlBuffer *xb, const char *text) {
    if (xb == NULL || text == NULL) {
        return FALSE;
    }

    return AppendBytes(&xb->data, &xb->length, &xb->capacity, (const BYTE *)text, (DWORD)strlen(text));
}

static BOOL XbAppendEscaped(XmlBuffer *xb, const char *text) {
    const unsigned char *p;
    char one[2];

    if (xb == NULL || text == NULL) {
        return FALSE;
    }

    for (p = (const unsigned char *)text; *p != '\0';) {
        unsigned char c = *p;

        if (c == '&') {
            if (!XbAppend(xb, "&amp;")) return FALSE;
            ++p;
        } else if (c == '<') {
            if (!XbAppend(xb, "&lt;")) return FALSE;
            ++p;
        } else if (c == '>') {
            if (!XbAppend(xb, "&gt;")) return FALSE;
            ++p;
        } else if (c == '"') {
            if (!XbAppend(xb, "&quot;")) return FALSE;
            ++p;
        } else if (c < 0x20 && c != '\t' && c != '\r' && c != '\n') {
            if (!XbAppend(xb, " ")) return FALSE;
            ++p;
        } else if (c < 0x80) {
            one[0] = (char)c;
            one[1] = '\0';
            if (!XbAppend(xb, one)) return FALSE;
            ++p;
        } else {
            int len = 0;
            int valid = 1;
            int i;

            if (c >= 0xC2 && c <= 0xDF) {
                len = 2;
            } else if (c >= 0xE0 && c <= 0xEF) {
                len = 3;
            } else if (c >= 0xF0 && c <= 0xF4) {
                len = 4;
            } else {
                valid = 0;
            }

            for (i = 1; valid && i < len; ++i) {
                if (p[i] == '\0' || (p[i] & 0xC0U) != 0x80U) {
                    valid = 0;
                }
            }

            if (valid && len == 3 && c == 0xE0 && p[1] < 0xA0) valid = 0;
            if (valid && len == 3 && c == 0xED && p[1] >= 0xA0) valid = 0;
            if (valid && len == 4 && c == 0xF0 && p[1] < 0x90) valid = 0;
            if (valid && len == 4 && c == 0xF4 && p[1] > 0x8F) valid = 0;

            if (valid) {
                if (!AppendBytes(&xb->data, &xb->length, &xb->capacity, p, (DWORD)len)) return FALSE;
                p += len;
            } else {
                if (!XbAppend(xb, " ")) return FALSE;
                ++p;
            }
        }
    }

    return TRUE;
}

static void MakeCellRef(int col, int row, char *out, size_t outSize) {
    char colName[4];

    if (out == NULL || outSize == 0) {
        return;
    }

    out[0] = '\0';
    if (col < 1) {
        col = 1;
    }

    if (col <= 26) {
        colName[0] = (char)('A' + col - 1);
        colName[1] = '\0';
    } else {
        int first = (col - 1) / 26;
        int second = (col - 1) % 26;
        colName[0] = (char)('A' + first - 1);
        colName[1] = (char)('A' + second);
        colName[2] = '\0';
    }

    snprintf(out, outSize, "%s%d", colName, row);
    out[outSize - 1U] = '\0';
}

static BOOL XbCellAt(XmlBuffer *xb, int row, int col, int style, const char *text) {
    char ref[16];
    char start[96];

    MakeCellRef(col, row, ref, sizeof(ref));
    snprintf(start, sizeof(start), "<c r=\"%s\" s=\"%d\" t=\"inlineStr\"><is><t xml:space=\"preserve\">", ref, style);
    start[sizeof(start) - 1U] = '\0';

    return XbAppend(xb, start) &&
           XbAppendEscaped(xb, text != NULL ? text : "") &&
           XbAppend(xb, "</t></is></c>");
}

static BOOL XbNumberCellAt(XmlBuffer *xb, int row, int col, int style, int value) {
    char ref[16];
    char cell[128];

    MakeCellRef(col, row, ref, sizeof(ref));
    snprintf(cell, sizeof(cell), "<c r=\"%s\" s=\"%d\"><v>%d</v></c>", ref, style, value);
    cell[sizeof(cell) - 1U] = '\0';
    return XbAppend(xb, cell);
}

static BOOL XbLinkCellAt(XmlBuffer *xb, int row, int col, int style, const char *text) {
    char ref[16];
    char cellStart[128];

    MakeCellRef(col, row, ref, sizeof(ref));
    snprintf(cellStart, sizeof(cellStart), "<c r=\"%s\" s=\"%d\" t=\"inlineStr\"><is><t xml:space=\"preserve\">", ref, style);
    cellStart[sizeof(cellStart) - 1U] = '\0';

    return XbAppend(xb, cellStart) &&
           XbAppendEscaped(xb, text != NULL ? text : "") &&
           XbAppend(xb, "</t></is></c>");
}

static BOOL BuildWorksheetXml(const TenderItem *items, int itemCount, int urlCount, int failedCount, XmlBuffer *xb) {
    SYSTEMTIME st;
    char meta[1024];
    char keywordSummary[1024];
    char dimension[64];
    int lastRow;
    int i;

    if (xb == NULL) {
        return FALSE;
    }

    GetLocalTime(&st);
    BuildKeywordsSummary(keywordSummary, sizeof(keywordSummary));
    lastRow = itemCount > 0 ? itemCount + 3 : 4;

    snprintf(
        meta,
        sizeof(meta),
        "生成时间：%04u-%02u-%02u %02u:%02u:%02u；来源：%d 个网址；失败：%d；筛选：仅在招标/采购阶段；关键词：%s",
        st.wYear, st.wMonth, st.wDay, st.wHour, st.wMinute, st.wSecond, urlCount, failedCount, keywordSummary
    );
    meta[sizeof(meta) - 1U] = '\0';

    if (!XbAppend(xb, "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" "
        "xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\">")) return FALSE;
    snprintf(dimension, sizeof(dimension), "<dimension ref=\"A1:N%d\"/>", lastRow);
    dimension[sizeof(dimension) - 1U] = '\0';
    if (!XbAppend(xb, dimension)) return FALSE;
    if (!XbAppend(xb,
        "<sheetViews><sheetView workbookViewId=\"0\"><pane ySplit=\"3\" topLeftCell=\"A4\" activePane=\"bottomLeft\" state=\"frozen\"/></sheetView></sheetViews>"
        "<sheetFormatPr defaultRowHeight=\"18\"/>"
        "<cols>"
        "<col min=\"1\" max=\"1\" width=\"6\" customWidth=\"1\"/><col min=\"2\" max=\"2\" width=\"12\" customWidth=\"1\"/>"
        "<col min=\"3\" max=\"3\" width=\"11\" customWidth=\"1\"/><col min=\"4\" max=\"4\" width=\"42\" customWidth=\"1\"/>"
        "<col min=\"5\" max=\"5\" width=\"22\" customWidth=\"1\"/><col min=\"6\" max=\"6\" width=\"24\" customWidth=\"1\"/>"
        "<col min=\"7\" max=\"7\" width=\"28\" customWidth=\"1\"/><col min=\"8\" max=\"8\" width=\"16\" customWidth=\"1\"/>"
        "<col min=\"9\" max=\"9\" width=\"18\" customWidth=\"1\"/><col min=\"10\" max=\"10\" width=\"44\" customWidth=\"1\"/>"
        "<col min=\"11\" max=\"11\" width=\"44\" customWidth=\"1\"/><col min=\"12\" max=\"12\" width=\"14\" customWidth=\"1\"/>"
        "<col min=\"13\" max=\"13\" width=\"32\" customWidth=\"1\"/><col min=\"14\" max=\"14\" width=\"22\" customWidth=\"1\"/>"
        "</cols><sheetData>")) return FALSE;

    if (!XbAppend(xb, "<row r=\"1\" ht=\"28\" customHeight=\"1\">")) return FALSE;
    if (!XbCellAt(xb, 1, 1, 3, "投标跟进简报")) return FALSE;
    if (!XbAppend(xb, "</row><row r=\"2\" ht=\"22\" customHeight=\"1\">")) return FALSE;
    if (!XbCellAt(xb, 2, 1, 4, meta)) return FALSE;
    if (!XbAppend(xb, "</row><row r=\"3\" ht=\"36\" customHeight=\"1\">")) return FALSE;

    if (!XbCellAt(xb, 3, 1, 1, "序号")) return FALSE;
    if (!XbCellAt(xb, 3, 2, 1, "跟进状态")) return FALSE;
    if (!XbCellAt(xb, 3, 3, 1, "匹配关键词")) return FALSE;
    if (!XbCellAt(xb, 3, 4, 1, "项目名称")) return FALSE;
    if (!XbCellAt(xb, 3, 5, 1, "预算/最高限价")) return FALSE;
    if (!XbCellAt(xb, 3, 6, 1, "投标截止/开标")) return FALSE;
    if (!XbCellAt(xb, 3, 7, 1, "标书获取时间")) return FALSE;
    if (!XbCellAt(xb, 3, 8, 1, "项目负责人")) return FALSE;
    if (!XbCellAt(xb, 3, 9, 1, "联系方式")) return FALSE;
    if (!XbCellAt(xb, 3, 10, 1, "资质要求摘要")) return FALSE;
    if (!XbCellAt(xb, 3, 11, 1, "核心要求摘要")) return FALSE;
    if (!XbCellAt(xb, 3, 12, 1, "公告链接")) return FALSE;
    if (!XbCellAt(xb, 3, 13, 1, "来源")) return FALSE;
    if (!XbCellAt(xb, 3, 14, 1, "备注")) return FALSE;
    if (!XbAppend(xb, "</row>")) return FALSE;

    if (itemCount <= 0) {
        if (!XbAppend(xb, "<row r=\"4\">")) return FALSE;
        if (!XbCellAt(xb, 4, 1, 2, "本次没有找到在招标/采购阶段的匹配项目。")) return FALSE;
        if (!XbAppend(xb, "</row>")) return FALSE;
    } else {
        for (i = 0; i < itemCount; ++i) {
            char rowStart[64];
            int rowNumber = i + 4;

            snprintf(rowStart, sizeof(rowStart), "<row r=\"%d\" ht=\"90\" customHeight=\"1\">", rowNumber);
            rowStart[sizeof(rowStart) - 1U] = '\0';
            if (!XbAppend(xb, rowStart)) return FALSE;
            if (!XbNumberCellAt(xb, rowNumber, 1, 2, i + 1)) return FALSE;
            if (!XbCellAt(xb, rowNumber, 2, 2, "待评估")) return FALSE;
            if (!XbCellAt(xb, rowNumber, 3, 2, GetMatchedKeywordText(items[i].title))) return FALSE;
            if (!XbCellAt(xb, rowNumber, 4, 2, items[i].title)) return FALSE;
            if (!XbCellAt(xb, rowNumber, 5, 2, FieldOrDash(items[i].budget))) return FALSE;
            if (!XbCellAt(xb, rowNumber, 6, 2, FieldOrDash(items[i].deadline))) return FALSE;
            if (!XbCellAt(xb, rowNumber, 7, 2, FieldOrDash(items[i].bidDocTime))) return FALSE;
            if (!XbCellAt(xb, rowNumber, 8, 2, FieldOrDash(items[i].contactName))) return FALSE;
            if (!XbCellAt(xb, rowNumber, 9, 2, FieldOrDash(items[i].contactPhone))) return FALSE;
            if (!XbCellAt(xb, rowNumber, 10, 2, FieldOrDash(items[i].qualification))) return FALSE;
            if (!XbCellAt(xb, rowNumber, 11, 2, FieldOrDash(items[i].requirement))) return FALSE;
            if (!XbLinkCellAt(xb, rowNumber, 12, 5, "打开公告")) return FALSE;
            if (!XbCellAt(xb, rowNumber, 13, 2, FieldOrDash(items[i].source))) return FALSE;
            if (!XbCellAt(xb, rowNumber, 14, 2, "")) return FALSE;
            if (!XbAppend(xb, "</row>")) return FALSE;
        }
    }

    if (!XbAppend(xb,
        "</sheetData><mergeCells count=\"2\"><mergeCell ref=\"A1:N1\"/><mergeCell ref=\"A2:N2\"/></mergeCells>")) return FALSE;

    if (itemCount > 0) {
        if (!XbAppend(xb, "<hyperlinks>")) return FALSE;

        for (i = 0; i < itemCount; ++i) {
            char link[128];
            snprintf(link, sizeof(link), "<hyperlink ref=\"L%d\" r:id=\"rId%d\"/>", i + 4, i + 1);
            link[sizeof(link) - 1U] = '\0';
            if (!XbAppend(xb, link)) return FALSE;
        }

        if (!XbAppend(xb, "</hyperlinks>")) return FALSE;
    }

    return XbAppend(xb, "<pageMargins left=\"0.7\" right=\"0.7\" top=\"0.75\" bottom=\"0.75\" header=\"0.3\" footer=\"0.3\"/></worksheet>");
}

static BOOL BuildWorksheetRelsXml(const TenderItem *items, int itemCount, XmlBuffer *xb) {
    int i;

    if (!XbAppend(xb, "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">")) return FALSE;

    for (i = 0; i < itemCount; ++i) {
        char prefix[160];
        snprintf(prefix, sizeof(prefix), "<Relationship Id=\"rId%d\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink\" Target=\"", i + 1);
        prefix[sizeof(prefix) - 1U] = '\0';
        if (!XbAppend(xb, prefix)) return FALSE;
        if (!XbAppendEscaped(xb, items[i].url)) return FALSE;
        if (!XbAppend(xb, "\" TargetMode=\"External\"/>")) return FALSE;
    }

    return XbAppend(xb, "</Relationships>");
}

static DWORD Crc32Bytes(const BYTE *data, DWORD size) {
    DWORD crc = 0xFFFFFFFFUL;
    DWORD i;
    int bit;

    for (i = 0; i < size; ++i) {
        crc ^= data[i];
        for (bit = 0; bit < 8; ++bit) {
            crc = (crc >> 1) ^ (0xEDB88320UL & (0UL - (crc & 1UL)));
        }
    }

    return ~crc;
}

static BOOL DeflateStoreBytes(const BYTE *data, DWORD size, BYTE **outData, DWORD *outSize) {
    const DWORD maxChunk = 32763U;
    DWORD blocks;
    DWORD capacity;
    DWORD inOffset = 0;
    DWORD outOffset = 0;
    BYTE *buf;

    if (outData == NULL || outSize == NULL || (data == NULL && size > 0)) {
        return FALSE;
    }

    blocks = size == 0 ? 1 : (size + maxChunk - 1U) / maxChunk;
    capacity = size + blocks * 5U;
    buf = (BYTE *)malloc(capacity);
    if (buf == NULL) {
        return FALSE;
    }

    do {
        DWORD remaining = size - inOffset;
        WORD chunk = (WORD)(remaining > maxChunk ? maxChunk : remaining);
        WORD nlen = (WORD)~chunk;
        BOOL finalBlock = (inOffset + chunk) >= size;

        buf[outOffset++] = finalBlock ? 0x01U : 0x00U;
        buf[outOffset++] = (BYTE)(chunk & 0xFFU);
        buf[outOffset++] = (BYTE)((chunk >> 8) & 0xFFU);
        buf[outOffset++] = (BYTE)(nlen & 0xFFU);
        buf[outOffset++] = (BYTE)((nlen >> 8) & 0xFFU);

        if (chunk > 0) {
            memcpy(buf + outOffset, data + inOffset, chunk);
            outOffset += chunk;
            inOffset += chunk;
        }
    } while (inOffset < size);

    *outData = buf;
    *outSize = outOffset;
    return TRUE;
}

static BOOL ZwWrite(ZipWriter *zw, const void *data, DWORD size) {
    DWORD written = 0;

    if (size == 0) {
        return TRUE;
    }

    if (!WriteFile(zw->file, data, size, &written, NULL) || written != size) {
        return FALSE;
    }

    zw->offset += size;
    return TRUE;
}

static BOOL ZwU16(ZipWriter *zw, WORD value) {
    BYTE b[2];
    b[0] = (BYTE)(value & 0xFFU);
    b[1] = (BYTE)((value >> 8) & 0xFFU);
    return ZwWrite(zw, b, 2);
}

static BOOL ZwU32(ZipWriter *zw, DWORD value) {
    BYTE b[4];
    b[0] = (BYTE)(value & 0xFFU);
    b[1] = (BYTE)((value >> 8) & 0xFFU);
    b[2] = (BYTE)((value >> 16) & 0xFFU);
    b[3] = (BYTE)((value >> 24) & 0xFFU);
    return ZwWrite(zw, b, 4);
}

static BOOL ZipAddEntry(ZipWriter *zw, const char *name, const char *data, DWORD size) {
    ZipEntry *entry;
    WORD nameLen;
    SYSTEMTIME st;
    WORD dosTime;
    WORD dosDate;
    BYTE *compressed = NULL;
    DWORD compressedSize = 0;
    BOOL ok;

    if (zw == NULL || name == NULL || data == NULL || zw->count >= (int)ARRAY_COUNT(zw->entries)) {
        return FALSE;
    }

    GetLocalTime(&st);
    if (st.wYear < 1980) {
        st.wYear = 1980;
        st.wMonth = 1;
        st.wDay = 1;
    }
    dosTime = (WORD)(((st.wHour & 0x1F) << 11) | ((st.wMinute & 0x3F) << 5) | ((st.wSecond / 2) & 0x1F));
    dosDate = (WORD)((((st.wYear - 1980) & 0x7F) << 9) | ((st.wMonth & 0x0F) << 5) | (st.wDay & 0x1F));

    if (!DeflateStoreBytes((const BYTE *)data, size, &compressed, &compressedSize)) {
        return FALSE;
    }

    entry = &zw->entries[zw->count++];
    ZeroMemory(entry, sizeof(*entry));
    SafeCopy(entry->name, sizeof(entry->name), name);
    entry->crc32 = Crc32Bytes((const BYTE *)data, size);
    entry->size = size;
    entry->compressedSize = compressedSize;
    entry->offset = zw->offset;
    entry->dosTime = dosTime;
    entry->dosDate = dosDate;
    nameLen = (WORD)strlen(name);

    ok = ZwU32(zw, 0x04034B50UL) &&
         ZwU16(zw, 20) &&
         ZwU16(zw, 0) &&
         ZwU16(zw, 8) &&
         ZwU16(zw, dosTime) &&
         ZwU16(zw, dosDate) &&
         ZwU32(zw, entry->crc32) &&
         ZwU32(zw, compressedSize) &&
         ZwU32(zw, size) &&
         ZwU16(zw, nameLen) &&
         ZwU16(zw, 0) &&
         ZwWrite(zw, name, nameLen) &&
         ZwWrite(zw, compressed, compressedSize);

    free(compressed);
    return ok;
}

static BOOL ZipFinish(ZipWriter *zw) {
    DWORD centralOffset;
    DWORD centralSize;
    int i;

    if (zw == NULL) {
        return FALSE;
    }

    centralOffset = zw->offset;
    for (i = 0; i < zw->count; ++i) {
        ZipEntry *entry = &zw->entries[i];
        WORD nameLen = (WORD)strlen(entry->name);

        if (!ZwU32(zw, 0x02014B50UL) ||
            !ZwU16(zw, 20) ||
            !ZwU16(zw, 20) ||
            !ZwU16(zw, 0) ||
            !ZwU16(zw, 8) ||
            !ZwU16(zw, entry->dosTime) ||
            !ZwU16(zw, entry->dosDate) ||
            !ZwU32(zw, entry->crc32) ||
            !ZwU32(zw, entry->compressedSize) ||
            !ZwU32(zw, entry->size) ||
            !ZwU16(zw, nameLen) ||
            !ZwU16(zw, 0) ||
            !ZwU16(zw, 0) ||
            !ZwU16(zw, 0) ||
            !ZwU16(zw, 0) ||
            !ZwU32(zw, 0) ||
            !ZwU32(zw, entry->offset) ||
            !ZwWrite(zw, entry->name, nameLen)) {
            return FALSE;
        }
    }

    centralSize = zw->offset - centralOffset;
    return ZwU32(zw, 0x06054B50UL) &&
           ZwU16(zw, 0) &&
           ZwU16(zw, 0) &&
           ZwU16(zw, (WORD)zw->count) &&
           ZwU16(zw, (WORD)zw->count) &&
           ZwU32(zw, centralSize) &&
           ZwU32(zw, centralOffset) &&
           ZwU16(zw, 0);
}

static BOOL WriteReportFile(const TenderItem *items, int itemCount, int urlCount, int failedCount) {
    static const char contentTypes[] =
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">"
        "<Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>"
        "<Default Extension=\"xml\" ContentType=\"application/xml\"/>"
        "<Override PartName=\"/xl/workbook.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\"/>"
        "<Override PartName=\"/xl/worksheets/sheet1.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>"
        "<Override PartName=\"/xl/styles.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml\"/>"
        "<Override PartName=\"/docProps/core.xml\" ContentType=\"application/vnd.openxmlformats-package.core-properties+xml\"/>"
        "<Override PartName=\"/docProps/app.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.extended-properties+xml\"/>"
        "</Types>";
    static const char rootRels[] =
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">"
        "<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/>"
        "<Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties\" Target=\"docProps/core.xml\"/>"
        "<Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties\" Target=\"docProps/app.xml\"/>"
        "</Relationships>";
    static const char appXml[] =
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<Properties xmlns=\"http://schemas.openxmlformats.org/officeDocument/2006/extended-properties\" "
        "xmlns:vt=\"http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes\">"
        "<Application>Tender Automation</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop>"
        "<HeadingPairs><vt:vector size=\"2\" baseType=\"variant\"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs>"
        "<TitlesOfParts><vt:vector size=\"1\" baseType=\"lpstr\"><vt:lpstr>招标简报</vt:lpstr></vt:vector></TitlesOfParts>"
        "</Properties>";
    static const char coreXml[] =
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<cp:coreProperties xmlns:cp=\"http://schemas.openxmlformats.org/package/2006/metadata/core-properties\" "
        "xmlns:dc=\"http://purl.org/dc/elements/1.1/\" "
        "xmlns:dcterms=\"http://purl.org/dc/terms/\" "
        "xmlns:dcmitype=\"http://purl.org/dc/dcmitype/\" "
        "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">"
        "<dc:creator>Tender Automation</dc:creator><cp:lastModifiedBy>Tender Automation</cp:lastModifiedBy>"
        "</cp:coreProperties>";
    static const char workbookXml[] =
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\">"
        "<workbookPr/><bookViews><workbookView workbookViewId=\"0\"/></bookViews>"
        "<sheets><sheet name=\"招标简报\" sheetId=\"1\" r:id=\"rId1\"/></sheets><calcPr calcId=\"0\"/></workbook>";
    static const char workbookRels[] =
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">"
        "<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"worksheets/sheet1.xml\"/>"
        "<Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/>"
        "</Relationships>";
    static const char stylesXml[] =
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<styleSheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\">"
        "<fonts count=\"3\"><font><sz val=\"10\"/><name val=\"Microsoft YaHei\"/></font><font><b/><sz val=\"10\"/><color rgb=\"FFFFFFFF\"/><name val=\"Microsoft YaHei\"/></font><font><b/><sz val=\"16\"/><color rgb=\"FFFFFFFF\"/><name val=\"Microsoft YaHei\"/></font></fonts>"
        "<fills count=\"4\"><fill><patternFill patternType=\"none\"/></fill><fill><patternFill patternType=\"gray125\"/></fill><fill><patternFill patternType=\"solid\"><fgColor rgb=\"FF4472C4\"/><bgColor indexed=\"64\"/></patternFill></fill><fill><patternFill patternType=\"solid\"><fgColor rgb=\"FF1F4E79\"/><bgColor indexed=\"64\"/></patternFill></fill></fills>"
        "<borders count=\"2\"><border><left/><right/><top/><bottom/><diagonal/></border><border><left/><right/><top/><bottom style=\"thin\"><color rgb=\"FFD9E2F3\"/></bottom><diagonal/></border></borders>"
        "<cellStyleXfs count=\"1\"><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\"/></cellStyleXfs>"
        "<cellXfs count=\"6\"><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\" applyAlignment=\"1\"><alignment vertical=\"top\" wrapText=\"1\"/></xf><xf numFmtId=\"0\" fontId=\"1\" fillId=\"2\" borderId=\"1\" xfId=\"0\" applyFont=\"1\" applyFill=\"1\" applyBorder=\"1\" applyAlignment=\"1\"><alignment horizontal=\"center\" vertical=\"center\" wrapText=\"1\"/></xf><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"1\" xfId=\"0\" applyBorder=\"1\" applyAlignment=\"1\"><alignment vertical=\"top\" wrapText=\"1\"/></xf><xf numFmtId=\"0\" fontId=\"2\" fillId=\"3\" borderId=\"0\" xfId=\"0\" applyFont=\"1\" applyFill=\"1\" applyAlignment=\"1\"><alignment horizontal=\"center\" vertical=\"center\"/></xf><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\" applyAlignment=\"1\"><alignment vertical=\"center\" wrapText=\"1\"/></xf><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"1\" xfId=\"0\" applyFont=\"1\" applyBorder=\"1\" applyAlignment=\"1\"><alignment vertical=\"top\" wrapText=\"1\"/></xf></cellXfs>"
        "<cellStyles count=\"1\"><cellStyle name=\"Normal\" xfId=\"0\" builtinId=\"0\"/></cellStyles>"
        "<dxfs count=\"0\"/><tableStyles count=\"0\" defaultTableStyle=\"TableStyleMedium2\" defaultPivotStyle=\"PivotStyleLight16\"/></styleSheet>";
    HANDLE file;
    ZipWriter zw;
    XmlBuffer sheet;
    XmlBuffer sheetRels;
    BOOL ok = FALSE;

    file = CreateFileW(REPORT_FILE_W, GENERIC_WRITE, 0, NULL, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
    if (file == INVALID_HANDLE_VALUE) {
        printf("ERROR: Failed to create report file. Win32 error=%lu\n", GetLastError());
        return FALSE;
    }

    ZeroMemory(&zw, sizeof(zw));
    ZeroMemory(&sheet, sizeof(sheet));
    ZeroMemory(&sheetRels, sizeof(sheetRels));
    zw.file = file;

    if (!BuildWorksheetXml(items, itemCount, urlCount, failedCount, &sheet)) goto cleanup;
    if (itemCount > 0 && !BuildWorksheetRelsXml(items, itemCount, &sheetRels)) goto cleanup;

    if (!ZipAddEntry(&zw, "[Content_Types].xml", contentTypes, (DWORD)strlen(contentTypes))) goto cleanup;
    if (!ZipAddEntry(&zw, "_rels/.rels", rootRels, (DWORD)strlen(rootRels))) goto cleanup;
    if (!ZipAddEntry(&zw, "docProps/app.xml", appXml, (DWORD)strlen(appXml))) goto cleanup;
    if (!ZipAddEntry(&zw, "docProps/core.xml", coreXml, (DWORD)strlen(coreXml))) goto cleanup;
    if (!ZipAddEntry(&zw, "xl/workbook.xml", workbookXml, (DWORD)strlen(workbookXml))) goto cleanup;
    if (!ZipAddEntry(&zw, "xl/_rels/workbook.xml.rels", workbookRels, (DWORD)strlen(workbookRels))) goto cleanup;
    if (!ZipAddEntry(&zw, "xl/styles.xml", stylesXml, (DWORD)strlen(stylesXml))) goto cleanup;
    if (!ZipAddEntry(&zw, "xl/worksheets/sheet1.xml", sheet.data, sheet.length)) goto cleanup;
    if (itemCount > 0 && !ZipAddEntry(&zw, "xl/worksheets/_rels/sheet1.xml.rels", sheetRels.data, sheetRels.length)) goto cleanup;
    if (!ZipFinish(&zw)) goto cleanup;

    ok = TRUE;

cleanup:
    if (sheet.data != NULL) {
        free(sheet.data);
    }
    if (sheetRels.data != NULL) {
        free(sheetRels.data);
    }
    CloseHandle(file);
    if (!ok) {
        printf("ERROR: Failed while writing xlsx report. Win32 error=%lu\n", GetLastError());
    }
    return ok;
}

static BOOL OpenClipboardWithRetry(HWND owner) {
    int i;

    for (i = 0; i < 20; ++i) {
        if (OpenClipboard(owner)) {
            return TRUE;
        }
        Sleep(50);
    }

    return FALSE;
}

static BOOL CopySearchTextToClipboard(HWND owner) {
    static const WCHAR searchTextW[] = L"\x6587\x4EF6\x4F20\x8F93\x52A9\x624B";
    int ansiBytes;
    SIZE_T unicodeBytes;
    HGLOBAL hAnsi = NULL;
    HGLOBAL hUnicode = NULL;
    char *ansiData;
    WCHAR *unicodeData;

    ansiBytes = WideCharToMultiByte(CP_ACP, 0, searchTextW, -1, NULL, 0, NULL, NULL);
    if (ansiBytes <= 0) {
        printf("ERROR: WideCharToMultiByte failed. Win32 error=%lu\n", GetLastError());
        return FALSE;
    }

    hAnsi = GlobalAlloc(GMEM_MOVEABLE, (SIZE_T)ansiBytes);
    if (hAnsi == NULL) {
        printf("ERROR: GlobalAlloc failed for CF_TEXT.\n");
        return FALSE;
    }

    ansiData = (char *)GlobalLock(hAnsi);
    if (ansiData == NULL) {
        GlobalFree(hAnsi);
        return FALSE;
    }
    WideCharToMultiByte(CP_ACP, 0, searchTextW, -1, ansiData, ansiBytes, NULL, NULL);
    GlobalUnlock(hAnsi);

    unicodeBytes = ((SIZE_T)lstrlenW(searchTextW) + 1U) * sizeof(WCHAR);
    hUnicode = GlobalAlloc(GMEM_MOVEABLE, unicodeBytes);
    if (hUnicode == NULL) {
        GlobalFree(hAnsi);
        printf("ERROR: GlobalAlloc failed for CF_UNICODETEXT.\n");
        return FALSE;
    }

    unicodeData = (WCHAR *)GlobalLock(hUnicode);
    if (unicodeData == NULL) {
        GlobalFree(hAnsi);
        GlobalFree(hUnicode);
        return FALSE;
    }
    CopyMemory(unicodeData, searchTextW, unicodeBytes);
    GlobalUnlock(hUnicode);

    if (!OpenClipboardWithRetry(owner)) {
        GlobalFree(hAnsi);
        GlobalFree(hUnicode);
        printf("ERROR: OpenClipboard failed for search text. Win32 error=%lu\n", GetLastError());
        return FALSE;
    }

    if (!EmptyClipboard()) {
        CloseClipboard();
        GlobalFree(hAnsi);
        GlobalFree(hUnicode);
        return FALSE;
    }

    if (SetClipboardData(CF_TEXT, hAnsi) == NULL) {
        CloseClipboard();
        GlobalFree(hAnsi);
        GlobalFree(hUnicode);
        printf("ERROR: SetClipboardData(CF_TEXT) failed. Win32 error=%lu\n", GetLastError());
        return FALSE;
    }
    hAnsi = NULL;

    if (SetClipboardData(CF_UNICODETEXT, hUnicode) == NULL) {
        GlobalFree(hUnicode);
    }
    hUnicode = NULL;

    CloseClipboard();
    return TRUE;
}

static BOOL CopyFileToClipboard(const WCHAR *filePath, HWND owner) {
    HANDLE file;
    BYTE probe[16];
    DWORD bytesRead = 0;
    int pathChars;
    SIZE_T totalBytes;
    HGLOBAL hDrop;
    DROPFILES_LOCAL *drop;
    WCHAR *fileList;

    file = CreateFileW(filePath, GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    if (file == INVALID_HANDLE_VALUE) {
        printf("ERROR: Cannot open report file before clipboard copy. Win32 error=%lu\n", GetLastError());
        return FALSE;
    }

    if (!ReadFile(file, probe, sizeof(probe), &bytesRead, NULL)) {
        printf("ERROR: Failed to validate report file. Win32 error=%lu\n", GetLastError());
        CloseHandle(file);
        return FALSE;
    }
    CloseHandle(file);

    pathChars = lstrlenW(filePath);
    totalBytes = sizeof(DROPFILES_LOCAL) + ((SIZE_T)pathChars + 2U) * sizeof(WCHAR);

    hDrop = GlobalAlloc(GMEM_MOVEABLE | GMEM_ZEROINIT, totalBytes);
    if (hDrop == NULL) {
        printf("ERROR: GlobalAlloc failed for CF_HDROP.\n");
        return FALSE;
    }

    drop = (DROPFILES_LOCAL *)GlobalLock(hDrop);
    if (drop == NULL) {
        GlobalFree(hDrop);
        return FALSE;
    }

    drop->pFiles = sizeof(DROPFILES_LOCAL);
    drop->pt.x = 0;
    drop->pt.y = 0;
    drop->fNC = FALSE;
    drop->fWide = TRUE;

    fileList = (WCHAR *)((BYTE *)drop + sizeof(DROPFILES_LOCAL));
    CopyMemory(fileList, filePath, ((SIZE_T)pathChars + 1U) * sizeof(WCHAR));
    fileList[pathChars + 1] = L'\0';

    GlobalUnlock(hDrop);

    if (!OpenClipboardWithRetry(owner)) {
        GlobalFree(hDrop);
        printf("ERROR: OpenClipboard failed for report file. Win32 error=%lu\n", GetLastError());
        return FALSE;
    }

    if (!EmptyClipboard()) {
        CloseClipboard();
        GlobalFree(hDrop);
        return FALSE;
    }

    if (SetClipboardData(CF_HDROP, hDrop) == NULL) {
        CloseClipboard();
        GlobalFree(hDrop);
        printf("ERROR: SetClipboardData(CF_HDROP) failed. Win32 error=%lu\n", GetLastError());
        return FALSE;
    }

    CloseClipboard();
    return TRUE;
}

static BOOL SendKeyChord(WORD firstVk, WORD secondVk) {
    INPUT input[4];

    ZeroMemory(input, sizeof(input));

    input[0].type = INPUT_KEYBOARD;
    input[0].ki.wVk = firstVk;

    input[1].type = INPUT_KEYBOARD;
    input[1].ki.wVk = secondVk;

    input[2].type = INPUT_KEYBOARD;
    input[2].ki.wVk = secondVk;
    input[2].ki.dwFlags = KEYEVENTF_KEYUP;

    input[3].type = INPUT_KEYBOARD;
    input[3].ki.wVk = firstVk;
    input[3].ki.dwFlags = KEYEVENTF_KEYUP;

    return SendInput((UINT)ARRAY_COUNT(input), input, sizeof(INPUT)) == ARRAY_COUNT(input);
}

static BOOL SendReturnKey(void) {
    INPUT input[2];

    ZeroMemory(input, sizeof(input));

    input[0].type = INPUT_KEYBOARD;
    input[0].ki.wVk = VK_RETURN;

    input[1].type = INPUT_KEYBOARD;
    input[1].ki.wVk = VK_RETURN;
    input[1].ki.dwFlags = KEYEVENTF_KEYUP;

    return SendInput((UINT)ARRAY_COUNT(input), input, sizeof(INPUT)) == ARRAY_COUNT(input);
}

static BOOL ClickChatInputArea(HWND hwnd) {
    RECT rc;
    LONG x;
    LONG y;
    INPUT input[2];

    if (!GetWindowRect(hwnd, &rc)) {
        return FALSE;
    }

    x = rc.left + ((rc.right - rc.left) * 65) / 100;
    y = rc.bottom - 90;
    SetCursorPos(x, y);

    ZeroMemory(input, sizeof(input));
    input[0].type = INPUT_MOUSE;
    input[0].mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
    input[1].type = INPUT_MOUSE;
    input[1].mi.dwFlags = MOUSEEVENTF_LEFTUP;

    return SendInput((UINT)ARRAY_COUNT(input), input, sizeof(INPUT)) == ARRAY_COUNT(input);
}

typedef struct WeChatSearchState {
    HWND hwnd;
    HWND hiddenCandidate;
} WeChatSearchState;

static BOOL CALLBACK EnumWeChatWindowsProc(HWND hwnd, LPARAM lParam) {
    WeChatSearchState *state = (WeChatSearchState *)lParam;
    WCHAR className[256];
    WCHAR title[512];
    LONG_PTR exStyle;
    BOOL matched;

    if (state == NULL || state->hwnd != NULL) {
        return FALSE;
    }

    className[0] = L'\0';
    title[0] = L'\0';

    GetClassNameW(hwnd, className, (int)ARRAY_COUNT(className));
    GetWindowTextW(hwnd, title, (int)ARRAY_COUNT(title));

    if (wcscmp(className, L"WeChatMainWndForPC") == 0) {
        state->hwnd = hwnd;
        return FALSE;
    }

    matched = wcsstr(className, L"WeChat") != NULL ||
              wcsstr(className, L"Weixin") != NULL ||
              wcsstr(title, L"\x5FAE\x4FE1") != NULL ||
              wcsstr(title, L"WeChat") != NULL ||
              wcsstr(title, L"Weixin") != NULL;

    if (!matched) {
        return TRUE;
    }

    if (!IsWindowVisible(hwnd)) {
        if (state->hiddenCandidate == NULL) {
            state->hiddenCandidate = hwnd;
        }
        return TRUE;
    }

    exStyle = GetWindowLongPtrW(hwnd, GWL_EXSTYLE);
    if ((exStyle & WS_EX_TOOLWINDOW) != 0) {
        return TRUE;
    }

    state->hwnd = hwnd;
    return FALSE;
}

static HWND FindWeChatMainWindow(void) {
    HWND hwnd;
    WeChatSearchState state;

    hwnd = FindWindowA("WeChatMainWndForPC", NULL);
    if (hwnd != NULL) {
        return hwnd;
    }

    ZeroMemory(&state, sizeof(state));
    EnumWindows(EnumWeChatWindowsProc, (LPARAM)&state);
    return state.hwnd != NULL ? state.hwnd : state.hiddenCandidate;
}

static void BringWeChatToFront(HWND hwnd) {
    DWORD currentThread;
    DWORD targetThread;
    DWORD foregroundThread = 0;
    HWND foreground;

    ShowWindow(hwnd, SW_SHOW);
    ShowWindow(hwnd, SW_RESTORE);

    currentThread = GetCurrentThreadId();
    targetThread = GetWindowThreadProcessId(hwnd, NULL);
    foreground = GetForegroundWindow();
    if (foreground != NULL) {
        foregroundThread = GetWindowThreadProcessId(foreground, NULL);
    }

    if (foregroundThread != 0 && foregroundThread != currentThread) {
        AttachThreadInput(currentThread, foregroundThread, TRUE);
    }
    if (targetThread != currentThread) {
        AttachThreadInput(currentThread, targetThread, TRUE);
    }

    SetForegroundWindow(hwnd);
    BringWindowToTop(hwnd);
    SetWindowPos(hwnd, HWND_TOP, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_SHOWWINDOW);
    SetFocus(hwnd);

    if (targetThread != currentThread) {
        AttachThreadInput(currentThread, targetThread, FALSE);
    }
    if (foregroundThread != 0 && foregroundThread != currentThread) {
        AttachThreadInput(currentThread, foregroundThread, FALSE);
    }
}

static BOOL SendReportToWeChat(void) {
    HWND hwnd;

    hwnd = FindWeChatMainWindow();
    if (hwnd == NULL) {
        printf("ERROR: WeChat main window not found. Open WeChat main window first.\n");
        return FALSE;
    }

    BringWeChatToFront(hwnd);
    Sleep(500);

    if (!SendKeyChord(VK_CONTROL, 'F')) {
        printf("ERROR: Failed to send Ctrl+F.\n");
        return FALSE;
    }
    Sleep(300);

    if (!CopySearchTextToClipboard(hwnd)) {
        return FALSE;
    }

    if (!SendKeyChord(VK_CONTROL, 'V')) {
        printf("ERROR: Failed to paste WeChat search text.\n");
        return FALSE;
    }
    Sleep(300);

    if (!SendReturnKey()) {
        printf("ERROR: Failed to open File Transfer Assistant chat.\n");
        return FALSE;
    }
    Sleep(600);
    SendReturnKey();
    Sleep(1200);

    if (!CopyFileToClipboard(REPORT_FILE_W, hwnd)) {
        return FALSE;
    }

    BringWeChatToFront(hwnd);
    Sleep(300);

    if (!ClickChatInputArea(hwnd)) {
        printf("ERROR: Failed to click WeChat input area.\n");
        return FALSE;
    }
    Sleep(300);

    if (!SendKeyChord(VK_CONTROL, 'V')) {
        printf("ERROR: Failed to paste report file into WeChat.\n");
        return FALSE;
    }
    Sleep(800);

    if (!SendReturnKey()) {
        printf("ERROR: Failed to send report file in WeChat.\n");
        return FALSE;
    }

    Sleep(500);
    return TRUE;
}

static BOOL CrawlConfiguredUrls(char urls[MAX_URLS][MAX_URL_LEN], int urlCount, TenderItem *newItems, int *newCount, int *failedCount) {
    int i;

    if (newCount == NULL || failedCount == NULL) {
        return FALSE;
    }

    *newCount = 0;
    *failedCount = 0;
    LoadKeywords();

    for (i = 0; i < urlCount; ++i) {
        char *html = NULL;
        char title[512];
        int matchedLinks;

        printf("[%d/%d] Crawling: %s\n", i + 1, urlCount, urls[i]);

        if (IsJsggzyUrl(urls[i]) && CrawlJsggzyApi(urls[i], newItems, newCount, failedCount)) {
            continue;
        }

        if (IsJszbtbUrl(urls[i]) && CrawlJszbtbApi(urls[i], newItems, newCount, failedCount)) {
            continue;
        }

        if (IsShandongGgzyUrl(urls[i]) && CrawlShandongGgzyApi(urls[i], newItems, newCount, failedCount)) {
            continue;
        }

        if (!FetchUrlUtf8(urls[i], &html)) {
            *failedCount += 1;
            continue;
        }

        matchedLinks = ScanHtmlForTenderLinks(urls[i], html, newItems, newCount);
        ExtractHtmlTitle(html, title, sizeof(title));

        if (matchedLinks == 0 && ContainsTenderKeyword(title) && IsActiveTenderInfo(title, NULL)) {
            AddTenderCandidate(urls[i], urls[i], title, newItems, newCount);
        }

        free(html);
    }

    return TRUE;
}

static BOOL RunPipeline(BOOL sendToWeChat) {
    static char urls[MAX_URLS][MAX_URL_LEN];
    static TenderItem newItems[MAX_ITEMS];
    int urlCount;
    int newCount = 0;
    int failedCount = 0;

    urlCount = LoadUrls(urls);
    if (urlCount <= 0) {
        printf("No crawl URLs configured. Add URLs from the menu first.\n");
        return FALSE;
    }

    if (!CrawlConfiguredUrls(urls, urlCount, newItems, &newCount, &failedCount)) {
        return FALSE;
    }

    if (!WriteReportFile(newItems, newCount, urlCount, failedCount)) {
        return FALSE;
    }
    MarkItemsProcessed(newItems, newCount);

    printf("Report generated: %s\n", U8_REPORT_PATH);
    printf("Matching active items: %d, failed URLs: %d\n", newCount, failedCount);

    if (sendToWeChat) {
        return SendReportToWeChat();
    }

    return TRUE;
}

static void PrintMenu(void) {
    printf("\n");
    printf("========================================\n");
    printf("Tender Automation CLI\n");
    printf("Config: %s\n", CONFIG_FILE_A);
    printf("Report: %s\n", U8_REPORT_PATH);
    printf("========================================\n");
    printf("1. List crawl URLs\n");
    printf("2. Add crawl URL\n");
    printf("3. Remove crawl URL\n");
    printf("4. Clear crawl URLs\n");
    printf("5. Crawl and generate report only\n");
    printf("6. Crawl, generate report, and send to WeChat\n");
    printf("7. Clear processed history\n");
    printf("0. Exit\n");
    printf("Choose: ");
}

int main(void) {
    static char urls[MAX_URLS][MAX_URL_LEN];
    int urlCount;
    char choiceLine[32];

    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);

    if (!EnsureBaseDirectory()) {
        return 1;
    }

    for (;;) {
        urlCount = LoadUrls(urls);
        PrintMenu();

        if (fgets(choiceLine, sizeof(choiceLine), stdin) == NULL) {
            break;
        }

        switch (atoi(choiceLine)) {
        case 1:
            PrintUrls(urls, urlCount);
            break;
        case 2:
            AddUrlInteractive(urls, &urlCount);
            break;
        case 3:
            RemoveUrlInteractive(urls, &urlCount);
            break;
        case 4:
            ClearUrlsInteractive(urls, &urlCount);
            break;
        case 5:
            RunPipeline(FALSE);
            break;
        case 6:
            RunPipeline(TRUE);
            break;
        case 7:
            ClearHistoryInteractive();
            break;
        case 0:
            printf("Bye.\n");
            return 0;
        default:
            printf("Invalid choice.\n");
            break;
        }
    }

    return 0;
}
