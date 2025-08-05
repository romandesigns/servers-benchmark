
# ⚖️ Performance Verdict – Fastify vs. Bun (Elysia) vs. .NET

## 📊 Executive Summary

This benchmark compares Node Fastify, Bun Elysia, and .NET across three resource levels under identical load tests.

---

## 🚀 Peak Throughput (Requests Per Second)

| Server       | Peak RPS       | Verdict         |
|--------------|----------------|-----------------|
| Node Fastify | 500.0          | ✅ Maxed out    |
| Bun Elysia   | 499.99         | ✅ Maxed out    |
| .NET         | ~246–249       | ⚠️ Bottlenecked |

➡️ **Fastify and Bun Elysia both reached max RPS**, while .NET peaked at roughly half that throughput.

---

## ⏱️ Average Response Time

| Server       | Avg Response Time | Verdict        |
|--------------|-------------------|----------------|
| Node Fastify | ~2.9 ms           | ✅ Ultra-fast   |
| Bun Elysia   | ~2.8 ms           | ✅ Ultra-fast   |
| .NET         | ~13–15 ms         | ⚠️ Significantly slower |

➡️ Fastify and Bun Elysia maintained sub-3ms latency, while .NET’s average was 4–5x higher.

---

## 💾 Memory Usage

| Server       | Max Memory Usage | Verdict        |
|--------------|------------------|----------------|
| Node Fastify | ~48–51MB         | ✅ Very low     |
| Bun Elysia   | ~60–65MB         | ✅ Efficient    |
| .NET         | ~108–110MB       | ⚠️ Heaviest     |

➡️ Fastify used the least memory, followed closely by Bun Elysia. .NET used over twice as much.

---

## 🧮 Resource Efficiency Summary

| Metric        | Winner(s)         | .NET Standing        |
|---------------|-------------------|----------------------|
| Peak RPS      | Fastify, Bun      | Behind               |
| Avg Latency   | Fastify, Bun      | Slower               |
| Memory Usage  | Fastify           | Heaviest             |
| CPU Usage     | Similar (~25–50%) | Comparable           |

---

## 🧾 Final Verdict

✅ **Fastify** and **Bun Elysia** are currently the most efficient options, delivering:
- **Maximum RPS**
- **Sub-3ms latency**
- **Minimal memory footprint**

⚠️ **.NET** demonstrated consistent and stable performance with zero errors, but:
- Its **throughput is roughly half**
- Its **latency is significantly higher**
- It **requires more memory**

---

## 🔍 Recommendation

- For **performance-first microservices**, **Fastify** or **Bun Elysia** are top picks.
- For teams invested in the **.NET ecosystem**, it remains a solid, stable option — especially if raw speed isn't the highest priority.

