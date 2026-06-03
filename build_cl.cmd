@echo off
setlocal
set "ROOT=%~dp0"
call "%ROOT%setup_toolchain.cmd"
if errorlevel 1 exit /b %ERRORLEVEL%
set "PATH=%ROOT%tools\bin;%ROOT%tools\w64devkit\bin;%PATH%"
cl /nologo /W4 "%ROOT%tender_automation.c" /Fe"%ROOT%tender_automation_cl.exe" user32.lib kernel32.lib
exit /b %ERRORLEVEL%
