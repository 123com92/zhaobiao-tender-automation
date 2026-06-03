# 兼容性与交付说明

## 当前兼容性结论

当前项目是 Windows 专用桌面工具，已经围绕 Windows 进行实现和验证。

已验证：

- MinGW/GCC 构建通过。
- GUI 版本构建通过。
- 控制台版本构建通过。
- 生成的 `.xlsx` 能被本机 Excel 打开。
- Excel 简报包含项目负责人和联系方式列。
- 关键词可在前端输入并保存。

未验证：

- macOS
- Linux
- Wine
- 非电脑版微信
- 微信未登录、电脑锁屏、远程桌面断开等无人值守边界场景

## 为什么暂不跨平台

代码使用了大量 Win32 能力：

- `CreateDirectory`
- `CreateFile`
- `FindWindow`
- `EnumWindows`
- `SetForegroundWindow`
- `SendInput`
- Windows Clipboard
- `CF_HDROP`
- WinInet
- `ShellExecute`

这些接口在 macOS 和 Linux 上不存在，因此不能直接跨平台编译。

## 微信发送限制

微信发送是 UI 自动化，不是微信开放 API。

要求：

- 电脑版微信已登录。
- 微信主窗口存在。
- 程序能找到窗口类名 `WeChatMainWndForPC`。
- 系统桌面未锁屏。
- 剪贴板没有被其他程序长时间占用。

如果用户要求完全无人值守，后续建议升级为：

1. Windows Task Scheduler 拉起程序。
2. 程序启动后自动执行一次并退出。
3. 增加失败重试和日志文件。
4. 增加运行前检测：微信进程、窗口、网络、剪贴板。
5. 在锁屏场景下评估是否改用企业微信机器人、邮件或 HTTP webhook。

## Excel 兼容性说明

报告不是旧版 `.xls`，而是真正的 `.xlsx` OpenXML 包。

生成器做了以下兼容性处理：

- 写入 `[Content_Types].xml`
- 写入 `_rels/.rels`
- 写入 `docProps`
- 写入 workbook、worksheet、styles 和 hyperlink relationships
- 避免空 `<hyperlinks>` 节点
- 使用 Deflate stored blocks 写 ZIP 条目
- 清洗非法 UTF-8，避免中文截断导致 Excel 拒绝打开

## 交付目录建议

给用户交付时，最小目录可以是：

```text
zhaobiao\
  tender_automation.c
  tender_automation_gui.c
  build_gui.cmd
  build_gcc.cmd
  setup_toolchain.cmd
  tools\
    7zr.exe
    w64devkit-x64-2.8.0.7z.exe
    bin\
      cl.cmd
      cl-wrapper.ps1
  docs\
  README.md
```

用户首次运行：

```bat
build_gui.cmd
tender_automation_gui.exe
```

## 本地同步策略

本地目录和 GitHub 仓库保持一致的流程：

```bat
git status
git add .
git commit -m "Update tender automation app"
git push origin main
git pull --ff-only origin main
```

如果后续多人维护，建议使用 Pull Request，不要直接在多个电脑同时改主分支。
