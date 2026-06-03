@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0cl-wrapper.ps1" %*
exit /b %ERRORLEVEL%
