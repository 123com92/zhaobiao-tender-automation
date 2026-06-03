@echo off
set "ROOT=%~dp0"
call "%ROOT%setup_toolchain.cmd"
if errorlevel 1 exit /b %ERRORLEVEL%
set "PATH=%ROOT%tools\bin;%ROOT%tools\w64devkit\bin;%PATH%"
echo Local C toolchain enabled for this console.
echo gcc: %ROOT%tools\w64devkit\bin\gcc.exe
echo cl : %ROOT%tools\bin\cl.cmd
