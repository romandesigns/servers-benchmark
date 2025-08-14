# 📊 Benchmark Results: Bun Elysia – 2500 RPS Stress Test

## 🧪 Consolidated Performance Table

| Round | CPU / RAM   | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS     | Error % | CPU Max | Mem Max  |
|-------|-------------|---------------|---------------|---------------|---------------|---------|---------|---------|----------|
| 1     | 1 CPU / 1GB | 520,710       | 995.67 ms     | 2.05 s        | 2.18 s        | 2,799/s | 0%      | ~100%   | ~73.7 MB |
| 2     | 2 CPU / 2GB | 514,600       | 991.11 ms     | 2.19 s        | 2.8 s         | 2,787/s | 0%      | ~120%   | ~70.8 MB |
| 3     | 4 CPU / 4GB | 524,935       | 1.02 s        | 2.56 s        | 3.33 s        | 2,823/s | 0%      | ~110%   | ~77.3 MB |

---

## 🧠 Observations & Notes

### ⚠ Round 1 (1 CPU / 1GB)
- CPU saturated at **~100%** during peak load.
- Memory usage peaked at **~73.7 MB**.
- Sustained **~2,799 RPS** for 3 minutes.
- Latencies: **Avg**: 995.67 ms, **p95**: 2.05 s, **Max**: 2.18 s.
- Network I/O: ~175 MB received, ~86 MB sent.

### ⚠ Round 2 (2 CPU / 2GB)
- CPU usage peaked at **~120%**, showing partial multi-core utilization.
- Memory usage stable at ~70.8 MB.
- Throughput: **~2,787 RPS**; latency profile nearly identical to Round 1.
- No failed requests.

### ⚠ Round 3 (4 CPU / 4GB)
- CPU usage peaked at **~110%**.
- Memory usage slightly higher at ~77.3 MB.
- Throughput: **~2,823 RPS**; minor latency increase in p95/max.
- No errors.

---

## 🔧 Supporting Assets

| ROUNDS | K6 Stats      |
|--------|---------------|
| 1      | ![K6](sandbox:/mnt/data/6a8cb2cf-dfff-4fa8-a242-73b6768f9baf.png) |
| 2      | ![K6](sandbox:/mnt/data/03d2d2b5-6621-4cc9-9a99-dee4678c2380.png) |
| 3      | ![K6](sandbox:/mnt/data/31870736-a1e8-4d4c-9bc4-f4031a6afacd.png) |

---

## 📋 Final Assessment

This test confirms:

- **Throughput ceiling:** Bun Elysia sustained ~2,800 RPS across all tiers, but did not fully utilize available multi-core resources.
- **CPU saturation:** Even with more cores, CPU utilization stayed ~100–120%, indicating single-threaded limits with some multi-core benefit.
- **Latency stability:** Average latencies hovered around ~1s, with p95 between 2–2.5s.
- **Memory efficiency:** Usage stayed below 80 MB in all rounds.

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
- **Duration:** 3 minutes.
- **Total Iterations per Round:** ~520k requests.
- **VUs Provisioned:** 2,000 pre-allocated, max 3,000.
- **Avg Latency Observed:** ~1s.
- **System Under Test:** Bun Elysia CRUD API.
- **Test Environment:** Dockerized container with varying CPU/RAM limits per round.

---

**Conclusion:** Bun Elysia handled ~2,800 RPS consistently with low memory usage, but CPU utilization patterns indicate limited multi-core scaling.
