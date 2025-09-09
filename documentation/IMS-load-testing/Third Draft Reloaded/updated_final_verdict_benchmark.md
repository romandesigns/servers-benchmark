# ⚖️ Performance Verdict – Bun Hono vs. Bun Elysia vs. Fastify vs. .NET (2500 RPS Stress Test)

## 📊 Executive Summary

This benchmark compares Bun Hono, Bun Elysia, Node Fastify, and .NET across three resource levels under identical load tests for high-concurrency, lightweight CRUD workloads.

---

## 🚀 Peak Throughput (Requests Per Second)

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict             |
|---------------|-------------|-------------|-------------|---------------------|
| Bun Hono      | 1,041       |   788       |   793       | ⚠️ Throughput-limited |
| Bun Elysia    | 2,799       | 2,787       | 2,823       | ✅ Highest sustained  |
| Node Fastify  | 1,949       | 1,950       | 1,998       | ⚠️ Bottlenecked       |
| .NET          | 2,500       | 2,500       | 2,500       | ✅ Maxed out          |

➡️ **Bun Elysia and .NET** achieved target or better throughput. **Bun Hono** plateaued at ~1k RPS, and **Node Fastify** capped just under 2k RPS.

---

## ⏱️ Average Response Time

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict         |
|---------------|-------------|-------------|-------------|-----------------|
| Bun Hono      | 21.5 ms     | 11.8 ms     | 10.3 ms     | ✅ Ultra-fast    |
| Bun Elysia    | ~996 ms     | ~991 ms     | ~1.02 s     | 🟨 Moderate      |
| Node Fastify  | 1.51 s      | 1.50 s      | 1.47 s      | 🟥 High latency  |
| .NET          | ~13.15 ms   | ~13.19 ms   | ~13.20 ms   | ✅ Low latency   |

➡️ **Bun Hono and .NET** led on latency. Bun Elysia sustained higher throughput but with ~1s average latency. Fastify struggled with ~1.5s average latency.

---

## 💾 Memory Usage

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict           |
|---------------|-------------|-------------|-------------|-------------------|
| Bun Hono      | ~50.7 MB    | ~55.4 MB    | ~52.7 MB    | ✅ Most efficient  |
| Bun Elysia    | ~73.7 MB    | ~70.8 MB    | ~77.3 MB    | ✅ Efficient       |
| Node Fastify  | ~49.4 MB    | ~50.3 MB    | ~54.5 MB    | ✅ Efficient       |
| .NET          | ~165 MB     | ~165 MB     | ~165 MB     | ❌ Heaviest        |

➡️ **Bun Hono** was the most memory-efficient; **.NET** was significantly heavier.

---

## 🧮 Resource Efficiency Summary

| Metric       | Winner(s)            | Node Fastify Standing | .NET Standing        |
|--------------|----------------------|------------------------|----------------------|
| Peak RPS     | Bun Elysia, .NET     | Bottlenecked           | ✅ Maxed out         |
| Avg Latency  | Bun Hono, .NET       | ❌ High latency         | ✅ Low latency       |
| Memory Use   | Bun Hono             | ✅ Efficient            | ❌ Heaviest          |
| CPU Usage    | Hono (low usage)     | Maxed ~100–120%        | Efficient multi-core |

---

## 🧾 Final Verdict

✅ **Bun Hono**:  
- Lowest latency of all servers (~10–22 ms)  
- Most efficient memory usage (<60 MB)  
- Throughput plateaued around ~1k RPS (likely environment/test limits)  

✅ **Bun Elysia**:  
- Highest sustained throughput (~2.8k RPS)  
- Avg latency ~1s, with p95 ~2–2.5s  
- Lightweight memory profile (<80 MB)  

✅ **.NET**:  
- True 2,500 RPS across all tiers  
- Low latency (~13 ms avg)  
- Strong multi-core scaling, heavier memory (~165 MB)  

⚠️ **Node Fastify**:  
- Stable but capped just under 2k RPS  
- High latency (~1.5s avg)  
- Efficient memory, but not competitive on throughput/latency  

---

## 🚦 API Server Comparison (1 CPU / 1GB)

| Server        | Peak RPS | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|----------|---------------|---------|---------|----------|
| Bun Hono      | 🟨 1,041 | 🟩 21.5 ms     | 0%      | ~40%    | ~51 MB   |
| Bun Elysia    | 🟩 2,799 | 🟨 ~996 ms     | 0%      | ~100%   | ~74 MB   |
| Node Fastify  | 🟨 1,949 | 🟥 1.51 s      | 0%      | ~100%   | ~49 MB   |
| .NET          | 🟩 2,500 | 🟩 13.15 ms    | 0%      | ~95%    | ~165 MB  |

---

## 🚦 API Server Comparison (2 CPU / 2GB)

| Server        | Peak RPS | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|----------|---------------|---------|---------|----------|
| Bun Hono      | 🟨   788 | 🟩 11.8 ms     | 0%      | ~35%    | ~55 MB   |
| Bun Elysia    | 🟩 2,787 | 🟨 ~991 ms     | 0%      | ~120%   | ~71 MB   |
| Node Fastify  | 🟨 1,950 | 🟥 1.50 s      | 0%      | ~120%   | ~50 MB   |
| .NET          | 🟩 2,500 | 🟩 13.19 ms    | 0%      | ~90%    | ~165 MB  |

---

## 🚦 API Server Comparison (4 CPU / 4GB)

| Server        | Peak RPS | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|----------|---------------|---------|---------|----------|
| Bun Hono      | 🟨   793 | 🟩 10.3 ms     | 0%      | ~35%    | ~53 MB   |
| Bun Elysia    | 🟩 2,823 | 🟨 ~1.02 s     | 0%      | ~110%   | ~77 MB   |
| Node Fastify  | 🟨 1,998 | 🟥 1.47 s      | 0%      | ~120%   | ~55 MB   |
| .NET          | 🟩 2,500 | 🟩 13.20 ms    | 0%      | ~85%    | ~165 MB  |

---

**Legend:**  
- 🟩 = Excellent  
- 🟨 = Good  
- 🟥 = Poor  
- ⬜ = Below others  

- **Peak RPS**: Higher is better (max 2,500)  
- **Avg Resp Time**: Lower is better  

---

### **Summary:**  
- **Bun Hono**: Best latency + memory efficiency, but throughput capped ~1k RPS in this test.  
- **Bun Elysia**: Top throughput (~2.8k RPS) with modest latency trade-off (~1s avg).  
- **.NET**: Balanced, predictable, scales across cores, low latency, but heavier on memory.  
- **Node Fastify**: Memory-efficient, stable, but high latency and capped throughput under load.  
