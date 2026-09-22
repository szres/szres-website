$ErrorActionPreference = 'Continue'
# purge every proxy env variant explicitly
foreach ($v in 'http_proxy','https_proxy','all_proxy','no_proxy','HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','NO_PROXY') {
  Remove-Item -ErrorAction SilentlyContinue "Env:$v"
}
$env:GIT_TERMINAL_PROMPT = '0'
Set-Location 'C:\Users\tabris\.zcode\workspace\default\szres-website'
$log = 'C:\Users\tabris\.zcode\workspace\default\szres-website\push-log.txt'
"=== push start $(Get-Date -Format o) ===" | Out-File $log -Encoding utf8
& git.exe push -u origin main 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
"push exit code: $LASTEXITCODE" | Out-File $log -Append -Encoding utf8
Get-Content $log
