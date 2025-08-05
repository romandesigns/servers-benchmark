## 🚦 API Server Comparison (1 CPU / 1GB)

| Server        | Peak RPS         | Avg Resp Time    | Error % | CPU Max | Mem Max   |
| ------------- | ---------------- | ---------------- | ------- | ------- | --------- |
| Bun Elysia    | 🟩🟩🟩🟩🟩 499.95    | 🟩 2.85 ms       | 0%      | ~23%    | ~62.1MB   |
| Node Fastify  | 🟩🟩🟩🟩🟩 499.94    | 🟩 2.55 ms       | 0%      | ~28%    | ~45.1MB   |
| .NET          | 🟨🟨🟨🟨⬜ 495.25    | 🟨 19.18 ms      | 0%      | ~62%    | ~95.3MB   |

---

## 🚦 API Server Comparison (2 CPU / 2GB)

| Server        | Peak RPS         | Avg Resp Time    | Error % | CPU Max  | Mem Max   |
| ------------- | ---------------- | ---------------- | ------- | -------- | --------- |
| Bun Elysia    | 🟩🟩🟩🟩🟩 499.83    | 🟩 2.45 ms       | 0%      | ~27%     | ~55.0MB   |
| Node Fastify  | 🟩🟩🟩🟩🟩 499.95    | 🟩 2.61 ms       | 0%      | ~20%     | ~44.7MB   |
| .NET          | 🟨🟨🟨🟨⬜ 497.93    | 🟨 6.7 ms        | 0%      | ~156%    | ~96.9MB   |

---

## 🚦 API Server Comparison (4 CPU / 4GB)

| Server        | Peak RPS         | Avg Resp Time    | Error % | CPU Max  | Mem Max   |
| ------------- | ---------------- | ---------------- | ------- | -------- | --------- |
| Bun Elysia    | 🟩🟩🟩🟩🟩 499.95    | 🟩 2.76 ms       | 0%      | ~27%     | ~62.6MB   |
| Node Fastify  | 🟩🟩🟩🟩🟩 499.95    | 🟩 3.51 ms       | 0%      | ~20%     | ~47.8MB   |
| .NET          | 🟨🟨🟨🟨⬜ 498.57    | 🟨 5.54 ms       | 0%      | ~160%    | ~98.7MB   |

---

**Legend:**
- 🟩 = Excellent
- 🟨 = Good
- 🟧 = Fair
- ⬜ = Below others

- **Peak RPS**: Higher is better (max 500)
- **Avg Resp Time**: Lower is better

---

### **Summary:**
**Bun Elysia** and **Node Fastify** both deliver *maximum throughput* and *ultra-low latency* at every resource tier, with exceptionally efficient CPU/memory usage and no errors.  
**.NET** achieves high throughput as well, but with noticeably higher average response times (especially at low resources) and much greater CPU usage as you scale up cores.  
For lightweight async CRUD workloads, Node/Bun clearly provide best-in-class efficiency and responsiveness.
