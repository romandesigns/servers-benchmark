## 2. Test Environment

All servers are containerized and run in isolated Docker environments to ensure consistent and controlled testing conditions. The monitoring stack includes tools for live metrics tracking, logging, and visualization.

### ✅ Tech Stack

- **Database**: PostgreSQL 16 (Docker)
- **Testing Tool**: K6 (JavaScript-based load testing)
- **Monitoring Stack**:
  - **Prometheus**: collects performance metrics
  - **cAdvisor**: gathers container-level CPU & memory usage
  - **Node Exporter**: collects host system metrics
  - **Grafana**: visualizes collected metrics
  - **Portainer**: manages containers and inspects live CPU/memory/network usage

### 📦 Docker Services

Key containers and their roles:

- `psql-database`: shared PostgreSQL instance for all tests
- `node-express`, `node-fastify`, `bun-elysia`, `bun-hono`: the backend servers under test
- `prometheus`, `cadvisor`, `node-exporter`: performance monitoring stack
- `grafana`: dashboard UI for metrics visualization
- `portainer`: GUI for container status and live stats

### 🧪 Resource Allocation per Round

Each server undergoes 3 rounds of stress testing under different container resource constraints:

| Round | CPU Limit | Memory Limit |
| ----- | --------- | ------------ |
| 1     | 0.25 CPU  | 128MB        |
| 2     | 0.5 CPU   | 256MB        |
| 3     | 1 CPU     | 384MB        |

> CPU and memory limits are declared in the `docker-compose.yml` using `cpus` and `mem_limit` for each container. Metrics are collected in real time using Prometheus and visualized via Grafana and Portainer.

### 🔗 Docker Network

All services run on a shared Docker bridge network called `db-network`, ensuring seamless inter-container communication and Prometheus discovery.

---

## 🔬 Benchmarking Strategy

Each backend server is subjected to an identical load test using K6, designed to simulate real-world full-cycle CRUD operations under a **consistent request rate** instead of fluctuating virtual user traffic.

### 📋 Test Script Overview

Each virtual user (VU) performs the following workflow in sequence:

1. **Create Task** → `POST /create-task`
2. **Read Task** → `GET /:id/get-task`
3. **Update Task** → `PATCH /:id/update-task`
4. **Re-read Task** → `GET /:id/get-task` (validation)
5. **Delete Task** → `DELETE /:id/delete-task`

- All requests are **tagged by operation** (e.g., `"create"`, `"read"`, etc.) for metric filtering in Prometheus.
- `sleep()` calls are removed to enforce a constant rate of incoming requests.
- This ensures uniform traffic conditions for every round of testing.

### 📈 Load Pattern (K6 Scenario)

```js
export const options = {
  scenarios: {
    consistent_requests: {
      executor: "constant-arrival-rate",
      rate: 50, // 💥 50 requests per second
      timeUnit: "1s", // Apply the rate every 1 second
      duration: "1m", // ⏱️ 1-minute test duration
      preAllocatedVUs: 50, // Start with 50 VUs
      maxVUs: 300, // Allow scaling up to 300 VUs if needed
    },
  },
  thresholds: {
    checks: [{ threshold: "rate==1.0" }],
  },
};
```

### ✅ Request Rate Behavior

- Simulates a **steady load of 50 RPS** (requests per second), independent of VU behavior.
- All benchmark rounds experience the **same traffic pressure**, with performance determined solely by available container resources.
- Ideal for comparing **throughput and latency** at various scaling tiers.

---

## 📊 Benchmark Results: Node.js (Express)

### 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS   | Error % | CPU Max | Mem Max |
| ----- | ---------------- | -------------- | ------------- | ------------- | ----- | ------- | ------- | ------- |
| 1     | 0.25 CPU / 128MB | 6,377          | 3.02 s        | 7.6 s         | 70.8  | 0%      | ~25%    | ~114MB  |
| 2     | 0.5 CPU / 256MB  | 11,434         | 961 ms        | 5.78 s        | 127.0 | 0%      | ~49%    | ~78MB   |
| 3     | 1 CPU / 384MB    | 15,000         | 20.92 ms      | 75.49 ms      | 250.0 | 0%      | ~68%    | ~75MB   |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Node.js Express handled **6,377 requests** with **0% errors**.
- **Avg response time**: 3.02s, **p95 latency** peaked at 7.6s.
- Reached ~35 RPS under heavy stress, with many dropped iterations.
- **CPU usage** peaked at ~25%, and **Memory** reached ~114MB (near its cap).
- This sets a **baseline for behavior under minimal resource allocation**.

---

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Processed **11,434 requests** — a ~79% improvement from Round 1.
- **Avg response time** dropped significantly to 961ms, **p95 latency** improved to 5.78s.
- Achieved ~127 RPS, nearly **doubling throughput**.
- **CPU usage** rose to ~49%, and **Memory** usage was steady around ~78MB.
- Demonstrated **good scalability** and better handling under load.

---

### ✅ Round 3 (High Resource: 1 CPU / 384MB)

- Fully processed **15,000 requests** with **zero failures**.
- **Avg response time** reduced dramatically to 20.92ms, **p95 latency** at 75ms.
- Reached a stable **250 RPS**, the **best throughput achieved**.
- **CPU usage** hit ~68%, **Memory** remained efficient at ~75MB.
- Node.js with Express **scaled efficiently**, exhibiting **low-latency performance at high concurrency**.

## ✅ Verdict: Node.js (Express)

Node.js with Express demonstrated **exceptional linear scalability** across all three resource tiers. As CPU and memory allocations increased, performance improved proportionally — both in terms of throughput and latency.

- At **minimal resources (0.25 CPU / 128MB)**, the server remained stable but experienced high latency and limited throughput, serving as a reliable baseline under tight constraints.
- At the **mid-tier (0.5 CPU / 256MB)**, Express **nearly doubled its throughput** and significantly reduced response time, confirming that it handles moderate scaling gracefully.
- At **full allocation (1 CPU / 384MB)**, Express **delivered excellent responsiveness (21ms avg)** and hit **250 RPS** with no errors, while maintaining low memory pressure and reasonable CPU utilization (~68%).

> **Final Assessment**: Node.js with Express is highly responsive and resource-efficient. It is a strong candidate for both constrained environments and high-concurrency production scenarios, especially where consistent performance and fast response times are required.

## 📊 Benchmark Results: Bun (Elysia)

### 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS   | Error % | CPU Max | Mem Max |
| ----- | ---------------- | -------------- | ------------- | ------------- | ----- | ------- | ------- | ------- |
| 1     | 0.25 CPU / 128MB | 15,005         | 23.74 ms      | 106.41 ms     | 248.9 | 0%      | ~27%    | ~60MB   |
| 2     | 0.5 CPU / 256MB  | 15,000         | 3.1 ms        | 6.82 ms       | 250.0 | 0%      | ~36%    | ~62MB   |
| 3     | 1 CPU / 384MB    | 18,316         | 2.92 ms       | 5.35 ms       | 249.9 | 0%      | ~38%    | ~63MB   |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Bun with Elysia successfully handled **15,005 requests** with **0% errors**.
- **Average response time** was **23.74ms**, and **p95 latency** came in at **106.41ms**.
- Maintained a consistent **~249 RPS**, efficiently using minimal resources.
- **CPU usage** peaked at ~27%, while **Memory** usage reached ~60MB out of the 128MB limit.
- Outstanding performance even under minimal allocation, indicating an extremely lightweight and optimized runtime.

---

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Successfully handled **15,000 requests** with **no errors or drops**.
- **Average response time** improved drastically to just 3.1ms, **p95 at only 6.82ms**.
- Continued to deliver **250 RPS**, showcasing consistent throughput scaling.
- **CPU usage** rose to ~36%, **Memory usage** hovered around ~62MB.
- The server clearly benefits from additional resources, maintaining ultra-low latency.

---

### ✅ Round 3 (High Resource: 1 CPU / 384MB)

- Processed **18,316 requests**, the **highest total** across all rounds.
- **Avg response time** lowered further to **2.92ms**, **p95** at **5.35ms**.
- **RPS** capped around 250/s with **0% error rate**.
- **CPU usage** peaked at ~38%, and **Memory** stayed efficient at ~63MB.
- Demonstrated outstanding scalability and minimal latency under full load.

---

## ✅ Verdict: Bun (Elysia)

> **Final Assessment**: Bun with Elysia demonstrated exceptional performance and stability across all rounds. It maintained ultra-low latency even under high concurrency and resource constraints, with minimal CPU and memory usage. This makes it an excellent choice for high-throughput applications where speed and efficiency are critical, particularly in cost-sensitive or resource-limited environments.

## 📊 Benchmark Results: Bun (Hono)

### 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS   | Error % | CPU Max | Mem Max |
| ----- | ---------------- | -------------- | ------------- | ------------- | ----- | ------- | ------- | ------- |
| 1     | 0.25 CPU / 128MB | 15,005         | 10.13 ms      | 54.54 ms      | 249.8 | 0%      | ~26%    | ~44.8MB |
| 2     | 0.5 CPU / 256MB  | 15,000         | 3.28 ms       | 7.18 ms       | 250.0 | 0%      | ~36%    | ~76MB   |
| 3     | 1 CPU / 384MB    | 15,005         | 3.11 ms       | 6.05 ms       | 250.0 | 0%      | ~37%    | ~72MB   |

---

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Bun Hono successfully handled **15,005 requests** with **0% error rate**.
- **Average response time** was **10.13 ms**, with a **p95 latency** of **54.54 ms**.
- Achieved a stable throughput of **~250 RPS**, fully saturating the request rate.
- **CPU usage** peaked around **26%**, and **Memory usage** was efficient at **~44.8MB**.
- This demonstrates excellent responsiveness and reliability even under constrained resources.

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Bun with Hono handled **15,000 requests** with **zero errors**.
- **Avg response time** was **3.28ms**, with a **p95 latency** of **7.18ms**.
- Maintained a **stable 250 RPS**, showing high throughput under moderate constraints.
- **CPU usage** peaked at **~36%**, and **memory usage** remained efficient at **~76MB**.
- Server scaled **gracefully**, sustaining high performance and responsiveness.

### ✅ Round 3 (High Resource: 1 CPU / 384MB)

- Successfully processed **15,005 requests** with **0% errors**.
- **Avg response time** was **3.11ms**, and **p95 latency** measured at **6.05ms**.
- Maintained a solid **250 RPS**, sustaining the maximum throughput tested.
- **CPU usage** peaked at ~37%, and **Memory usage** reached ~72MB — efficient under full load.
- Confirms optimal performance with minimal latency and stable scaling behavior.

> **Final Assessment**: Bun with Hono delivered exceptional performance across all resource tiers. Even at low resource allocation (0.25 CPU / 128MB), it maintained high throughput and low error rates. As resources increased, response times significantly improved while keeping CPU and memory usage efficient. With consistent 250 RPS throughput, sub-10ms latencies, and graceful scaling, Bun Hono proves to be an ideal choice for latency-sensitive, high-concurrency services where performance predictability is crucial.

## 📊 Benchmark Results: Node (Fastify)

### 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS | Error % | CPU Max | Mem Max |
| ----- | ---------------- | -------------- | ------------- | ------------- | --- | ------- | ------- | ------- |
| 1     | 0.25 CPU / 128MB | 15,005         | 9.69 ms       | 83.35 ms      | 250 | 0%      | ~24.5%  | 44.57MB |
| 2     | 0.5 CPU / 256MB  | 15,005         | 3.07 ms       | 5.24 ms       | 250 | 0%      | ~25%    | 43.75MB |
| 3     | 1 CPU / 384MB    | 15,005         | 3.29 ms       | 7.34 ms       | 250 | 0%      | ~25%    | 44.86MB |

---

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Node Fastify handled **15,005 requests** with **0% error rate**.
- **Average response time** was **9.69 ms**.
- **p95 latency** peaked at **83.35 ms**.
- Maintained a stable **~250 RPS** under constrained resources.
- **CPU usage** peaked at **~24.5%**, and **memory usage** stayed efficient at **~44.57MB**.
- Despite some tail latency spikes, it showed strong reliability.

---

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Successfully processed **15,005 requests** with **0% error rate**.
- **Avg response time** improved to **3.07 ms**.
- **p95 latency** dropped significantly to **5.24 ms**.
- Held a consistent **250 RPS**, demonstrating great scalability.
- **CPU usage** remained at **~25%**, and **memory usage** was minimal at **43.75MB**.
- Performance remained strong and consistent.

---

### ✅ Round 3 (High Resource: 1 CPU / 384MB)

- Fastify handled **15,005 requests** again with **zero failures**.
- **Average response time** was **3.29 ms**, and **p95 latency** at **7.34 ms**.
- Held the **target RPS of 250** with tight latency control.
- **CPU peaked at ~25%**, and **memory usage** was **44.86MB**.
- Continued to perform with consistent speed and resource efficiency.

---

> **Final Assessment**: Node.js with Fastify demonstrates remarkable consistency, excellent latency control, and solid throughput across all resource levels. It remains stable under load, scales gracefully, and offers low overhead — making it a great candidate for performance-critical applications in resource-constrained or production-grade environments.

## 📊 Benchmark Results: .NET API

### 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS   | Error % | CPU Max | Mem Max  |
| ----- | ---------------- | -------------- | ------------- | ------------- | ----- | ------- | ------- | -------- |
| 1     | 0.25 CPU / 128MB | 14,505         | 180.68 ms     | 623.54 ms     | 241.2 | 0%      | ~27%    | 109.3 MB |
| 2     | 0.5 CPU / 256MB  | 14,250         | 132.14 ms     | 634.24 ms     | 237.4 | 0%      | ~52%    | 102.6 MB |
| 3     | 1 CPU / 384MB    | 14,780         | 15.16 ms      | 14.17 ms      | 246.3 | 0%      | ~100%   | 100.4 MB |

---

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- The .NET server processed **14,505 requests** with **zero errors** after switching the update method to PUT.
- **Avg response time** was **180.68 ms**, with **p95 latency** reaching **623.54 ms**.
- Achieved a **peak throughput** of **51.2 RPS**.
- **CPU usage** peaked around **27%**, and **memory** reached **~109.3 MB** (close to the 128MB cap).
- All checks passed, though latency bottlenecks were evident under minimal resource constraints.

---

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Handled **14,250 requests** successfully with **0% error rate**.
- **Avg response time** improved to **132.14 ms**, but **p95 latency** remained high at **634.24 ms**.
- Sustained **~237 RPS** with **no failed checks**.
- **CPU usage** peaked at **~52%**, and memory stayed efficient at **102.6 MB**.
- While stability and correctness were solid, the server still struggled with response latency under moderate load.

---

### ✅ Round 3 (High Resource: 1 CPU / 384MB)

- Successfully processed **14,780 requests** with **0% error rate**.
- **Average response time** dramatically improved to **15.16 ms**, and **p95 latency** dropped to **14.17 ms**.
- **Peak RPS** was **50.8**, maintaining ideal load conditions.
- **CPU usage** maxed out at **~100%**, showing full utilization under load.
- **Memory usage** stabilized at **~100.4 MB**, well within the **384MB** limit.
- This round confirms **excellent scalability and efficiency**, with responsive handling and no stability issues.

> **Final Assessment**: .NET API showcases solid reliability, graceful scalability, and excellent responsiveness under high resource allocation. While it exhibits latency bottlenecks under tight constraints, it remains stable and accurate across all rounds. Once given adequate resources, it delivers fast, efficient, and consistent performance — making it a strong candidate for scalable backends in production-grade environments where correctness and stability are critical.

🧠 Overall Insights & Comparative Assessment
⚡ Throughput & Responsiveness
🏆 Top Performer (Raw Speed):
Bun (Elysia) and Bun (Hono) consistently deliver ultra-low average and p95 latencies across all rounds. They max out RPS (≈250) under all resource levels with sub-10ms response times in Round 3, making them ideal for high-throughput, low-latency use cases.

🎯 Solid Contender:
Node (Fastify) also maintains stable 250 RPS with low response times in all rounds — particularly impressive given its broader ecosystem and maturity. It's a great balance of speed and reliability with virtually no error rate or memory issues.

📈 Improved Under Load:
.NET API shows dramatic performance improvement by Round 3, with latency dropping from ~180ms to ~15ms. However, earlier rounds suffer from noticeable latency bottlenecks, suggesting it benefits greatly from sufficient CPU headroom.

🦥 Lagging Option (Under Constraint):
Node.js (Express) performed worst under constrained resources, with multi-second latencies and significantly lower throughput in Rounds 1 and 2. Only in Round 3 does it recover with sub-100ms latency — showing its resource-hungry nature.

### 🧮 Efficiency Scoreboard Table

| Server         | Speed 🏃 | Latency 📉 | RPS 🚀 | CPU Efficiency ⚙️ | Memory 💾 | Overall 🏆 |
| -------------- | -------- | ---------- | ------ | ----------------- | --------- | ---------- |
| **Bun Hono**   | 🟢       | 🟢         | 🟢     | 🟢                | 🟢        | 🟢 Winner  |
| **Bun Elysia** | 🟢       | 🟢         | 🟢     | 🟢                | 🟢        | 🟢 Winner  |
| **Fastify**    | 🟢       | 🟢         | 🟢     | 🟢                | 🟢        | 🟢 Winner  |
| **Express**    | 🔴       | 🔴         | 🟡     | 🔴                | 🟠        | 🟠         |
| **.NET**       | 🟡       | 🟠         | 🟢     | 🟡 (high CPU)     | 🟠        | 🟡         |
