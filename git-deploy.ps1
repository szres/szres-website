$ErrorActionPreference = 'Continue'
foreach ($v in 'http_proxy','https_proxy','all_proxy','no_proxy','HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','NO_PROXY') {
  Remove-Item -ErrorAction SilentlyContinue "Env:$v"
}
$env:GIT_TERMINAL_PROMPT = '0'
Set-Location 'C:\Users\tabris\.zcode\workspace\default\szres-website'
$log = 'C:\Users\tabris\.zcode\workspace\default\szres-website\deploy-log.txt'
"=== deploy3 start $(Get-Date -Format o) ===" | Out-File $log -Encoding utf8

# 1. push (retries)
$ok = $false
for ($i = 1; $i -le 5; $i++) {
  & git.exe push origin main 2>&1 | Out-String | Out-File $log -Append -Encoding utf8
  if ($LASTEXITCODE -eq 0) { $ok = $true; "push ok attempt $i" | Out-File $log -Append -Encoding utf8; break }
  "push attempt $i failed ($LASTEXITCODE)" | Out-File $log -Append -Encoding utf8
  Start-Sleep -Seconds 4
}

# 2. credential
$creds = "protocol=https`nhost=github.com`n`n" | & git.exe credential fill 2>&1 | Out-String
$lines = $creds -split "`n"
$user = ($lines | Where-Object { $_ -like 'username=*' }) -replace 'username=', ''
$pass = ($lines | Where-Object { $_ -like 'password=*' }) -replace 'password=', ''
"credential user: $user" | Out-File $log -Append -Encoding utf8
$headers = @{ Authorization = "token $pass"; Accept = 'application/vnd.github+json'; 'X-GitHub-Api-Version' = '2022-11-28' }

# 3. make repo public (free org plan only serves Pages from public repos)
try {
  $r = Invoke-RestMethod -Method Patch -Uri 'https://api.github.com/repos/szres/szres-website' -Headers $headers -Body '{"private":false}' -ContentType 'application/json'
  "repo visibility now: private=$($r.private)" | Out-File $log -Append -Encoding utf8
} catch {
  "set public failed: $($_.Exception.Response.StatusCode.value__) $($_.ErrorDetails.Message)" | Out-File $log -Append -Encoding utf8
}

# 4. enable Pages
try {
  $resp = Invoke-RestMethod -Method Post -Uri 'https://api.github.com/repos/szres/szres-website/pages' -Headers $headers -Body '{"source":{"branch":"main","path":"/"}}' -ContentType 'application/json'
  "pages created: $($resp.html_url)" | Out-File $log -Append -Encoding utf8
} catch {
  $status = $_.Exception.Response.StatusCode.value__
  "pages create: $status $($_.ErrorDetails.Message)" | Out-File $log -Append -Encoding utf8
}

# 5. pages info
try {
  $info = Invoke-RestMethod -Method Get -Uri 'https://api.github.com/repos/szres/szres-website/pages' -Headers $headers
  "pages url: $($info.html_url)  status: $($info.status)" | Out-File $log -Append -Encoding utf8
} catch {
  "pages info failed: $($_.Exception.Response.StatusCode.value__)" | Out-File $log -Append -Encoding utf8
}
Get-Content $log
