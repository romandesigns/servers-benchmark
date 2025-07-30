@echo off
REM Quick benchmark runner batch file
REM Usage: run-benchmark.bat [low|medium|high|default]

set RESOURCE_LEVEL=%1

if "%RESOURCE_LEVEL%"=="" (
    echo Usage: run-benchmark.bat [low^|medium^|high^|default]
    echo.
    echo Resource Levels:
    echo   low     - 1GB RAM, 1.0 CPU per service
    echo   medium  - 2GB RAM, 2.0 CPU per service  
    echo   high    - 4GB RAM, 4.0 CPU per service
    echo   default - 384MB RAM, 0.75 CPU per service
    exit /b 1
)

if "%RESOURCE_LEVEL%"=="low" set ENV_FILE=.env.low-resources
if "%RESOURCE_LEVEL%"=="medium" set ENV_FILE=.env.medium-resources
if "%RESOURCE_LEVEL%"=="high" set ENV_FILE=.env.high-resources
if "%RESOURCE_LEVEL%"=="default" set ENV_FILE=.env

if not exist "%ENV_FILE%" (
    echo Error: Environment file '%ENV_FILE%' not found
    exit /b 1
)

echo Using resource configuration: %RESOURCE_LEVEL%
echo Environment file: %ENV_FILE%
echo.

docker-compose --env-file %ENV_FILE% up -d
