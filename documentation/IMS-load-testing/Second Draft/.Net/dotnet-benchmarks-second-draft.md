# 📊 Benchmark Results: .NET API - Second Draft

## 🧪 Consolidated Performance Table

| Round | CPU / RAM      | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS     | Error % | CPU Max  | Mem Max   |
|-------|----------------|---------------|--------------|--------------|--------------|---------|---------|----------|-----------|
| 1     | 1 CPU / 1GB    | 29,720        | 19.18 ms     | 77.86 ms     | 1.25 s       | 495.25  | 0%      | ~62%     | ~95.3MB   |
| 2     | 2 CPU / 2GB    | 29,880        | 6.7 ms       | 6.74 ms      | 933 ms       | 497.93  | 0%      | ~156%    | ~96.9MB   |
| 3     | 4 CPU / 4GB    | 29,920        | 5.54 ms      | 7.69 ms      | 856 ms       | 498.57  | 0%      | ~160%    | ~98.7MB   |

---

## 🧠 Observations & Notes

### ✅ Round 1 (1 CPU / 1GB)
- CPU usage peaked at **~62%**; memory maxed at **~95.3MB** out of 1GB.
- Served **29,720 requests** with **zero errors**.
- **Avg response time**: **19.18 ms**, **p95**: **77.86 ms**, **max**: **1.25 s**.
- **Network I/O**: ~22.9MB received, ~61.7MB sent.
- **Disk I/O**: 0B read / 0B written.

### ✅ Round 2 (2 CPU / 2GB)
- CPU usage peaked at **~156%**; memory maxed at **~96.9MB** out of 2GB.
- **29,880 requests** handled, **0 errors**.
- **Avg response time**: **6.7 ms**, **p95**: **6.74 ms**, **max**: **933 ms**.
- **Network I/O**: ~22.9MB received, ~52MB sent.
- **Disk I/O**: 0B read / 0B written.

### ✅ Round 3 (4 CPU / 4GB)
- CPU usage peaked at **~160%**; memory maxed at **~98.7MB** out of 4GB.
- **29,920 requests** served, **0 errors**.
- **Avg response time**: **5.54 ms**, **p95**: **7.69 ms**, **max**: **856 ms**.
- **Network I/O**: ~22.9MB received, ~49.3MB sent.
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

.NET API delivers **excellent throughput** and stable performance as resources are increased:

- **Scaling up to 2 CPUs/2GB brings significant latency improvement** (p95 and average response times drop dramatically), but adding more resources (4 CPUs/4GB) shows **diminishing returns** for this lightweight workload.
- **CPU usage increases** as more cores are available, showing multi-threading is engaged, but memory stays below 100MB at all times.
- **No errors or failed requests across all rounds.**
- **Latency (p95/max) is higher than Node/Bun for minimal CRUD, but throughput remains competitive and error-free.**
- For this kind of workload, .NET’s multi-threaded model helps after 1 CPU, but ultra-light async servers can still edge it out in raw low-latency.

---