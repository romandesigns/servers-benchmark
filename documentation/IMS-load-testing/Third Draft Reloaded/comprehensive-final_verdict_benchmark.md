# ⚖️ Performance Verdict – Bun Hono vs. Bun Elysia vs. Fastify vs. .NET (2500 RPS Stress Test)

## 📊 Executive Summary
Under identical 3-minute, constant-arrival 2,500 RPS tests on lightweight CRUD:
- **.NET** and **Bun Elysia** sustained the highest effective throughput (Elysia ~2.8k RPS; .NET a true 2.5k RPS) with **low error rates (0%)**.
- **Bun Hono** delivered **ultra-low latency** and the **smallest RAM footprint**, but overall **throughput plateaued ~0.8–1.0k RPS** in these runs.
- **Node Fastify** held **~1.95–2.0k RPS** with small RAM, but exhibited **~1.5s average latency** and frequent high tail spikes.

---

## 🚀 Peak Throughput (Requests Per Second)

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict             |
|---------------|-------------|-------------|-------------|---------------------|
| Bun Hono      | 1,041       |   788       |   793       | ⚠️ Throughput-limited |
| Bun Elysia    | 2,799       | 2,787       | 2,823       | ✅ Highest sustained  |
| Node Fastify  | 1,949       | 1,950       | 1,998       | ⚠️ Bottlenecked       |
| .NET          | 2,500       | 2,500       | 2,500       | ✅ Maxed out          |

➡️ **Winners for throughput:** **Bun Elysia** (~2.8k RPS) and **.NET** (true 2.5k RPS).  

---

## ⏱️ Average Response Time

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict         |
|---------------|-------------|-------------|-------------|-----------------|
| Bun Hono      | 21.5 ms     | 11.8 ms     | 10.3 ms     | ✅ Ultra-fast    |
| Bun Elysia    | ~996 ms     | ~991 ms     | ~1.02 s     | 🟨 Moderate      |
| Node Fastify  | 1.51 s      | 1.50 s      | 1.47 s      | 🟥 High latency  |
| .NET          | 13.15 ms    | 13.19 ms    | 13.20 ms    | ✅ Low latency   |

➡️ **Latency champions:** **Bun Hono** (fastest) and **.NET** (consistently low).  

---

## 💾 Memory Usage

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict            |
|---------------|-------------|-------------|-------------|--------------------|
| Bun Hono      | ~50.7 MB    | ~55.4 MB    | ~52.7 MB    | ✅ Most efficient   |
| Bun Elysia    | ~73.7 MB    | ~70.8 MB    | ~77.3 MB    | ✅ Efficient        |
| Node Fastify  | ~49.4 MB    | ~50.3 MB    | ~54.5 MB    | ✅ Efficient        |
| .NET          | ~165 MB     | ~165 MB     | ~165 MB     | ❌ Heaviest         |

➡️ **RAM efficiency winner:** **Bun Hono** (all rounds <60 MB).

---

## 🧮 Resource Efficiency Summary

| Metric       | Winner(s)              | Node Fastify Standing | .NET Standing        |
|--------------|------------------------|------------------------|----------------------|
| Peak RPS     | Bun Elysia, .NET       | Bottlenecked           | ✅ Maxed out         |
| Avg Latency  | Bun Hono, .NET         | ❌ High                 | ✅ Low               |
| Memory Use   | Bun Hono               | ✅ Efficient            | ❌ Heaviest          |
| CPU Pattern  | Hono (low headroom use)| Maxed ~100–120%        | Efficient multi-core |

---

## 🧾 Final Verdict

**Choose based on your priority:**

- ✅ **Raw throughput with simplicity:** **Bun Elysia** – ~2.8k RPS, low memory, ~1s avg latency (watch p95 ~2–2.5s).  
- ✅ **Balanced enterprise profile:** **.NET** – true 2.5k RPS with **~13 ms** avg latency and strong multi-core scaling; heavier RAM.  
- ✅ **Lowest latency & lightest RAM:** **Bun Hono** – **10–22 ms** avg latency and **<60 MB** RAM, but **throughput was limited** (~0.8–1.0k RPS) in these runs—likely test/workload constraints rather than framework limits; worth retesting.  
- ⚠️ **Node Fastify:** stable and memory-efficient but **~1.5 s** average latency and **<2k RPS** under this load; would require clustering/architectural changes to approach the top performers.

---

### TL;DR
- **Throughput crown:** **Bun Elysia** (≈2.8k) & **.NET** (2.5k).  
- **Latency crown:** **Bun Hono** (≈10–22 ms) & **.NET** (≈13 ms).  
- **Memory crown:** **Bun Hono**.  
- **Overall pick for high-traffic CRUD with strict latency SLOs:** **.NET** (predictable, multi-core) or **Bun Hono** (if throughput limits can be lifted in your setup).  
- **Overall pick for maximum single-node throughput per RAM:** **Bun Elysia**.  
