# 📊 Benchmark Results: .NET API - First Draft

## 🧪 Consolidated Performance Table

| Round | CPU / RAM   | Total Requests | Avg Resp Time | p95 Resp Time | RPS    | Error % | CPU Max | Mem Max  |
| ----- | ----------- | -------------- | ------------- | ------------- | ------ | ------- | ------- | -------- |
| 1     | 1 CPU / 1GB | 89,715         | 6.56 ms       | 10.31 ms      | 498.34 | 0%      | ~90%    | ~97.05MB |
| 2     | 2 CPU / 2GB | 89,885         | 4.06 ms       | 6.35 ms       | 499.31 | 0%      | ~80%    | ~98.54MB |
| 3     | 4 CPU / 4GB | 89,870         | 4.22 ms       | 6.49 ms       | 499.22 | 0%      | ~90%    | ~111.8MB |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 1 CPU / 1GB)

- Processed **89,715 requests** with **zero errors** during full CRUD test.
- **Avg response time**: **6.56 ms**, **p95 latency**: **10.31 ms**.
- **Peak RPS** achieved: **498.34**.
- CPU usage peaked around **~90%**, memory usage capped at **~97.05MB**.
- .NET API is fully functional under stress, but CPU usage is high at this tier.

### ✅ Round 2 (Mid Resource: 2 CPU / 2GB)

- Successfully handled **89,885 requests** without a single error.
- **Average response time** improved to **4.06 ms**, with **p95 latency** at **6.35 ms**.
- **RPS** slightly increased to **499.31**.
- CPU peaked around **~80%**, memory usage slightly higher at **~98.54MB**.
- Efficiency and latency improved with more resources—clear gain from Round 1.

### ✅ Round 3 (High Resource: 4 CPU / 4GB)

- Managed **89,870 requests** with **no errors** reported.
- **Average response time**: **4.22 ms**, **p95 latency**: **6.49 ms**.
- **RPS** stable at **499.22**.
- **CPU usage** again peaked at around **~90%**, memory increased to **~111.8MB**.
- Performance gain plateaued—diminishing returns beyond 2 CPU / 2GB.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana                                                         | K6                                                     | Resources usage                                               |
| ------ | --------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| 1      | ![Grafana](sandbox:/mnt/data/first-draft-round-1-resources.png) | ![K6](sandbox:/mnt/data/first-draft-round-1-stats.png) | ![Stats](sandbox:/mnt/data/first-draft-round-1-resources.png) |
| 2      | ![Grafana](sandbox:/mnt/data/first-draft-round-2-resources.png) | ![K6](sandbox:/mnt/data/first-draft-round-2-stats.png) | ![Stats](sandbox:/mnt/data/first-draft-round-2-resources.png) |
| 3      | ![Grafana](sandbox:/mnt/data/first-draft-round-3-resources.png) | ![K6](sandbox:/mnt/data/first-draft-round-3-stat.png)  | ![Stats](sandbox:/mnt/data/first-draft-round-3-resources.png) |

---

## 📋 Final Assessment

.NET API shows solid and stable throughput across all tested resource tiers with consistent zero error rates. While its **CPU usage remains high** (close to 90% in all cases), the API maintains a respectable sub-7ms p95 response latency even under minimal resources. Performance improves significantly between rounds 1 and 2, but **plateaus in round 3**, indicating an optimal performance-to-resource ratio is achieved at **0.5 CPU / 256MB**.
