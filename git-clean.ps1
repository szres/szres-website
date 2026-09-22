$ErrorActionPreference = 'Continue'
foreach ($v in 'http_proxy','https_proxy','all_proxy','no_proxy','HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','NO_PROXY') {
  Remove-Item -ErrorAction SilentlyContinue "Env:$v"
}
$env:GIT_TERMINAL_PROMPT = '0'
Set-Location 'C:\Users\tabris\.zcode\workspace\default\szres-website'
& git.exe rm -q --cached git-deploy.ps1 git-push.ps1 2>&1 | Out-Null
& git.exe commit -m "chore: keep deploy helper scripts local-only" 2>&1 | Out-Null
& git.exe push origin main 2>&1 | Out-String
"push exit: $LASTEXITCODE"
