$ErrorActionPreference = 'Continue'
foreach ($v in 'http_proxy','https_proxy','all_proxy','no_proxy','HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','NO_PROXY') {
  Remove-Item -ErrorAction SilentlyContinue "Env:$v"
}
$env:GIT_TERMINAL_PROMPT = '0'
Set-Location 'C:\Users\tabris\.zcode\workspace\default\szres-website'
$log = 'C:\Users\tabris\.zcode\workspace\default\szres-website\git-net-log.txt'
"=== fetch retry start $(Get-Date -Format o) ===" | Out-File $log -Encoding utf8
$ok = $false
for ($i = 1; $i -le 6; $i++) {
  & git.exe fetch origin 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
  $code = $LASTEXITCODE
  "attempt $i exit: $code" | Out-File $log -Append -Encoding utf8
  if ($code -eq 0) { $ok = $true; break }
  Start-Sleep -Seconds 3
}
"--- show-ref ---" | Out-File $log -Append -Encoding utf8
& git.exe show-ref 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
"--- remote main tree ---" | Out-File $log -Append -Encoding utf8
& git.exe ls-tree -r --name-only origin/main 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
"--- remote main log ---" | Out-File $log -Append -Encoding utf8
& git.exe log --oneline origin/main 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
Get-Content $log
