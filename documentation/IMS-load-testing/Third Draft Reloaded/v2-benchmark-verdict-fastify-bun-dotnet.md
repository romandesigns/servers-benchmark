
# ⚖️ Performance Verdict – Bun Hono vs. Bun Elysia vs. Fastify vs. .NET (2500 RPS Stress Test)

## 📊 Executive Summary

This benchmark compares Bun Hono, Bun Elysia, Node Fastify, and .NET across three resource levels under identical load tests for high-concurrency, lightweight CRUD workloads.

---

## 🚀 Peak Throughput (Requests Per Second)

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict         |
|---------------|-------------|-------------|-------------|------------------|
| Bun Hono      | 2,500       | 2,500       | 2,500       | ✅ Maxed out      |
| Bun Elysia    | 2,500       | 2,500       | 2,500       | ✅ Maxed out      |
| Node Fastify  | 1,949       | 1,950       | 1,998       | ⚠️ Bottlenecked   |
| .NET          | 2,500       | 2,500       | 2,500       | ✅ Maxed out      |

➡️ **Bun Hono, Bun Elysia, and .NET** all reached the target 2,500 RPS. **Node Fastify** was CPU-bound and capped just below 2,000 RPS.

---

## ⏱️ Average Response Time

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict        |
|---------------|-------------|-------------|-------------|----------------|
| Bun Hono      | ~1.51 ms    | ~1.50 ms    | ~1.47 ms    | ✅ Ultra-fast   |
| Bun Elysia    | ~2–3 ms     | ~2–3 ms     | ~2–3 ms     | ✅ Ultra-fast   |
| Node Fastify  | 1.51 s      | 1.50 s      | 1.47 s      | ⚠️ High latency |
| .NET          | ~13.15 ms   | ~13.19 ms   | ~13.20 ms   | ✅ Low latency  |

➡️ Bun Hono was the fastest by a slight margin, followed by Bun Elysia and .NET. Node Fastify suffered from high response times.

---

## 💾 Memory Usage

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict        |
|---------------|-------------|-------------|-------------|----------------|
| Bun Hono      | ~49 MB      | ~50 MB      | ~54 MB      | ✅ Most efficient |
| Bun Elysia    | ~62 MB      | ~55 MB      | ~62 MB      | ✅ Efficient    |
| Node Fastify  | ~49 MB      | ~50 MB      | ~54 MB      | ✅ Efficient    |
| .NET          | ~165 MB     | ~165 MB     | ~165 MB     | ❌ Heaviest     |

➡️ Bun Hono had the lowest memory usage across all tiers.

---

## 🧮 Resource Efficiency Summary

| Metric        | Winner(s)            | Node Fastify Standing | .NET Standing        |
|---------------|----------------------|------------------------|----------------------|
| Peak RPS      | Bun Hono, Bun, .NET  | Bottlenecked           | ✅ Maxed out         |
| Avg Latency   | Bun Hono             | ❌ High latency         | ✅ Low latency       |
| Memory Usage  | Bun Hono             | Efficient              | ❌ Heaviest          |
| CPU Usage     | Bun Hono < .NET < Node | Maxed out early      | High (multi-core)   |

---

## 🧾 Final Verdict

✅ **Bun Hono**:
- Max throughput at all tiers
- Lowest latency of all servers
- Most efficient memory usage

✅ **Bun Elysia**:
- Max throughput at all tiers
- Sub-3 ms latency
- Very low memory usage

✅ **.NET**:
- Max throughput at all tiers
- Low latency (~13 ms)
- Scales well with more cores

⚠️ **Node Fastify**:
- CPU-bound just under 2,000 RPS
- High latency (~1.5 s)
- Memory usage is efficient but not scalable without clustering

---

## 🚦 API Server Comparison (1 CPU / 1GB)

| Server        | Peak RPS     | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|--------------|----------------|--------|---------|----------|
| Bun Hono      | 🟩 2,500      | 🟩 1.51 ms     | 0%     | ~83%    | ~49 MB   |
| Bun Elysia    | 🟩 2,500      | 🟩 ~2–3 ms     | 0%     | ~23%    | ~62 MB   |
| Node Fastify  | 🟨 1,949      | 🟥 1.51 s      | 0%     | ~100%   | ~49 MB   |
| .NET          | 🟩 2,500      | 🟩 13.15 ms    | 0%     | ~95%    | ~165 MB  |

---

## 🚦 API Server Comparison (2 CPU / 2GB)

| Server        | Peak RPS     | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|--------------|----------------|--------|---------|----------|
| Bun Hono      | 🟩 2,500      | 🟩 1.50 ms     | 0%     | ~90%    | ~50 MB   |
| Bun Elysia    | 🟩 2,500      | 🟩 ~2–3 ms     | 0%     | ~27%    | ~55 MB   |
| Node Fastify  | 🟨 1,950      | 🟥 1.50 s      | 0%     | ~100%   | ~50 MB   |
| .NET          | 🟩 2,500      | 🟩 13.19 ms    | 0%     | ~90%    | ~165 MB  |

---

## 🚦 API Server Comparison (4 CPU / 4GB)

| Server        | Peak RPS     | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|--------------|----------------|--------|---------|----------|
| Bun Hono      | 🟩 2,500      | 🟩 1.47 ms     | 0%     | ~89%    | ~54 MB   |
| Bun Elysia    | 🟩 2,500      | 🟩 ~2–3 ms     | 0%     | ~27%    | ~62 MB   |
| Node Fastify  | 🟨 1,998      | 🟥 1.47 s      | 0%     | ~100%   | ~54 MB   |
| .NET          | 🟩 2,500      | 🟩 13.20 ms    | 0%     | ~85%    | ~165 MB  |

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
**Bun Hono** leads in raw performance, delivering maximum throughput, ultra-low latency, and the smallest memory footprint.  
**Bun Elysia** matches throughput and offers solid latency with minimal resource use.  
**.NET** is consistently strong in throughput and latency but heavier on memory.  
**Node Fastify**, while stable, is capped just under 2,000 RPS and struggles with latency under load.

