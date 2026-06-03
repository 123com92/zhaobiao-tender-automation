$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$gcc = Join-Path $scriptDir '..\w64devkit\bin\gcc.exe'

if (-not (Test-Path $gcc)) {
    Write-Error "gcc.exe was not found at $gcc"
    exit 1
}

$gccArgs = New-Object System.Collections.Generic.List[string]
$gccArgs.Add('-std=c11')

foreach ($arg in $args) {
    if ([string]::IsNullOrWhiteSpace($arg)) {
        continue
    }

    if ($arg -ieq '/nologo' -or $arg -ieq '/TC' -or $arg -ieq '/link') {
        continue
    }

    if ($arg -match '^/W[0-4]$') {
        $gccArgs.Add('-Wall')
        $gccArgs.Add('-Wextra')
        continue
    }

    if ($arg -match '^/D(.+)$') {
        $gccArgs.Add("-D$($matches[1])")
        continue
    }

    if ($arg -match '^/I(.+)$') {
        $gccArgs.Add("-I$($matches[1])")
        continue
    }

    if ($arg -match '^/Fe(.+)$') {
        $gccArgs.Add('-o')
        $gccArgs.Add($matches[1])
        continue
    }

    if ($arg -match '^/Fo(.+)$') {
        $gccArgs.Add('-o')
        $gccArgs.Add($matches[1])
        continue
    }

    if ($arg -ieq '/c') {
        $gccArgs.Add('-c')
        continue
    }

    if ($arg -match '^/O') {
        $gccArgs.Add('-O2')
        continue
    }

    if ($arg -ieq '/Zi') {
        $gccArgs.Add('-g')
        continue
    }

    if ($arg -match '^/LIBPATH:(.+)$') {
        $gccArgs.Add("-L$($matches[1])")
        continue
    }

    if ($arg -match '^(.*)\.lib$') {
        $gccArgs.Add("-l$($matches[1])")
        continue
    }

    if ($arg.StartsWith('/')) {
        continue
    }

    $gccArgs.Add($arg)
}

& $gcc @gccArgs
exit $LASTEXITCODE
