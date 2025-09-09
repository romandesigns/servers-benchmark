# 📊 Benchmark Results: Bun Hono – 2500 RPS Stress Test

## 🧪 Consolidated Performance Table

| Round | CPU / RAM   | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS     | Error % | CPU Max | Mem Max  |
|-------|-------------|---------------|---------------|---------------|---------------|---------|---------|---------|----------|
| 1     | 1 CPU / 1GB | 195,080       | 21.5 ms       | 14.19 ms      | 24.74 ms      | 1,041/s | 0%      | ~40%    | ~50.7MB  |
| 2     | 2 CPU / 2GB | 150,025       | 11.8 ms       | 11.84 ms      | 26 ms         |   788/s | 0%      | ~30%    | ~55.4MB  |
| 3     | 4 CPU / 4GB | 150,270       | 10.4 ms       | 10.69 ms      | 23.9 ms       |   792/s | 0%      | ~35%    | ~52.0MB  |

---

## 🧠 Observations & Notes

### ⚠ Round 1 (1 CPU / 1GB)
- CPU usage peaked at **~40%**; memory maxed at **~50.7 MB**.
- Sustained **~1,041 RPS**, lower than the 2,500 target.
- Latencies: **Avg**: 21.5 ms, **p95**: 14.19 ms, **Max**: 24.74 ms.
- Network I/O: ~129 MB received, ~62 MB sent.

### ⚠ Round 2 (2 CPU / 2GB)
- CPU usage peaked at **~30%**, memory at **~55.4 MB**.
- Throughput dropped to **~788 RPS**, suggesting early bottleneck.
- Latencies: **Avg**: 11.8 ms, **p95**: 11.84 ms, **Max**: 26 ms.
- No errors observed.

### ⚠ Round 3 (4 CPU / 4GB)
- CPU usage at **~35%**, memory at **~52 MB**.
- Sustained **~792 RPS**, still capped below expected RPS.
- Latency improved slightly: **Avg**: 10.4 ms, **p95**: 10.69 ms, **Max**: 23.9 ms.
- No failed requests.

---

## 🔧 Supporting Assets

| ROUNDS | K6 Stats      |
|--------|---------------|
| 1      | ![K6](sandbox:/mnt/data/d822f96f-b9f7-4b02-934d-c3eea9b742a1.png) |
| 2      | ![K6](sandbox:/mnt/data/86e74e55-4a11-41a6-94b4-ae0709610613.png) |
| 3      | ![K6](sandbox:/mnt/data/0bfeb47a-710e-46fc-a789-cfab728da42f.png) |

---

## 📋 Final Assessment

This Bun Hono stress test reveals:

- **Throughput capped at ~800–1,000 RPS**, far below the 2,500 RPS target despite increased resources.
- **CPU remained underutilized (~30–40%)**, suggesting a **single-thread bottleneck** or I/O constraint.
- **Memory usage stayed minimal (<60MB)** across all rounds, indicating efficient footprint.
- **No errors or dropped requests**, but **latency was higher than Bun Elysia and Fastify** in earlier tests.

---

## 📦 Load Test Breakdown

### **K6 Scenario Configuration**
```javascript
export const options = {
  scenarios: {
    consistent_requests: {
      executor: "constant-arrival-rate",
      rate: 2500,            // 2,500 iterations per second
      timeUnit: "1s",        // → true 2,500 RPS
      duration: "3m",
      preAllocatedVUs: 2000, // warm pool so ramp-up doesn't stall
      maxVUs: 3000,          // enough headroom for slow tiers
      gracefulStop: "0s",
    },
  },
  thresholds: {
    checks: ["rate==1.0"], // pass/fail condition
  },
  discardResponseBodies: true,
  insecureSkipTLSVerify: true,
};
```

### **Execution Details**
- **Target RPS:** 2,500 (true rate due to `timeUnit: "1s"`).
- **Duration:** 3 minutes per round.
- **Total Iterations per Round:** ~150k–195k requests.
- **VUs Provisioned:** 2,000 pre-allocated, max 3,000.
- **Avg Latency Observed:** 10–21 ms depending on resources.
- **System Under Test:** Bun Hono CRUD API (single-threaded).
- **Test Environment:** Dockerized container with varying CPU/RAM limits per round.

---

**Conclusion:** Bun Hono handled the load **without errors** but failed to scale with added resources. Throughput was bottlenecked far below the 2,500 RPS target, pointing to architectural limitations under high concurrency workloads.
