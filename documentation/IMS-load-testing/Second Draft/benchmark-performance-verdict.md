# ⚖️ Performance Verdict – Fastify vs. Bun (Elysia) vs. .NET (Second Draft)

## 📊 Executive Summary

This benchmark compares Node Fastify, Bun Elysia, and .NET across three resource levels under identical load tests for high-concurrency, lightweight CRUD workloads.

---

## 🚀 Peak Throughput (Requests Per Second)

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict      |
|---------------|-------------|-------------|-------------|--------------|
| Bun Elysia    | 499.95      | 499.83      | 499.95      | ✅ Maxed out  |
| Node Fastify  | 499.94      | 499.95      | 499.95      | ✅ Maxed out  |
| .NET          | 495.25      | 497.93      | 498.57      | ⚠️ Slightly under | 

➡️ **Fastify and Bun Elysia consistently reached max RPS**, while .NET was close, but a few RPS short at every tier.

---

## ⏱️ Average Response Time

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict        |
|---------------|-------------|-------------|-------------|----------------|
| Bun Elysia    | 2.85 ms     | 2.45 ms     | 2.76 ms     | ✅ Ultra-fast   |
| Node Fastify  | 2.55 ms     | 2.61 ms     | 3.51 ms     | ✅ Ultra-fast   |
| .NET          | 19.18 ms    | 6.7 ms      | 5.54 ms     | ⚠️ Higher latency |

➡️ Fastify and Bun Elysia maintained sub-4ms latency, while .NET only approached those latencies with higher CPU allocation.

---

## 💾 Memory Usage

| Server        | 1 CPU / 1GB | 2 CPU / 2GB | 4 CPU / 4GB | Verdict        |
|---------------|-------------|-------------|-------------|----------------|
| Bun Elysia    | ~62.1MB     | ~55.0MB     | ~62.6MB     | ✅ Efficient    |
| Node Fastify  | ~45.1MB     | ~44.7MB     | ~47.8MB     | ✅ Most efficient |
| .NET          | ~95.3MB     | ~96.9MB     | ~98.7MB     | ⚠️ Heaviest     |

➡️ Node Fastify used the least memory, followed by Bun Elysia. .NET consistently used about double.

---

## 🧮 Resource Efficiency Summary

| Metric        | Winner(s)         | .NET Standing        |
|---------------|-------------------|----------------------|
| Peak RPS      | Fastify, Bun      | Slightly under       |
| Avg Latency   | Fastify, Bun      | Higher latency       |
| Memory Usage  | Fastify           | Heaviest             |
| CPU Usage     | Node < Bun < .NET | Highest (multi-core) |

---

## 🧾 Final Verdict

✅ **Fastify** and **Bun Elysia** deliver:
- **Maximum RPS** at all resource levels
- **Ultra-low latency** (sub-4ms)
- **Minimal memory footprint**

⚠️ **.NET** is highly stable, handles all requests with zero errors, and gets close to peak RPS, but:
- **Latency is notably higher at low resources**, only improving with more CPUs
- **Uses significantly more memory**
- **Uses far more CPU** as it scales up

---

## 🔍 Recommendation

- For **performance-first microservices**, **Fastify** or **Bun Elysia** are top picks.
- For teams invested in the **.NET ecosystem**, it remains a solid, stable option — especially if raw speed isn't the highest priority.
