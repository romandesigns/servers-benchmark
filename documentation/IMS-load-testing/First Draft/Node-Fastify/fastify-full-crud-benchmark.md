
# 🚀 Node Fastify Benchmark – Full CRUD Operations

This benchmark focuses on Fastify’s performance across three scaling configurations. Each round tests full CRUD operations with increasing CPU and memory resources to simulate scalable production-like environments.

---

## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS | Error % | CPU Max | Mem Max |
| ----- | ---------------- | -------------- | ------------- | ------------- | --- | ------- | ------- | ------- |
| 1     | 0.25 CPU / 128MB | 90,000         | 2.87 ms       | 4.86 ms       | 500 | 0%      | ~27%    | ~48MB   |
| 2     | 0.5 CPU / 256MB  | 90,005         | 2.88 ms       | 5.09 ms       | 500 | 0%      | ~50%    | ~49MB   |
| 3     | 1 CPU / 384MB    | 90,000         | 2.95 ms       | 5.30 ms       | 500 | 0%      | ~47%    | ~51MB   |

---

## 📉 Response Time Breakdown

| Round | Min | Max     | p90    | p95    | Median |
| ----- | --- | ------- | ------ | ------ | ------ |
| 1     | 0ms | 82.41ms | 4.44ms | 4.86ms | 2.93ms |
| 2     | 0ms | 65.34ms | 4.40ms | 5.09ms | 2.86ms |
| 3     | 0ms | 98.66ms | 4.49ms | 5.30ms | 2.86ms |

---

## ⚙️ Execution Metrics

| Round | Iteration Duration (avg) | p95     | VUs (max) | Iterations |
| ----- | ------------------------ | ------- | --------- | ---------- |
| 1     | 16.69ms                  | 29.64ms | 100       | 18,000     |
| 2     | 21.89ms                  | 35.93ms | 100       | 18,001     |
| 3     | 22.02ms                  | 37.00ms | 100       | 18,000     |

---

## 🌐 Network I/O

| Round | Data Received | Data Sent |
| ----- | ------------- | --------- |
| 1     | 34 MB         | 15 MB     |
| 2     | 34 MB         | 15 MB     |
| 3     | 34 MB         | 15 MB     |

---

## 📸 Resource Usage Snapshots

### Round 1 – 0.25 CPU / 128MB
![Round 1 Resources](./first-draft-round-1-resources.png)
![Round 1 Stats](./first-draft-round-1-stats.png)

---

### Round 2 – 0.5 CPU / 256MB
![Round 2 Resources](./first-draft-round-2-resources.png)
![Round 2 Stats](./first-draft-round-2-stats.png)

---

### Round 3 – 1 CPU / 384MB
![Round 3 Resources](./first-draft-round-3-resources.png)
![Round 3 Stats](./first-draft-round-3-stats.png)

---

## ✅ Summary

Fastify remained remarkably consistent across all resource levels. The performance gain from 0.25 to 0.5 CPU was minimal, suggesting Fastify is already well-optimized at minimal allocations. Even under 1 full CPU, memory stayed under 60MB and CPU below 50%.

