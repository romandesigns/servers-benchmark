# Benchmark Runner Script
# This script helps you run Docker Compose with different resource configurations

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("low", "medium", "high", "default", "custom")]
    [string]$ResourceLevel,
    
    [string]$CustomEnvFile = "",
    
    [ValidateSet("up", "down", "restart", "logs")]
    [string]$Action = "up",
    
    [switch]$Detached = $false,
    
    [string]$Services = ""
)

function Show-Usage {
    Write-Host "Usage: .\run-benchmark.ps1 -ResourceLevel <level> [-Action <action>] [-Detached] [-Services <services>]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Resource Levels:" -ForegroundColor Cyan
    Write-Host "  low     - 1GB RAM, 1.0 CPU per service" -ForegroundColor Green
    Write-Host "  medium  - 2GB RAM, 2.0 CPU per service" -ForegroundColor Green
    Write-Host "  high    - 4GB RAM, 4.0 CPU per service" -ForegroundColor Green
    Write-Host "  default - 384MB RAM, 0.75 CPU per service" -ForegroundColor Green
    Write-Host "  custom  - Use custom .env file (specify with -CustomEnvFile)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Actions:" -ForegroundColor Cyan
    Write-Host "  up      - Start services (default)" -ForegroundColor Green
    Write-Host "  down    - Stop services" -ForegroundColor Green
    Write-Host "  restart - Restart services" -ForegroundColor Green
    Write-Host "  logs    - Show logs" -ForegroundColor Green
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\run-benchmark.ps1 -ResourceLevel low" -ForegroundColor White
    Write-Host "  .\run-benchmark.ps1 -ResourceLevel high -Detached" -ForegroundColor White
    Write-Host "  .\run-benchmark.ps1 -ResourceLevel medium -Action restart" -ForegroundColor White
    Write-Host "  .\run-benchmark.ps1 -ResourceLevel custom -CustomEnvFile .env.my-config" -ForegroundColor White
}

# Validate custom env file if specified
if ($ResourceLevel -eq "custom" -and $CustomEnvFile -eq "") {
    Write-Host "Error: Custom resource level requires -CustomEnvFile parameter" -ForegroundColor Red
    Show-Usage
    exit 1
}

# Set environment file based on resource level
$envFile = switch ($ResourceLevel) {
    "low" { ".env.low-resources" }
    "medium" { ".env.medium-resources" }
    "high" { ".env.high-resources" }
    "default" { ".env" }
    "custom" { $CustomEnvFile }
}

# Check if environment file exists
if (-not (Test-Path $envFile)) {
    Write-Host "Error: Environment file '$envFile' not found" -ForegroundColor Red
    exit 1
}

Write-Host "Using resource configuration: $ResourceLevel" -ForegroundColor Green
Write-Host "Environment file: $envFile" -ForegroundColor Cyan

# Build docker-compose command
$composeCmd = "docker-compose --env-file $envFile"

switch ($Action) {
    "up" {
        if ($Detached) {
            $composeCmd += " up -d"
        } else {
            $composeCmd += " up"
        }
        if ($Services) {
            $composeCmd += " $Services"
        }
    }
    "down" {
        $composeCmd += " down"
        if ($Services) {
            $composeCmd += " $Services"
        }
    }
    "restart" {
        $composeCmd += " restart"
        if ($Services) {
            $composeCmd += " $Services"
        }
    }
    "logs" {
        $composeCmd += " logs -f"
        if ($Services) {
            $composeCmd += " $Services"
        }
    }
}

Write-Host "Executing: $composeCmd" -ForegroundColor Yellow
Write-Host ""

# Execute the command
Invoke-Expression $composeCmd
