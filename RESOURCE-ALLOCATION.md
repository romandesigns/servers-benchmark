# Dynamic Resource Allocation for Server Benchmarks

This update allows to run tests without having to update the allocated resources manually

## Files Overview

- `.env` - Default resource configuration (384MB RAM, 0.75 CPU)
- `.env.low-resources` - Low resource configuration (1GB RAM, 1.0 CPU)
- `.env.medium-resources` - Medium resource configuration (2GB RAM, 2.0 CPU)
- `.env.high-resources` - High resource configuration (4GB RAM, 4.0 CPU)
- `run-benchmark.ps1` - PowerShell script for easy benchmark execution
- `run-benchmark.bat` - Batch file for quick execution

## Quick Start

### Using the PowerShell Script (Recommended)

```powershell
# Run with low resources
.\run-benchmark.ps1 -ResourceLevel low

# Run with high resources in detached mode
.\run-benchmark.ps1 -ResourceLevel high -Detached

# Restart services with medium resources
.\run-benchmark.ps1 -ResourceLevel medium -Action restart

# Stop all services
.\run-benchmark.ps1 -ResourceLevel default -Action down
```

### Using the Batch File

```cmd
# Run with different resource levels
run-benchmark.bat low
run-benchmark.bat medium
run-benchmark.bat high
run-benchmark.bat default
```

### Manual Docker Compose Usage

```bash
# Use specific environment file
docker-compose --env-file .env.low-resources up -d
docker-compose --env-file .env.medium-resources up -d
docker-compose --env-file .env.high-resources up -d

# Stop services
docker-compose --env-file .env.low-resources down
```

## Resource Configurations

| Level   | Memory | CPU  | Use Case                        |
| ------- | ------ | ---- | ------------------------------- |
| Low     | 1GB    | 1.0  | Baseline testing                |
| Default | 384MB  | 0.75 | Legacy/minimal resource testing |
| Medium  | 2GB    | 2.0  | Moderate load testing           |
| High    | 4GB    | 4.0  | High-performance testing        |

## Creating Custom Configurations

1. Copy an existing `.env.*` file:

   ```powershell
   Copy-Item .env.medium-resources .env.custom
   ```

2. Edit the values in `.env.custom`:

   ```bash
   DOTNET_MEM_LIMIT=3g
   BUN_ELYSIA_MEM_LIMIT=3g
   # ... modify other values as needed
   ```

3. Use your custom configuration:
   ```powershell
   .\run-benchmark.ps1 -ResourceLevel custom -CustomEnvFile .env.custom
   ```

## Environment Variables

### Memory Limits

- `DOTNET_MEM_LIMIT` - .NET API memory limit
- `BUN_ELYSIA_MEM_LIMIT` - Bun Elysia server memory limit
- `BUN_HONO_MEM_LIMIT` - Bun Hono server memory limit
- `NODE_EXPRESS_MEM_LIMIT` - Node.js Express server memory limit
- `NODE_FASTIFY_MEM_LIMIT` - Node.js Fastify server memory limit

### CPU Limits

- `DOTNET_CPU_LIMIT` - .NET API CPU limit
- `BUN_ELYSIA_CPU_LIMIT` - Bun Elysia server CPU limit
- `BUN_HONO_CPU_LIMIT` - Bun Hono server CPU limit
- `NODE_EXPRESS_CPU_LIMIT` - Node.js Express server CPU limit
- `NODE_FASTIFY_CPU_LIMIT` - Node.js Fastify server CPU limit

### Memory Format

- Use format like: `1g`, `2g`, `4g`, `512m`

### CPU Format

- Use decimal values: `1.0`, `2.0`, `4.0`, `0.75`
- Represents CPU cores (e.g., 1.0 = one CPU core, 4.0 = four CPU cores)

## Running Specific Services

Run only specific services for targeted testing:

```powershell
# Run only the benchmark servers (exclude monitoring)
.\run-benchmark.ps1 -ResourceLevel medium -Services "dotnet-api bun-elysia bun-hono node-express node-fastify psql-database"

# Run only Node.js servers
.\run-benchmark.ps1 -ResourceLevel high -Services "node-express node-fastify psql-database"
```

## Monitoring Resource Usage

The setup includes monitoring tools that will automatically track resource usage:

- **Grafana**: http://localhost:3001 - Visual dashboards
- **Prometheus**: http://localhost:9090 - Metrics collection
- **cAdvisor**: http://localhost:8081 - Container metrics
- **Portainer**: http://localhost:9001 - Container management

### Resource limits not applied

- Ensure you're using the correct environment file
- Check Docker supports resource limits on your system
- Verify environment variable syntax

### Performance issues

- Monitor actual resource usage vs. limits in Grafana
- Check host system has sufficient resources
- Consider adjusting limits based on host capacity
