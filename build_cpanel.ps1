$ErrorActionPreference = 'Stop'

Write-Host "Building Next.js project..."
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed! Please fix the errors before deploying."
    exit $LASTEXITCODE
}

Write-Host "Preparing cPanel export directory..."
if (Test-Path 'cpanel_export') { Remove-Item -Path 'cpanel_export' -Recurse -Force }
New-Item -ItemType Directory -Force -Path 'cpanel_export' | Out-Null
New-Item -ItemType Directory -Force -Path 'cpanel_export\app' | Out-Null

Write-Host "Copying standalone build files..."
Copy-Item -Path '.next\standalone\*' -Destination 'cpanel_export\app\' -Recurse -Force

Write-Host "Copying static assets..."
New-Item -ItemType Directory -Force -Path 'cpanel_export\app\.next\static' | Out-Null
Copy-Item -Path '.next\static\*' -Destination 'cpanel_export\app\.next\static\' -Recurse -Force

Write-Host "Copying public folder..."
New-Item -ItemType Directory -Force -Path 'cpanel_export\app\public' | Out-Null
Get-ChildItem -Path public | Copy-Item -Destination 'cpanel_export\app\public\' -Recurse -Force

Write-Host "Copying src/data folder (needed for backend json reads)..."
if (Test-Path 'src\data') {
    New-Item -ItemType Directory -Force -Path 'cpanel_export\app\src\data' | Out-Null
    Copy-Item -Path 'src\data\*' -Destination 'cpanel_export\app\src\data\' -Recurse -Force
}

Write-Host "Setting up cPanel Passenger environment variables..."
$envContent = @"
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=2048 --max-semi-space-size=256
UV_THREADPOOL_SIZE=128
"@
[System.IO.File]::WriteAllText("$PWD\cpanel_export\app\.env", $envContent)

Write-Host "Creating restart.txt for automatic Passenger restart..."
New-Item -ItemType Directory -Force -Path 'cpanel_export\tmp' | Out-Null
New-Item -ItemType File -Force -Path 'cpanel_export\tmp\restart.txt' | Out-Null
Set-Content -Path 'cpanel_export\tmp\restart.txt' -Value $(Get-Date)

$desktopPath = [Environment]::GetFolderPath("Desktop")
$zipPath = Join-Path -Path $desktopPath -ChildPath "cpanel-deploy.zip"

if (Test-Path $zipPath) { Remove-Item -Path $zipPath -Force }

Write-Host "Zipping the deployment package to Desktop..."
Compress-Archive -Path 'cpanel_export\*' -DestinationPath $zipPath -Force

Write-Host "Cleaning up export directory..."
Remove-Item -Path 'cpanel_export' -Recurse -Force

Write-Host "Done! You can now upload 'cpanel-deploy.zip' from your Desktop to your cPanel hosting."
Write-Host "Extract it in your tasariegitimyayinlari.com folder and make sure the Node.js app is pointed to 'app/server.js'."
