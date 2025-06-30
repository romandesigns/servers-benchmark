# 📊 Benchmark Results: Bun (Hono) - Draft 2

## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS   | Error % | CPU Max | Mem Max |
| ----- | ---------------- | -------------- | ------------- | ------------- | ----- | ------- | ------- | ------- |
| 1     | 0.25 CPU / 128MB | 15,005         | 12.33 ms      | 75.37 ms      | 250.0 | 0%      | ~30%    | ~46.5MB |
| 2     | 0.5 CPU / 256MB  | 14,960         | 3.75 ms       | 7.76 ms       | 249.0 | 0%      | ~50%    | ~74.6MB |
| 3     | 0.75 CPU / 384MB | 15,000         | 3.88 ms       | 7.79 ms       | 250.0 | 0%      | ~45%    | ~78.9MB |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Successfully processed **15,005 requests** with **zero errors** after achieving full CRUD workflow completion.
- **Response time** averaged **12.33 ms**, with p95 latency reaching **75.37 ms**.
- Achieved **peak RPS** of **250**, maintaining ideal load conditions.
- CPU usage peaked around **30%**, and **memory** reached **~46.5MB** well within the 128MB cap.
- All checks passed; showed good performance under minimal resource constraints with moderate latency.

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Handled **14,960 requests** successfully with **0% error rate**.
- **Response time** improved significantly to **3.75 ms**, with p95 latency dropping to **7.76 ms**.
- Achieved **peak RPS** of **249**, maintaining near-ideal load conditions.
- CPU usage peaked around **50%**, and **memory** stayed efficient at **~74.6MB**.
- Excellent performance improvement with doubled resources, demonstrating strong scalability.

### ✅ Round 3 (High Resource: 0.75 CPU / 384MB)

- Successfully processed **15,000 requests** with **0% error rate**.
- **Response time** maintained low **3.88 ms**, with p95 latency at **7.79 ms**.
- Achieved **peak RPS** of **250**, maximizing ideal load conditions.
- CPU usage peaked at **~45%**, showing efficient utilization under load.
- **Memory usage** stabilized at **~78.9MB** well within the 384MB limit.
- This round confirms **excellent stability** and **efficiency** with consistent sub-4ms response times.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana      | K6           | Resources usage |
| ------ | ------------ | ------------ | --------------- |
| 1      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 2      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 3      | [Screenshot] | [Screenshot] | [Screenshot]    |

---

## 📋 Final Assessment

**Final Assessment**: Bun-Hono delivers excellent performance with notable improvement from Round 1 (12ms) to Rounds 2-3 (sub-4ms response times). Maintains consistent ~250 RPS with zero errors across all rounds and very efficient memory usage. Shows strong scalability and stability, making it ideal for high-throughput applications with excellent resource efficiency.
