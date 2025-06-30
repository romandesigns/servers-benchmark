# 📊 Benchmark Results: Node Express API - Draft 2

## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS    | Error % | CPU Max | Mem Max   |
|-------|------------------|---------------|--------------|--------------|--------|---------|---------|-----------|
| 1     | 0.25 CPU / 128MB | 5,419         | 3.98 s       | 12.04 s      | 60.2   | 0%      | ~26%    | ~60.6MB   |
| 2     | 0.5 CPU / 256MB  | 12,164        | 706 ms       | 2.39 s       | 135.1  | 0%      | ~45%    | ~124.1MB  |
| 3     | 0.75 CPU / 384MB | 14,435        | 160 ms       | 960 ms       | 217.3  | 0%      | ~71%    | ~66.6MB   |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Processed **5,419 requests** with **zero errors** after full CRUD workflow.
- **Average response time** was **3.98 s**, with p95 latency at **12.04 s**.
- Achieved **peak RPS** of **60.2**.
- CPU usage peaked at **~26%**, memory at **~60.6MB**.
- High latency and low throughput under minimal resources.

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Handled **12,164 requests** with **0% error rate**.
- **Average response time** improved to **706 ms**, p95 latency at **2.39 s**.
- Achieved **peak RPS** of **135.1**.
- CPU usage peaked at **~45%**, memory at **~124.1MB**.
- Noticeable performance boost with more resources.

### ✅ Round 3 (High Resource: 0.75 CPU / 384MB)

- Processed **14,435 requests** with **0% error rate**.
- **Average response time** dropped to **160 ms**, p95 latency at **960 ms**.
- Achieved **peak RPS** of **217.3**.
- CPU usage peaked at **~71%**, memory at **~66.6MB**.
- Stable and efficient at higher allocations, with much lower latency.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana      | K6           | Resources usage |
| ------ | ------------ | ------------ | --------------- |
| 1      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 2      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 3      | [Screenshot] | [Screenshot] | [Screenshot]    |

---

## 📋 Final Assessment

Node Express performance improves as resources increase, with response times dropping from seconds to under 1 second and RPS rising to 217. The API remains stable and error-free, but needs more resources for high throughput and low latency.
