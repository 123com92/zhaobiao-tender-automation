@echo off
setlocal
set "ROOT=%~dp0"
call "%ROOT%setup_toolchain.cmd"
if errorlevel 1 exit /b %ERRORLEVEL%
set "PATH=%ROOT%tools\w64devkit\bin;%PATH%"
gcc -std=c11 -O2 "%ROOT%tender_automation_gui.c" -o "%ROOT%tender_automation_gui.exe" -mwindows -luser32 -lkernel32 -lshell32
exit /b %ERRORLEVEL%
