# 📊 Benchmark Results: Bun (Elysia) - Draft 2

## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS   | Error % | CPU Max | Mem Max |
| ----- | ---------------- | -------------- | ------------- | ------------- | ----- | ------- | ------- | ------- |
| 1     | 0.25 CPU / 128MB | 15,005         | 70.26 ms      | 181.65 ms     | 249.0 | 0%      | ~30%    | ~70.6MB |
| 2     | 0.5 CPU / 256MB  | 15,000         | 3.1 ms        | 5.76 ms       | 250.0 | 0%      | ~40%    | ~78.1MB |
| 3     | 0.75 CPU / 384MB | 15,005         | 3.06 ms       | 5.97 ms       | 250.0 | 0%      | ~35%    | ~70.4MB |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Successfully processed **15,005 requests** with **zero errors** after achieving full CRUD workflow completion.
- **Response time** averaged **70.26 ms**, with p95 latency reaching **181.65 ms**.
- Achieved **peak RPS** of **249**, maintaining ideal load conditions.
- CPU usage peaked around **30%**, and **memory** reached **~70.6MB** well within the 128MB cap.
- All checks passed; though latency bottlenecks were evident under minimal resource constraints.

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Handled **15,000 requests** successfully with **0% error rate**.
- **Response time** improved dramatically to **3.1 ms**, with p95 latency dropping to **5.76 ms**.
- Achieved **peak RPS** of **250**, maintaining ideal load conditions.
- CPU usage peaked around **40%**, and **memory** stayed efficient at **~78.1MB**.
- Significant performance improvement with doubled resources, showing excellent scalability.

### ✅ Round 3 (High Resource: 0.75 CPU / 384MB)

- Successfully processed **15,005 requests** with **0% error rate**.
- **Response time** maintained ultra-low **3.06 ms**, with p95 latency at **5.97 ms**.
- Achieved **peak RPS** of **250**, maximizing ideal load conditions.
- CPU usage maxed out at **~35%**, showing efficient utilization under load.
- **Memory usage** stabilized at **~70.4MB** well within the 384MB limit.
- This round confirms **excellent stability** and **efficiency** with responsive handling and no stability issues.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana      | K6           | Resources usage |
| ------ | ------------ | ------------ | --------------- |
| 1      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 2      | [Screenshot] | [Screenshot] | [Screenshot]    |
| 3      | [Screenshot] | [Screenshot] | [Screenshot]    |

---

## 📋 Final Assessment

**Final Assessment**: Bun-Elysia shows excellent performance with dramatic improvement from Round 1 (70ms) to Rounds 2-3 (sub-4ms response times). Maintains consistent 250 RPS with zero errors across all rounds and efficient resource usage. Ideal for high-throughput applications, performing exceptionally well with adequate resources while remaining stable under constraints.
