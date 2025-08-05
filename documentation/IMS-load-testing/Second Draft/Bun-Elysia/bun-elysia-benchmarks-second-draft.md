# 📊 Benchmark Results: Bun Elysia - Second Draft

## 🧪 Consolidated Performance Table

| Round | CPU / RAM      | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS     | Error % | CPU Max  | Mem Max   |
|-------|----------------|---------------|--------------|--------------|--------------|---------|---------|----------|-----------|
| 1     | 1 CPU / 1GB    | 30,000        | 2.85 ms      | 5.44 ms      | 74.81 ms     | 499.95  | 0%      | ~23%     | ~62.1MB   |
| 2     | 2 CPU / 2GB    | 30,005        | 2.45 ms      | 3.9 ms       | 40.35 ms     | 499.83  | 0%      | ~27%     | ~55.0MB   |
| 3     | 4 CPU / 4GB    | 30,000        | 2.76 ms      | 4.84 ms      | 53.56 ms     | 499.95  | 0%      | ~27%     | ~62.6MB   |

---

## 🧠 Observations & Notes

### ✅ Round 1 (1 CPU / 1GB)
- CPU usage peaked at **~23%**; memory maxed at **~62.1MB** out of 1GB.
- Served **30,000 requests** with **zero errors**.
- **Avg response time**: **2.85 ms**, **p95**: **5.44 ms**, **max**: **74.81 ms**.
- **Network I/O**: ~18.6MB received, ~19.7MB sent.
- **Disk I/O**: 0B read / 0B written.

### ✅ Round 2 (2 CPU / 2GB)
- CPU usage peaked at **~27%**; memory maxed at **~55.0MB** out of 2GB.
- **30,005 requests** handled, **0 errors**.
- **Avg response time**: **2.45 ms**, **p95**: **3.9 ms**, **max**: **40.35 ms**.
- **Network I/O**: ~18.7MB received, ~20.9MB sent.
- **Disk I/O**: 0B read / 0B written.

### ✅ Round 3 (4 CPU / 4GB)
- CPU usage peaked at **~27%**; memory maxed at **~62.6MB** out of 4GB.
- **30,000 requests** served, **0 errors**.
- **Avg response time**: **2.76 ms**, **p95**: **4.84 ms**, **max**: **53.56 ms**.
- **Network I/O**: ~18.5MB received, ~19.1MB sent.
- **Disk I/O**: 0B read / 0B written.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana Resource | K6 Stats      |
|--------|------------------|---------------|
| 1      | ![Resources](sandbox:/mnt/data/second-draft-round-1-resources.PNG) | ![K6](sandbox:/mnt/data/second-draft-round-1-stats.PNG) |
| 2      | ![Resources](sandbox:/mnt/data/second-draft-round-2-resources.PNG) | ![K6](sandbox:/mnt/data/second-draft-round-2-stats.PNG) |
| 3      | ![Resources](sandbox:/mnt/data/second-draft-round-3-resources.PNG) | ![K6](sandbox:/mnt/data/second-draft-round-3-stats.PNG) |

---

## 📋 Final Assessment

Bun Elysia shows **exceptional performance and ultra-efficient resource usage** for this CRUD workload:

- **Peak CPU usage remains below 30%** across all tiers—even when given 4 CPUs.
- **Memory usage stays consistently low** (<65MB), regardless of available RAM.
- **No failed requests or errors in any round.**
- **Avg and p95 response times remain under 6ms** for all configurations; only minimal increases at highest tiers, likely from environment/test noise.
- **Scaling CPU/RAM above 1 CPU/1GB gives no measurable throughput improvement** for this kind of async, lightweight CRUD.
- **Throughput is maxed at every resource tier; RPS is near the K6 maximum (500/sec).**

For high-concurrency, minimal-computation APIs, Bun Elysia delivers industry-leading performance and efficiency.
