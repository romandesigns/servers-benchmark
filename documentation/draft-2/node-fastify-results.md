# 📊 Benchmark Results: Node Fastify API - Draft 2

## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS    | Error % | CPU Max | Mem Max   |
|-------|------------------|---------------|--------------|--------------|--------|---------|---------|-----------|
| 1     | 0.25 CPU / 128MB | 14,950        | 13.39 ms     | 83.46 ms     | 249.2  | 0%      | ~6%     | ~49.9MB   |
| 2     | 0.5 CPU / 256MB  | 15,005        | 3.28 ms      | 5.24 ms      | 250.0  | 0%      | ~6%     | ~50.1MB   |
| 3     | 0.75 CPU / 384MB | 15,005        | 3.3 ms       | 5.4 ms       | 250.0  | 0%      | ~6%     | ~39.0MB   |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Processed **14,950 requests** with **zero errors** after full CRUD workflow.
- **Average response time** was **13.39 ms**, with p95 latency at **83.46 ms**.
- Achieved **peak RPS** of **249.2**.
- CPU usage peaked at **~6%**, memory at **~49.9MB**.
- Efficient and stable even at minimal resources.

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Handled **15,005 requests** with **0% error rate**.
- **Average response time** improved to **3.28 ms**, p95 latency at **5.24 ms**.
- Achieved **peak RPS** of **250.0**.
- CPU usage peaked at **~6%**, memory at **~50.1MB**.
- Excellent performance and low latency with more resources.

### ✅ Round 3 (High Resource: 0.75 CPU / 384MB)

- Processed **15,005 requests** with **0% error rate**.
- **Average response time** was **3.3 ms**, p95 latency at **5.4 ms**.
- Achieved **peak RPS** of **250.0**.
- CPU usage peaked at **~6%**, memory at **~39.0MB**.
- Maintains high throughput and very low latency.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana      | K6           | Resources usage |
| ------ | ------------ | ------------ | --------------- |
| 1      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 2      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 3      | [Screenshot] | [Screenshot] | [Screenshot]    |

---

## 📋 Final Assessment

Node Fastify delivers high throughput and very low latency across all resource levels, with stable performance and efficient resource usage. It remains error-free and consistent, making it well-suited for demanding, high-performance workloads.
