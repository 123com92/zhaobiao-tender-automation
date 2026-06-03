@echo off
setlocal
set "ROOT=%~dp0"
call "%ROOT%setup_toolchain.cmd"
if errorlevel 1 exit /b %ERRORLEVEL%
set "PATH=%ROOT%tools\w64devkit\bin;%PATH%"
gcc -std=c11 -Wall -Wextra -O2 "%ROOT%tender_automation.c" -o "%ROOT%tender_automation.exe" -luser32 -lkernel32
exit /b %ERRORLEVEL%
