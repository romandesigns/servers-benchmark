# 📊 Benchmark Results: .NET – 2500 RPS Stress Test

## 🧪 Consolidated Performance Table

| Round | CPU / RAM   | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS     | Error % | CPU Max | Mem Max  |
|-------|-------------|---------------|---------------|---------------|---------------|---------|---------|---------|----------|
| 1     | 1 CPU / 1GB | 450,323       | 13.15 ms      | 26.83 ms      | 145.91 ms     | 2,500/s | 0%      | ~95%    | ~165 MB  |
| 2     | 2 CPU / 2GB | 450,303       | 13.19 ms      | 26.96 ms      | 137.22 ms     | 2,500/s | 0%      | ~90%    | ~165 MB  |
| 3     | 4 CPU / 4GB | 450,320       | 13.20 ms      | 27.10 ms      | 139.85 ms     | 2,500/s | 0%      | ~85%    | ~165 MB  |

---

## 🧠 Observations & Notes

### ✅ Round 1 (1 CPU / 1GB)
- CPU usage peaked at **~95%**; memory maxed at **~165 MB**.
- Sustained **~2,500 RPS** for 3 minutes without degradation.
- Latencies: **Avg**: 13.15 ms, **p95**: 26.83 ms, **Max**: 145.91 ms.
- Network I/O: ~165 MB received, ~72 MB sent.

### ✅ Round 2 (2 CPU / 2GB)
- CPU usage peaked at **~90%**, indicating efficient multi-core utilization.
- Memory usage remained at ~165 MB peak.
- Throughput held steady at **~2,500 RPS**; minimal latency variation.
- No failed requests.

### ✅ Round 3 (4 CPU / 4GB)
- CPU usage peaked at **~85%**, showing reduced per-core load.
- Memory usage identical (~165 MB).
- Latency profile unchanged; maintained full throughput.
- No errors.

---

## 🔧 Supporting Assets

| ROUNDS | K6 Stats      |
|--------|---------------|
| 1      | ![K6](sandbox:/mnt/data/503fb62a-8e86-463a-80ba-174795d2e761.png) |
| 2      | ![K6](sandbox:/mnt/data/0676d5d4-dc54-41a8-badb-21e32beeb502.png) |
| 3      | ![K6](sandbox:/mnt/data/782b0be7-40d7-4e3d-bb01-f93862c61eba.png) |

---

## 📋 Final Assessment

This test confirms:

- **Throughput ceiling:** .NET maintained a **true 2,500 RPS** across all resource tiers without saturation.
- **Multi-core scaling:** Unlike single-threaded Node-based servers, .NET distributed load effectively, reducing per-core CPU usage as more cores were added.
- **Latency stability:** Response times remained consistent across all rounds, indicating no queue buildup.
- **Resource efficiency:** Memory usage was minimal relative to allocation.

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
- **Total Iterations per Round:** ~450k requests.
- **VUs Provisioned:** 2,000 pre-allocated, max 3,000.
- **Avg Latency Observed:** ~13 ms.
- **System Under Test:** .NET CRUD API (multi-threaded).
- **Test Environment:** Dockerized container with varying CPU/RAM limits per round.

---

**Conclusion:** .NET handled the 2,500 RPS load effortlessly, scaling well with additional cores and maintaining low latency. It demonstrated strong multi-threaded performance and efficient resource utilization.
