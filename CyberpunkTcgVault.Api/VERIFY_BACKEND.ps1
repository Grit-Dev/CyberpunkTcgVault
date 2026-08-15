$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

Write-Host "Choom Vault backend verification" -ForegroundColor Cyan
Write-Host "Repository: $Root"

Write-Host "`n1/4 - .NET SDK" -ForegroundColor Cyan
dotnet --info

Write-Host "`n2/4 - Restore" -ForegroundColor Cyan
dotnet restore .\CyberpunkTcgVault.Api.csproj
dotnet restore .\Tests\CyberpunkTcgVault.Api.Tests.csproj

Write-Host "`n3/4 - Release build" -ForegroundColor Cyan
dotnet build .\CyberpunkTcgVault.Api.csproj -c Release --no-restore

Write-Host "`n4/4 - Tests" -ForegroundColor Cyan
dotnet test .\Tests\CyberpunkTcgVault.Api.Tests.csproj -c Release --no-restore

Write-Host "`nVerification completed successfully." -ForegroundColor Green
Write-Host "Development database migrations are applied automatically when the API starts with ASPNETCORE_ENVIRONMENT=Development." -ForegroundColor Cyan
Write-Host "Production migrations remain an explicit deployment step." -ForegroundColor Cyan
