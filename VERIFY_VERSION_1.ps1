$ErrorActionPreference = "Stop"

function Invoke-CheckedStep {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Label,

        [Parameter(Mandatory = $true)]
        [scriptblock] $Command
    )

    Write-Host "`n$Label" -ForegroundColor Cyan
    & $Command

    if ($LASTEXITCODE -ne 0) {
        throw "$Label failed with exit code $LASTEXITCODE."
    }
}

$RepositoryRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepositoryRoot

$Solution = ".\CyberpunkTcgVault.sln"
$BackendSuiteOne = ".\CyberpunkTcgVault.Api.Tests\CyberpunkTcgVault.Api.Tests.csproj"
$BackendSuiteTwo = ".\CyberpunkTcgVault.Api\Tests\CyberpunkTcgVault.Api.Tests.csproj"
$Frontend = ".\CyberpunkTcgVault.Web"

Write-Host "Choom Vault Version 1 verification" -ForegroundColor Cyan
Write-Host "Repository: $RepositoryRoot"

Invoke-CheckedStep "1/9 - Backend restore" {
    dotnet restore $Solution
}

Invoke-CheckedStep "2/9 - Backend secondary-suite restore" {
    dotnet restore $BackendSuiteTwo
}

Invoke-CheckedStep "3/9 - Backend Release build" {
    dotnet build $Solution -c Release --no-restore
}

Invoke-CheckedStep "4/9 - Backend secondary-suite Release build" {
    dotnet build $BackendSuiteTwo -c Release --no-restore
}

Invoke-CheckedStep "5/9 - Backend tests - suite one" {
    dotnet test $BackendSuiteOne -c Release --no-build --no-restore
}

Invoke-CheckedStep "6/9 - Backend tests - suite two" {
    dotnet test $BackendSuiteTwo -c Release --no-build --no-restore
}

Push-Location $Frontend
try {
    Invoke-CheckedStep "7/9 - Frontend clean dependency install" {
        npm ci
    }

    Invoke-CheckedStep "8/9 - Frontend tests" {
        npm test -- --watch=false
    }

    Invoke-CheckedStep "9/9 - Frontend production build" {
        npm run build -- --configuration production
    }
}
finally {
    Pop-Location
}

Write-Host "`nVersion 1 verification completed successfully." -ForegroundColor Green
