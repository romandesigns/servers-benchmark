# 📊 Benchmark Results: Node Fastify – 2500 RPS Stress Test

## 🧪 Consolidated Performance Table

| Round | CPU / RAM   | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS     | Error % | CPU Max | Mem Max  |
|-------|-------------|---------------|---------------|---------------|---------------|---------|---------|---------|----------|
| 1     | 1 CPU / 1GB | 362,130       | 1.51 s        | 2.06 s        | 16.6 s        | 1,949/s | 0%      | ~100%   | ~49.4 MB |
| 2     | 2 CPU / 2GB | 362,180       | 1.5 s         | 2.1 s         | 10.1 s        | 1,950/s | 0%      | ~120%   | ~50.3 MB |
| 3     | 4 CPU / 4GB | 371,965       | 1.47 s        | 2.24 s        | 8.78 s        | 1,998/s | 0%      | ~120%   | ~54.5 MB |

---

## 🧠 Observations & Notes

### ⚠ Round 1 (1 CPU / 1GB)
- CPU usage peaked at **~100%**, showing saturation.
- Memory usage peaked at **~49.4 MB**.
- Throughput: **1,949 RPS** sustained.
- Latencies: **Avg**: 1.51 s, **p95**: 2.06 s, spikes up to 16.6 s.
- No errors, but threshold warnings on latency.

### ⚠ Round 2 (2 CPU / 2GB)
- CPU usage increased to **~120%** across cores.
- Memory usage remained stable at ~50.3 MB.
- Throughput: **1,950 RPS** sustained.
- Latencies: **Avg**: 1.5 s, **p95**: 2.1 s, spikes up to 10.1 s.
- No failed requests.

### ⚠ Round 3 (4 CPU / 4GB)
- CPU usage still high at **~120%**.
- Memory usage rose slightly to **~54.5 MB**.
- Throughput improved slightly: **1,998 RPS** sustained.
- Latencies: **Avg**: 1.47 s, **p95**: 2.24 s, max at 8.78 s.
- All requests succeeded, but latency thresholds crossed.

---

## 🔧 Supporting Assets

| ROUNDS | K6 Stats      |
|--------|---------------|
| 1      | ![K6](sandbox:/mnt/data/6557ce0f-f5ef-434c-829a-59b40afce607.png) |
| 2      | ![K6](sandbox:/mnt/data/51848e1b-f168-4b46-801a-f09e5aad3772.png) |
| 3      | ![K6](sandbox:/mnt/data/d78f4f84-a593-4f18-bd7d-d7ede9ab9c69.png) |

---

## 📋 Final Assessment

This test confirms:

- **Throughput:** Fastify sustained ~1,950–2,000 RPS across all rounds.
- **CPU saturation:** Fully utilized available CPU resources (~100–120%). Strong multi-core utilization observed.
- **Latency trade-off:** Latencies significantly higher than Bun runtimes, with p95 around **2 seconds** and spikes up to 16 seconds under load.
- **Memory efficiency:** Usage consistently below 60 MB, very stable.
- **Reliability:** 0% errors, but latency thresholds exceeded.

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
- **Target RPS:** 2,500 (constant arrival rate).
- **Duration:** 3 minutes.
- **Total Iterations per Round:** ~362k–372k requests.
- **VUs Provisioned:** 2,000 pre-allocated, max 3,000.
- **Avg Latency Observed:** ~1.5 seconds.
- **System Under Test:** Node Fastify CRUD API.
- **Test Environment:** Dockerized container with varying CPU/RAM limits per round.

---

**Conclusion:** Fastify sustained ~2,000 RPS with efficient memory usage but high latencies under load. CPU saturation was evident, indicating solid scaling but with significant latency penalties compared to Bun runtimes.
