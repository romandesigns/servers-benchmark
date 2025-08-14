# ⚖️ Performance Verdict – Fastify vs. Bun (Elysia) vs. .NET (2500 RPS Stress Test)

## 📊 Executive Summary

This benchmark compares Node Fastify, Bun Elysia, and .NET across three resource levels under identical load tests for high-concurrency, lightweight CRUD workloads.

---

## 🚀 Peak Throughput (Requests Per Second)

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict      |
|---------------|-------------|-------------|-------------|--------------|
| Bun Elysia    | 2,500       | 2,500       | 2,500       | ✅ Maxed out  |
| Node Fastify  | 1,819       | 1,819       | 1,819       | ⚠️ Bottlenecked |
| .NET          | 2,500       | 2,500       | 2,500       | ✅ Maxed out  |

➡️ **.NET and Bun Elysia** both hit the target 2,500 RPS. **Node Fastify** was CPU-bound and capped at ~1,819 RPS in all tiers.

---

## ⏱️ Average Response Time

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict        |
|---------------|-------------|-------------|-------------|----------------|
| Bun Elysia    | ~2–3 ms     | ~2–3 ms     | ~2–3 ms     | ✅ Ultra-fast   |
| Node Fastify  | 1.55 s      | 1.55 s      | 1.55 s      | ⚠️ High latency |
| .NET          | 13.15 ms    | 13.19 ms    | 13.20 ms    | ✅ Low latency  |

➡️ Bun Elysia maintained sub-3 ms latency, .NET stayed low (~13 ms) even at peak load, while Node Fastify queued requests heavily at ~1.55 s latency.

---

## 💾 Memory Usage

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict        |
|---------------|-------------|-------------|-------------|----------------|
| Bun Elysia    | ~62 MB      | ~55 MB      | ~62 MB      | ✅ Efficient    |
| Node Fastify  | ~129 MB     | ~129 MB     | ~129 MB     | ⚠️ Higher usage |
| .NET          | ~165 MB     | ~165 MB     | ~165 MB     | ⚠️ Heaviest     |

➡️ Bun Elysia had the smallest memory footprint, .NET the largest, with Node Fastify in between.

---

## 🧮 Resource Efficiency Summary

| Metric        | Winner(s)       | Node Fastify Standing | .NET Standing        |
|---------------|-----------------|-----------------------|----------------------|
| Peak RPS      | Bun, .NET       | Bottlenecked          | ✅ Maxed out          |
| Avg Latency   | Bun              | ❌ High latency       | ✅ Low latency        |
| Memory Usage  | Bun              | Medium                | ❌ Heaviest           |
| CPU Usage     | Bun < Node < .NET| High (single-core)    | Highest (multi-core) |

---

## 🧾 Final Verdict

✅ **Bun Elysia**:
- Max throughput at all tiers
- Ultra-low latency
- Smallest memory footprint

✅ **.NET**:
- Max throughput at all tiers
- Low latency
- Scales well with cores

⚠️ **Node Fastify**:
- CPU-bound at ~1,819 RPS due to single-threaded nature
- High latency under load
- Needs Node Cluster to leverage multiple cores

---

## 🚦 API Server Comparison (1 CPU / 1GB)

| Server        | Peak RPS     | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|--------------|---------------|---------|---------|----------|
| Bun Elysia    | 🟩 2,500     | 🟩 ~2–3 ms    | 0%      | ~23%    | ~62 MB   |
| Node Fastify  | 🟨 1,819     | 🟥 1.55 s     | 0%      | ~100%   | ~129 MB  |
| .NET          | 🟩 2,500     | 🟩 13.15 ms   | 0%      | ~95%    | ~165 MB  |

---

## 🚦 API Server Comparison (2 CPU / 2GB)

| Server        | Peak RPS     | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|--------------|---------------|---------|---------|----------|
| Bun Elysia    | 🟩 2,500     | 🟩 ~2–3 ms    | 0%      | ~27%    | ~55 MB   |
| Node Fastify  | 🟨 1,819     | 🟥 1.55 s     | 0%      | ~100%   | ~129 MB  |
| .NET          | 🟩 2,500     | 🟩 13.19 ms   | 0%      | ~90%    | ~165 MB  |

---

## 🚦 API Server Comparison (4 CPU / 4GB)

| Server        | Peak RPS     | Avg Resp Time | Error % | CPU Max | Mem Max  |
|---------------|--------------|---------------|---------|---------|----------|
| Bun Elysia    | 🟩 2,500     | 🟩 ~2–3 ms    | 0%      | ~27%    | ~62 MB   |
| Node Fastify  | 🟨 1,819     | 🟥 1.55 s     | 0%      | ~100%   | ~129 MB  |
| .NET          | 🟩 2,500     | 🟩 13.20 ms   | 0%      | ~85%    | ~165 MB  |

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
**Bun Elysia** and **.NET** both deliver *maximum throughput* and *low latency* at every resource tier, with no errors. Bun Elysia also offers the smallest memory footprint.  
**Node Fastify** achieves good stability but is capped at ~1,819 RPS with high latency due to its single-threaded model. For lightweight async CRUD workloads, Bun Elysia and .NET clearly provide better scaling under sustained load.
