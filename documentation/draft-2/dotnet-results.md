# 📊 Benchmark Results: .NET API - Draft 2

## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS   | Error % | CPU Max | Mem Max   |
| ----- | ---------------- | -------------- | ------------- | ------------- | ----- | ------- | ------- | --------- |
| 1     | 0.25 CPU / 128MB | 8,645          | 1.89 s        | 3.18 s        | 133.6 | 0%      | ~6%     | ~109.6MB  |
| 2     | 0.5 CPU / 256MB  | 14,740         | 31.09 ms      | 99.06 ms      | 245.5 | 0%      | ~20%    | ~107.4MB  |
| 3     | 0.75 CPU / 384MB | 14,800         | 14.74 ms      | 32.57 ms      | 246.6 | 0%      | ~20%    | ~106.2MB  |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Processed **8,645 requests** with **zero errors** after full CRUD workflow.
- **Average response time** was **1.89 s**, with p95 latency at **3.18 s**.
- Achieved **peak RPS** of **133.6**.
- CPU usage peaked at **~6%**, memory at **~109.6MB** (close to the 128MB cap).
- All checks passed, but high latency and lower throughput under minimal resources.

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Handled **14,740 requests** with **0% error rate**.
- **Average response time** improved to **31.09 ms**, p95 latency at **99.06 ms**.
- Achieved **peak RPS** of **245.5**.
- CPU usage peaked at **~20%**, memory at **~107.4MB**.
- Significant performance boost and scalability with increased resources.

### ✅ Round 3 (High Resource: 0.75 CPU / 384MB)

- Processed **14,800 requests** with **0% error rate**.
- **Average response time** dropped to **14.74 ms**, p95 latency at **32.57 ms**.
- Achieved **peak RPS** of **246.6**.
- CPU usage peaked at **~20%**, memory at **~106.2MB**.
- Excellent stability and efficiency, with low latency and high throughput.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana      | K6           | Resources usage |
| ------ | ------------ | ------------ | --------------- |
| 1      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 2      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 3      | [Screenshot] | [Screenshot] | [Screenshot]    |

---

## 📋 Final Assessment

**Final Assessment**: .NET API scales well and uses resources efficiently. Performance improves as resources increase, reaching fast response times (under 15ms) and 246 RPS with no errors at higher allocations. It is reliable for high-throughput workloads when given enough resources.
