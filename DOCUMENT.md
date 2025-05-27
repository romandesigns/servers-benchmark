## 2. Test Environment

All servers are containerized and run in isolated Docker environments to ensure consistent and controlled testing conditions. The monitoring stack includes tools for live metrics tracking, logging, and visualization.

### ✅ Tech Stack

- **Database**: PostgreSQL 16 (Docker)
- **Testing Tool**: K6 (JavaScript-based load testing)
- **Monitoring Stack**:
  - **Prometheus**: collects performance metrics
  - **cAdvisor**: gathers container-level CPU & memory usage
  - **Node Exporter**: collects host system metrics
  - **Grafana**: used to visualize collected metrics
  - **Portainer**: used to manage containers and inspect live CPU/memory stats

### 📦 Docker Services

Key containers and their roles:
- `psql-database`: shared PostgreSQL instance for all tests
- `node-express`, `node-fastify`, `bun-elysia`, `bun-hono`: the backend servers under test
- `prometheus`, `cadvisor`, `node-exporter`: performance monitoring
- `grafana`: dashboard UI for Prometheus metrics
- `portainer`: GUI for container management and metric inspection

### 🧪 Resource Allocation per Round

Each server undergoes 3 rounds of stress testing under different container resource constraints:

| Round | CPU Limit | Memory Limit |
|-------|-----------|--------------|
| 1     | 0.25 CPU  | 128MB        |
| 2     | 0.5 CPU   | 256MB        |
| 3     | 1 CPU     | 384MB        |

> CPU and memory limits are declared in the `docker-compose.yml` using `cpus` and `mem_limit` for each container. Metrics are collected in real-time using Prometheus and visualized via Grafana and Portainer.

### 🔗 Docker Network

All services are connected to a shared bridge network: `db-network`, ensuring seamless inter-container communication and metric discovery.


## 📊 Benchmark Results: Node.js (Express)

### 🧪 Round 1 — 0.25 CPU, 128MB RAM

- **Total requests**: _(from K6)_
- **Average response time**: 
- **p95 response time**:
- **Requests per second (RPS)**:
- **Error rate**:
- **CPU usage** (via Prometheus/Portainer):
- **Memory usage** (via Prometheus/Portainer):

#### 📌 Observations:
- _e.g. "Latency spiked after ~400 VUs", or "Consistent under load, but memory maxed at 124MB"_

---

### 🧪 Round 2 — 0.5 CPU, 256MB RAM

- **Total requests**:
- **Average response time**:
- **p95 response time**:
- **Requests per second (RPS)**:
- **Error rate**:
- **CPU usage**:
- **Memory usage**:

#### 📌 Observations:
- _e.g. "Improved response stability, p95 under 100ms"_

---

### 🧪 Round 3 — 1 CPU, 384MB RAM

- **Total requests**:
- **Average response time**:
- **p95 response time**:
- **Requests per second (RPS)**:
- **Error rate**:
- **CPU usage**:
- **Memory usage**:

## 🔬 Benchmarking Strategy

Each backend server is subjected to an identical load test using K6, designed to simulate real-world CRUD operations under increasing traffic.

### 📋 Test Script Overview

The K6 test script performs the following flow per virtual user (VU):

1. **Create Task** (`POST /create-task`)
2. **Read Task** (`GET /:id/get-task`)
3. **Update Task** (`PATCH /:id/update-task`)
4. **Re-read Task** to validate updates (`GET /:id/get-task`)
5. **Delete Task** (`DELETE /:id/delete-task`)

Each operation is grouped and tagged to track metrics in Prometheus (e.g., `operation: "create"`), and randomized `sleep()` calls simulate variable user behavior.

### 📈 Traffic Pattern (Stages)

```js
stages: [
  { duration: "10s", target: 10 },
  { duration: "20s", target: 50 },
  { duration: "20s", target: 150 },
  { duration: "10s", target: 40 },
  { duration: "5s", target: 0 },
]

### Stage	Description
    1.Ramp up to 10 VUs (light load warm-up)
    2.Ramp up to 50 VUs (stable test baseline)
    3.Spike to 150 VUs (stress condition)
    4.Drop to 40 VUs (recovery test)
    5.Cooldown to 0 (end of test)

#### 📌 Observations:
- _e.g. "Peaked at 600 RPS with no errors, CPU consistently ~85%"_

---


## 🧠 Summary: Node.js (Express)

| Round | Avg Response Time | p95 | RPS | Error % | CPU Max | Memory Max |
|-------|--------------------|-----|-----|---------|---------|-------------|
| 1     |                    |     |     |         |         |             |
| 2     |                    |     |     |         |         |             |
| 3     |                    |     |     |         |         |             |

#### ✅ Takeaway:
_Use this space to write your conclusion for Express: ideal for X, struggles with Y, shines under Z conditions._
