$ErrorActionPreference = 'Continue'
foreach ($v in 'http_proxy','https_proxy','all_proxy','no_proxy','HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','NO_PROXY') {
  Remove-Item -ErrorAction SilentlyContinue "Env:$v"
}
$env:GIT_TERMINAL_PROMPT = '0'
Set-Location 'C:\Users\tabris\.zcode\workspace\default\szres-website'
$log = 'C:\Users\tabris\.zcode\workspace\default\szres-website\deploy-log.txt'
"=== push via local proxy $(Get-Date -Format o) ===" | Out-File $log -Encoding utf8
for ($i = 1; $i -le 4; $i++) {
  & git.exe -c http.proxy=http://127.0.0.1:7897 -c https.proxy=http://127.0.0.1:7897 push origin main 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
  if ($LASTEXITCODE -eq 0) { "push ok attempt $i" | Out-File $log -Append -Encoding utf8; break }
  "push attempt $i failed ($LASTEXITCODE)" | Out-File $log -Append -Encoding utf8
  Start-Sleep -Seconds 4
}
Get-Content $log
