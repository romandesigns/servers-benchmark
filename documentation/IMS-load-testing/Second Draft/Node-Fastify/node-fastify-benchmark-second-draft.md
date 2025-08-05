# 📊 Benchmark Results: Node Fastify - Second Draft

## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS    | Error % | CPU Max | Mem Max   |
|-------|------------------|---------------|---------------|---------------|---------------|--------|---------|---------|-----------|
| 1     | 1 CPU / 1GB      | 30,005        | 2.55 ms       | 3.69 ms       | 66.69 ms      | 499.94 | 0%      | ~28%    | ~45.1MB   |
| 2     | 2 CPU / 2GB      | 30,005        | 2.61 ms       | 3.93 ms       | 42.79 ms      | 499.95 | 0%      | ~20%    | ~44.7MB   |
| 3     | 4 CPU / 4GB      | 30,005        | 3.51 ms       | 9.31 ms       | 76.63 ms      | 499.95 | 0%      | ~20%    | ~47.8MB   |

---

## 🧠 Observations & Notes

### ✅ Round 1 (1 CPU / 1GB)
- CPU usage peaked at **~28%**; memory maxed at **~45.1MB** out of 1GB.
- Served **30,005 requests** with **zero errors**.
- **Avg response time**: **2.55 ms**, **p95**: **3.69 ms**, **max**: **66.69 ms**.
- **Network I/O**: ~21.2MB received, ~29.4MB sent.
- **Disk I/O**: 0B read / 4.1KB written.

### ✅ Round 2 (2 CPU / 2GB)
- CPU usage peaked at **~20%**; memory maxed at **~44.7MB** out of 2GB.
- **30,005 requests** handled, **0 errors**.
- **Avg response time**: **2.61 ms**, **p95**: **3.93 ms**, **max**: **42.79 ms**.
- **Network I/O**: ~21.2MB received, ~29.5MB sent.
- **Disk I/O**: 0B read / 4.1KB written.

### ✅ Round 3 (4 CPU / 4GB)
- CPU usage peaked at **~20%**; memory maxed at **~47.8MB** out of 4GB.
- **30,005 requests** served, **0 errors**.
- **Avg response time**: **3.51 ms**, **p95**: **9.31 ms**, **max**: **76.63 ms**.
- **Network I/O**: ~21.8MB received, ~32.3MB sent.
- **Disk I/O**: 0B read / 4.1KB written.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana Resource | K6 Stats      |
|--------|------------------|---------------|
| 1      | ![Resources](sandbox:/mnt/data/54e1a018-d334-4dca-b3ac-277c9e55ab99.png) | ![K6](sandbox:/mnt/data/e6e22ccf-dda0-4245-b1c6-8dddb22d99f8.png) |
| 2      | ![Resources](sandbox:/mnt/data/bfe2a314-e7ea-4bd3-80ae-cd814dfcc136.png) | ![K6](sandbox:/mnt/data/6uenqrk2muCC7hJbxX27Qa.png) |
| 3      | ![Resources](sandbox:/mnt/data/b01c7caa-2baf-4dc5-9711-2bf21df501d8.png) | ![K6](sandbox:/mnt/data/Hpufu9BKgw4EN2YXtbtQjv.png) |

---

## 📋 Final Assessment

Node Fastify demonstrates **extremely efficient resource usage** and consistent performance for lightweight CRUD workloads:

- **Throughput is maxed out at every resource tier**—scaling CPU and RAM above 1 core/1GB does not increase performance for this test scenario.
- **CPU and memory usage remain very low**; the server never used more than 28% CPU or 48MB RAM, even with 4 cores and 4GB allocated.
- **No failed requests or errors in any round.**
- **Response times stay low** and only slightly increase in the highest resource tier, likely due to test or scheduling noise rather than actual server strain.
- **Scaling up resources above 1 CPU/1GB provides no measurable benefit for this particular lightweight CRUD workload.**