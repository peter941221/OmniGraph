param(
  [int]$Port = 3100
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

New-Item -ItemType Directory -Force ".lighthouse" | Out-Null
New-Item -ItemType Directory -Force ".lighthouse/chrome-profile" | Out-Null
$chromeFlags = "--headless --no-sandbox --disable-dev-shm-usage --user-data-dir=.lighthouse/chrome-profile"

$job = Start-Job -ScriptBlock {
  param($RootPath, $ServerPort)
  Set-Location $RootPath
  npm run start -- -p $ServerPort
} -ArgumentList $repoRoot, $Port

Start-Sleep -Seconds 12

try {
  npx lighthouse "http://localhost:$Port" `
    --quiet `
    --chrome-flags="$chromeFlags" `
    --preset=desktop `
    --output=json `
    --output-path=".lighthouse/home-desktop.json"

  npx lighthouse "http://localhost:$Port/graph/rag/naive-rag-flow" `
    --quiet `
    --chrome-flags="$chromeFlags" `
    --preset=desktop `
    --output=json `
    --output-path=".lighthouse/graph-desktop.json"

  npx lighthouse "http://localhost:$Port" `
    --quiet `
    --chrome-flags="$chromeFlags" `
    --form-factor=mobile `
    --screenEmulation.mobile=true `
    --output=json `
    --output-path=".lighthouse/home-mobile.json"
}
finally {
  Stop-Job -Job $job -ErrorAction SilentlyContinue | Out-Null
  Remove-Job -Job $job -Force -ErrorAction SilentlyContinue
}

Write-Host "Lighthouse reports written to .lighthouse/"
