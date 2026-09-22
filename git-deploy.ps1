$ErrorActionPreference = 'Continue'
foreach ($v in 'http_proxy','https_proxy','all_proxy','no_proxy','HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','NO_PROXY') {
  Remove-Item -ErrorAction SilentlyContinue "Env:$v"
}
$env:GIT_TERMINAL_PROMPT = '0'
Set-Location 'C:\Users\tabris\.zcode\workspace\default\szres-website'
$log = 'C:\Users\tabris\.zcode\workspace\default\szres-website\git-net-log.txt'
"=== deploy start $(Get-Date -Format o) ===" | Out-File $log -Encoding utf8

# 1. commit local changes
& git.exe add -A 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
& git.exe commit -m "按反馈改版：LOGO 抠透明只留大鹏鸟，首页改为 ingress 式大字标语 + 全屏地图背景" 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
"commit exit: $LASTEXITCODE" | Out-File $log -Append -Encoding utf8

# 2. fetch remote (with retries)
$ok = $false
for ($i = 1; $i -le 5; $i++) {
  & git.exe fetch origin 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
  if ($LASTEXITCODE -eq 0) { $ok = $true; "fetch ok on attempt $i" | Out-File $log -Append -Encoding utf8; break }
  "fetch attempt $i failed ($LASTEXITCODE), retrying..." | Out-File $log -Append -Encoding utf8
  Start-Sleep -Seconds 4
}
"--- refs after fetch ---" | Out-File $log -Append -Encoding utf8
& git.exe show-ref 2>&1 | Out-String | Out-File $log -Append -Encoding utf8

if ($ok) {
  "--- remote main content ---" | Out-File $log -Append -Encoding utf8
  & git.exe log --oneline --stat origin/main 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
} else {
  "FETCH FAILED after retries" | Out-File $log -Append -Encoding utf8
}
Get-Content $log
