# 📊 Benchmark Results: Bun Hono – 2500 RPS Stress Test

## 🧪 Consolidated Performance Table

| Round | CPU / RAM   | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS     | Error % | CPU Max | Mem Max  |
|-------|-------------|---------------|---------------|---------------|---------------|---------|---------|---------|----------|
| 1     | 1 CPU / 1GB | 195,080       | 21.5 ms       | 14.1 ms       | 1.4 s         | 1,041/s | 0%      | ~40%    | ~50.7 MB |
| 2     | 2 CPU / 2GB | 150,025       | 11.8 ms       | 11.8 ms       | 521 ms        |   788/s | 0%      | ~35%    | ~55.4 MB |
| 3     | 4 CPU / 4GB | 150,270       | 10.3 ms       | 10.6 ms       | 514 ms        |   793/s | 0%      | ~35%    | ~52.7 MB |

---

## 🧠 Observations & Notes

### ⚠ Round 1 (1 CPU / 1GB)
- CPU usage peaked at **~40%**; far from saturation.
- Memory usage stable at **~50.7 MB**.
- Throughput: **1,041 RPS** sustained.
- Latencies: **Avg**: 21.5 ms, **p95**: 14.1 ms, occasional spikes up to 1.4 s.
- No failed requests.

### ⚠ Round 2 (2 CPU / 2GB)
- CPU usage maxed around **~35%**.
- Memory usage slightly higher at **55.4 MB**.
- Throughput: **788 RPS** sustained.
- Latencies much lower: **Avg**: 11.8 ms, **p95**: 11.8 ms.
- No errors.

### ⚠ Round 3 (4 CPU / 4GB)
- CPU stable around **~35%**.
- Memory usage stable at **52.7 MB**.
- Throughput: **793 RPS** sustained.
- Latencies: **Avg**: 10.3 ms, **p95**: 10.6 ms.
- No errors.

---

## 🔧 Supporting Assets

| ROUNDS | K6 Stats      |
|--------|---------------|
| 1      | ![K6](sandbox:/mnt/data/7f5ec905-8d87-44fa-8e70-5a0cdc4339ef.png) |
| 2      | ![K6](sandbox:/mnt/data/93df23ae-3639-46b6-81ba-dbd2892b2218.png) |
| 3      | ![K6](sandbox:/mnt/data/992c2e17-9d3c-43ed-a975-650d0d0391bf.png) |

---

## 📋 Final Assessment

This test confirms:

- **Throughput ceiling:** Bun Hono sustained ~800–1,000 RPS across all rounds.
- **CPU efficiency:** Despite multiple cores, CPU usage never exceeded ~40%, suggesting the workload or K6 config did not push the server to its scaling limits.
- **Latency advantage:** Unlike Bun Elysia, Hono consistently returned **sub-25 ms average latencies**, with **p95 staying below 15 ms** (except for Round 1’s occasional 1.4 s spikes).
- **Memory footprint:** Extremely efficient, under **60 MB** even at 4 GB allocation.

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
- **Total Iterations per Round:** 150k–195k requests.
- **VUs Provisioned:** 2,000 pre-allocated, max 3,000.
- **Avg Latency Observed:** ~10–21 ms (very low).
- **System Under Test:** Bun Hono CRUD API.
- **Test Environment:** Dockerized container with varying CPU/RAM limits per round.

---

**Conclusion:** Bun Hono showed **much lower latencies than Bun Elysia** while consuming minimal CPU and memory. However, throughput plateaued around **800–1,000 RPS**, indicating the workload or test harness might be the limiting factor rather than the runtime itself.
