
# 📊 Benchmark Results: Node Fastify – 2500 RPS Stress Test (Re‑generated)

> Source: three new screenshots you shared (Docker resources + k6 results). Numbers below were read directly from those images.

## 🧪 Consolidated Performance Table

| Round | CPU / RAM   | Total Requests | Avg Resp Time | p95 Resp Time | Max Resp Time | RPS     | Error % | CPU Max        | Mem Max  |
|------:|-------------|---------------:|--------------:|--------------:|--------------:|--------:|--------:|----------------|---------:|
| 1     | 1 CPU / 1GB | **362,130**    | **1.51 s**    | **2.06 s**    | **16.68 s**   | **1,949/s** | **0%**  | ~100% (1 core saturated) | ~49.5 MB |
| 2     | 2 CPU / 2GB | **362,180**    | **1.50 s**    | **2.10 s**    | **10.15 s**   | **1,950/s** | **0%**  | ~100% (single-thread ceiling) | ~50.3 MB |
| 3     | 4 CPU / 4GB | **371,965**    | **1.47 s**    | **2.24 s**    | **8.78 s**    | **1,998/s** | **0%**  | ~100% (work stays on one core) | ~54.5 MB |

---

## 🧠 Observations & Notes

### ⚠ Round 1 (1 CPU / 1GB)
- CPU pinned at ~100% for most of the run → **single‑thread bottleneck**.
- Memory small and steady (~49.5 MB).
- Achieved **~1,949 RPS** for 3 minutes (k6 `http_reqs` ≈ 362k).  
- Latencies: **avg 1.51 s**, **p95 2.06 s**, **max 16.68 s**. No errors.

### ⚠ Round 2 (2 CPU / 2GB)
- **Throughput unchanged** (~1,950 RPS). Extra cores **did not help**: Fastify (single event‑loop) stays on one core unless clustered.
- Latency profile similar (avg 1.50 s, p95 2.10 s). Memory ≈ 50.3 MB. 0 errors.

### ⚠ Round 3 (4 CPU / 4GB)
- With more CPU/RAM, **RPS rose only slightly** to ~1,998/s. Still primarily bound by the single worker.
- Latencies a touch better (avg 1.47 s; p95 2.24 s). Memory ≈ 54.5 MB. 0 errors.

> TL;DR: At this arrival rate, **one Fastify worker saturates a single core around ~2k RPS** in your environment. To scale further, run **Node Cluster**/workers or horizontal pods.

---

## 🔧 Supporting Assets (your screenshots)

| Round | Composite (Resources + k6) |
|------:|-----------------------------|
| 1 | ![Round 1](sandbox:/mnt/data/3bae5c5f-d763-458e-985e-23e7f50021e7.png) |
| 2 | ![Round 2](sandbox:/mnt/data/1083a3be-592f-4eab-bdac-91d9b07d74b8.png) |
| 3 | ![Round 3](sandbox:/mnt/data/070f1720-1000-4eee-bd4c-40c2175661f4.png) |

---

## 📋 Final Assessment

- **Ceiling hit**: The app is **CPU‑bound on one thread**; more cores don’t increase throughput without clustering.  
- **Latency is queue‑driven**: p95 ≈ 2.0–2.3s reflects backlog while the single loop drains requests.  
- **Resource use is tiny**: ~50–55 MB RAM across all tiers.

---

## 📦 Load Test Breakdown

### k6 Scenario
```javascript
export const options = {
  scenarios: {
    consistent_requests: {
      executor: "constant-arrival-rate",
      rate: 2500,            // target 2,500 iters per second
      timeUnit: "1s",
      duration: "3m",
      preAllocatedVUs: 2000,
      maxVUs: 3000,
      gracefulStop: "0s",
    },
  },
  thresholds: { checks: ["rate==1.0"] },
  discardResponseBodies: true,
  insecureSkipTLSVerify: true,
};
```

### Execution Notes
- **Achieved RPS** (from k6): ~1,949 → ~1,998 RPS across rounds (not the full 2,500 due to CPU saturation).  
- **Total requests**: ~362k → ~372k per 3‑minute round.  
- **No failures**; all responses 200 OK.  
- **System Under Test**: Node Fastify CRUD API, single worker (no cluster).

---

**Next step:** run the **same test with Node Cluster (N workers = #cores)** to verify linear scaling and compare against Bun/.NET.
