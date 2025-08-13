
## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS        | Error % | CPU Max | Mem Max   |
| ----- | ---------------- | -------------- | ------------- | ------------- | ---------- | ------- | ------- | --------- |
| 1     | 0.25 CPU / 128MB | 194,880        | 1.05 s        | 2.13 s        | 1,069.92   | 0%      | ~110%   | ~161MB    |
| 2     | 0.5 CPU / 256MB  | 276,295        | 68.47 ms      | 485.43 ms     | 1,517.74   | 0%      | ~200%   | ~142.1MB  |
| 3     | 1 CPU / 384MB    | 272,900        | 22.85 ms      | 44.05 ms      | 1,497.84   | 0%      | ~250%   | ~139.1MB  |

---

## 🧠 Observations & Notes

✅ **Round 1** (Low Resource: 0.25 CPU / 128MB)  
Processed **194,880** requests with zero errors during full CRUD test.  
Average response time: **1.05 s**, p95 latency: **2.13 s**.  
Peak RPS achieved: **1,069.92**.  
CPU usage peaked around **~110%**, memory usage at **~161MB**.  
This tier handled the load but showed very high latency compared to others.

✅ **Round 2** (Mid Resource: 0.5 CPU / 256MB)  
Handled **276,295** requests without errors.  
Average response time dropped to **68.47 ms**, with p95 latency at **485.43 ms**.  
RPS increased to **1,517.74**.  
CPU peaked at **~200%**, memory usage at **~142.1MB**.  
Significant improvement in both throughput and latency compared to Round 1.

✅ **Round 3** (High Resource: 1 CPU / 384MB)  
Managed **272,900** requests, zero errors reported.  
Average response time: **22.85 ms**, with p95 latency at **44.05 ms**.  
RPS at **1,497.84**.  
CPU usage peaked at **~250%**, memory at **~139.1MB**.  
Delivers the lowest latency and competitive RPS, but gains in throughput compared to Round 2 are minimal.

---

### **Final Assessment**
The .NET API demonstrates **excellent stability** and **consistent zero error rates** across all tiers.  
Round 1 suffers from high latency, but both Rounds 2 and 3 deliver high throughput and much lower response times.  
The best cost-performance balance appears at **0.5 CPU / 256MB**, as Round 3 shows minimal RPS improvement despite higher resources.
