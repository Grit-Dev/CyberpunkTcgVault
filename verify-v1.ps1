# Authoritative local Choom Vault Version 1 release gate.
# Run from the repository root with: .\verify-v1.ps1

$ErrorActionPreference = 'Stop'

function Invoke-CheckedStep {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Name,

        [Parameter(Mandatory = $true)]
        [scriptblock] $Command
    )

    Write-Host "`n==> $Name"
    & $Command

    if ($LASTEXITCODE -ne 0) {
        throw "$Name failed with exit code $LASTEXITCODE."
    }
}

$repositoryRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repositoryRoot

$solution = '.\CyberpunkTcgVault.sln'
$rootBackendTests = '.\CyberpunkTcgVault.Api.Tests\CyberpunkTcgVault.Api.Tests.csproj'
$nestedBackendTests = '.\CyberpunkTcgVault.Api\Tests\CyberpunkTcgVault.Api.Tests.csproj'

Invoke-CheckedStep 'Restore backend solution' {
    dotnet restore $solution
}

Invoke-CheckedStep 'Restore nested backend test suite' {
    dotnet restore $nestedBackendTests
}

Invoke-CheckedStep 'Build backend solution' {
    dotnet build $solution --configuration Release --no-restore
}

Invoke-CheckedStep 'Build nested backend test suite' {
    dotnet build $nestedBackendTests --configuration Release --no-restore
}

Invoke-CheckedStep 'Run root backend automated-test suite' {
    dotnet test $rootBackendTests --configuration Release --no-build --no-restore
}

Invoke-CheckedStep 'Run nested backend service/security/contract suite' {
    dotnet test $nestedBackendTests --configuration Release --no-build --no-restore
}

Push-Location '.\CyberpunkTcgVault.Web'
try {
    Invoke-CheckedStep 'Clean install frontend dependencies' {
        npm ci
    }

    Invoke-CheckedStep 'Run Angular tests' {
        npm test -- --watch=false
    }

    Invoke-CheckedStep 'Build Angular production bundle' {
        npm run build -- --configuration production
    }
}
finally {
    Pop-Location
}

Write-Host "`nVersion 1 local release gate passed."
