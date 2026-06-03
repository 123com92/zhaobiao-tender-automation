# 环境与依赖说明

## 1. 运行环境

当前版本面向 Windows 桌面环境：

- Windows 10 / Windows 11
- 电脑版微信
- Excel 或 WPS 表格用于查看 `.xlsx`

程序本身生成 Excel 文件不依赖 Office COM，不需要安装 Excel 才能生成报告；但查看报告需要 Excel/WPS 或其他兼容表格软件。

## 2. 代码依赖

核心代码只使用 Windows 原生 API 和 C 标准库：

- `windows.h`
- Win32 文件 API
- Win32 窗口 API
- Win32 剪贴板 API
- WinInet 动态加载
- ShellExecute

没有引入第三方 C 库。

## 3. 已随项目打包的工具

项目包含可离线恢复的构建工具：

```text
tools\7zr.exe
tools\w64devkit-x64-2.8.0.7z.exe
tools\bin\cl.cmd
tools\bin\cl-wrapper.ps1
```

其中：

- `w64devkit-x64-2.8.0.7z.exe` 是 MinGW/GCC 工具链压缩包。
- `7zr.exe` 用于解压工具链。
- `tools\w64devkit\` 是解压后的本地工具链目录，体积较大，不建议提交到 Git。
- `.gitignore` 已忽略 `tools\w64devkit\`。

## 4. 初始化工具链

手动初始化：

```bat
setup_toolchain.cmd
```

构建脚本也会自动调用它：

```bat
build_gui.cmd
build_gcc.cmd
build_cl.cmd
```

## 5. 构建命令

构建 GUI 应用：

```bat
build_gui.cmd
```

构建控制台应用：

```bat
build_gcc.cmd
```

尝试使用 MSVC 构建控制台应用：

```bat
build_cl.cmd
```

## 6. 输出文件

```text
tender_automation_gui.exe
tender_automation.exe
tender_automation_cl.exe
```

其中 `tender_automation_gui.exe` 是普通用户主要使用的版本。

## 7. GitHub 仓库建议

建议提交：

- `.c` 源码
- `.cmd` 构建脚本
- `tools\7zr.exe`
- `tools\w64devkit-x64-2.8.0.7z.exe`
- `tools\bin\*.cmd`
- `tools\bin\*.ps1`
- `docs\*.md`
- `README.md`

建议不提交：

- `tools\w64devkit\`
- 临时调试 Excel
- 用户运行数据目录 `D:\TenderDocs`

## 8. 后续维护注意点

- 如目标网站接口或页面结构变化，需要更新解析逻辑。
- 微信 UI 自动化依赖窗口类名和键盘模拟，微信版本升级可能影响发送流程。
- 当前 Excel 是手写 OpenXML `.xlsx`，没有依赖外部 Excel 库；改动时要继续做 Excel 打开验证。
- 定时任务当前依赖 GUI 进程保持运行，不是 Windows Task Scheduler 服务。
