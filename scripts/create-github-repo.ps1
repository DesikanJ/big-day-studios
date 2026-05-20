# Creates github.com/DesikanJ/big-day-studios and pushes main.
# Requires: GitHub CLI (gh) logged in — install: winget install GitHub.cli
# Or create the repo manually: https://github.com/new?name=big-day-studios

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$repo = "DesikanJ/big-day-studios"

if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh repo create $repo --public --source=. --remote=origin --push
  Write-Host "Done: https://github.com/$repo"
} else {
  Write-Host @"

GitHub CLI (gh) not found. Do this manually:

1. Open: https://github.com/new?name=big-day-studios
2. Create repository (no README / no .gitignore)
3. Run:

   git push -u origin main

"@
}
