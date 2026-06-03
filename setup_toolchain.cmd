@echo off
setlocal
set "ROOT=%~dp0"
set "TOOLS=%ROOT%tools"
set "GCC=%TOOLS%\w64devkit\bin\gcc.exe"
set "ARCHIVE=%TOOLS%\w64devkit-x64-2.8.0.7z.exe"
set "EXTRACTOR=%TOOLS%\7zr.exe"

if exist "%GCC%" (
    echo w64devkit is ready: %GCC%
    exit /b 0
)

if not exist "%ARCHIVE%" (
    echo ERROR: Missing bundled toolchain archive: %ARCHIVE%
    exit /b 1
)

if not exist "%EXTRACTOR%" (
    echo ERROR: Missing bundled extractor: %EXTRACTOR%
    exit /b 1
)

echo Extracting bundled w64devkit toolchain...
"%EXTRACTOR%" x "%ARCHIVE%" -o"%TOOLS%" -y
if errorlevel 2 (
    echo ERROR: Failed to extract w64devkit.
    exit /b 1
)

if not exist "%GCC%" (
    echo ERROR: gcc.exe was not found after extraction.
    exit /b 1
)

echo w64devkit is ready: %GCC%
exit /b 0
