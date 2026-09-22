$ErrorActionPreference = 'Continue'
foreach ($v in 'http_proxy','https_proxy','all_proxy','no_proxy','HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','NO_PROXY') {
  Remove-Item -ErrorAction SilentlyContinue "Env:$v"
}
$env:GIT_TERMINAL_PROMPT = '0'
Set-Location 'C:\Users\tabris\.zcode\workspace\default\szres-website'
$log = 'C:\Users\tabris\.zcode\workspace\default\szres-website\git-net-log.txt'
"=== deploy2 start $(Get-Date -Format o) ===" | Out-File $log -Encoding utf8

# 1. fix garbled commit message from file (read as utf-8 by git)
& git.exe commit --amend -F .git-msg.txt 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
"amend exit: $LASTEXITCODE" | Out-File $log -Append -Encoding utf8

# 2. merge remote initial commit, keep our tree entirely
& git.exe merge origin/main --allow-unrelated-histories -s ours -m "Merge remote initial commit (auto-generated README)" 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
"merge exit: $LASTEXITCODE" | Out-File $log -Append -Encoding utf8

# 3. push (with retries)
$ok = $false
for ($i = 1; $i -le 5; $i++) {
  & git.exe push -u origin main 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
  if ($LASTEXITCODE -eq 0) { $ok = $true; "push ok on attempt $i" | Out-File $log -Append -Encoding utf8; break }
  "push attempt $i failed ($LASTEXITCODE)" | Out-File $log -Append -Encoding utf8
  Start-Sleep -Seconds 4
}
"--- final log ---" | Out-File $log -Append -Encoding utf8
& git.exe log --oneline -5 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
Get-Content $log
