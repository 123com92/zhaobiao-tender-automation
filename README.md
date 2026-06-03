# 招标信息自动汇报工具

这是一个 Windows 桌面端招标信息自动汇报工具，用于按关键词抓取招标/采购阶段的信息，生成 Excel 简报，并可自动发送到电脑版微信“文件传输助手”。

## 当前能力

- 图形界面配置爬取网址。
- 图形界面配置关键词，默认：空调、维保、废品回收。
- 自动过滤无效公告，重点保留招标/采购阶段信息。
- 增量去重，避免同一项目重复汇报。
- 生成企业投标员更容易阅读的 Excel 简报。
- 简报包含项目名称、预算/最高限价、投标截止/开标、标书获取时间、项目负责人、联系方式、资质要求摘要、核心要求摘要、公告链接、来源和备注。
- 可一键发送 Excel 文件到微信“文件传输助手”。
- 支持在应用保持运行时按上午/下午时间定时执行。

## 快速使用

1. 运行 `tender_automation_gui.exe`。
2. 在“关键词”输入框填写关键词，多个关键词可用顿号、逗号或换行分隔，然后点击“保存关键词”。
3. 添加招标列表页网址，例如 `http://jsggzy.jszwfw.gov.cn/`。
4. 点击“生成报告”。
5. 打开 `D:\TenderDocs\最新招标信息汇报.xlsx` 查看结果。
6. 如需发送微信，先登录电脑版微信，再点击“生成报告并发送微信”。

## 文件位置

运行时数据固定写入：

- 工作目录：`D:\TenderDocs`
- Excel 报告：`D:\TenderDocs\最新招标信息汇报.xlsx`
- 网址配置：`D:\TenderDocs\sites.txt`
- 关键词配置：`D:\TenderDocs\keywords.txt`
- 增量历史：`D:\TenderDocs\history_log.txt`
- 定时配置：`D:\TenderDocs\schedule.txt`

## 构建

项目已经带有 Windows GCC 工具链压缩包：

- `tools\w64devkit-x64-2.8.0.7z.exe`
- `tools\7zr.exe`

首次构建会自动解压 `tools\w64devkit`：

```bat
build_gui.cmd
```

生成 GUI 程序：

```text
tender_automation_gui.exe
```

生成控制台程序：

```bat
build_gcc.cmd
```

如果本机有 Visual Studio / MSVC，也可尝试：

```bat
build_cl.cmd
```

## 文档

- [用户操作手册](docs/USER_GUIDE.md)
- [环境与依赖说明](docs/ENVIRONMENT.md)
- [兼容性与交付说明](docs/COMPATIBILITY.md)

## 重要限制

本项目当前是 Windows 专用实现，依赖 Win32 API、Windows 剪贴板、电脑版微信窗口类名和 `D:\TenderDocs` 固定目录。暂未对 macOS、Linux 或移动端微信做适配测试。
