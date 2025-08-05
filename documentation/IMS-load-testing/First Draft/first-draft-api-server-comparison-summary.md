## 🚦 API Server Comparison (0.25 CPU / 128MB)

| Server         | Peak RPS         | Avg Resp Time    | Error % | CPU Max | Mem Max   |
| -------------- | ---------------- | ---------------- | ------- | ------- | --------- |
| Bun (Elysia)   | 🟩🟩🟩🟩🟩 499.99    | 🟩 2.88 ms       | 0%      | ~25%    | ~60.8MB   |
| Node Fastify   | 🟩🟩🟩🟩🟩 500.00     | 🟩 2.87 ms       | 0%      | ~27%    | ~48MB     |
| .NET           | 🟨🟨🟨🟨⬜ 246.9     | 🟨 14.98 ms      | 0%      | ~24%    | ~110MB    |

---

## 🚦 API Server Comparison (0.5 CPU / 256MB)

| Server         | Peak RPS         | Avg Resp Time    | Error % | CPU Max | Mem Max   |
| -------------- | ---------------- | ---------------- | ------- | ------- | --------- |
| Bun (Elysia)   | 🟩🟩🟩🟩🟩 499.95    | 🟩 2.77 ms       | 0%      | ~25%    | ~63.57MB  |
| Node Fastify   | 🟩🟩🟩🟩🟩 500.00     | 🟩 2.88 ms       | 0%      | ~50%    | ~49MB     |
| .NET           | 🟨🟨🟨🟨⬜ 249.4     | 🟨 13.83 ms      | 0%      | ~46%    | ~109.1MB  |

---

## 🚦 API Server Comparison (1 CPU / 384MB)

| Server         | Peak RPS         | Avg Resp Time    | Error % | CPU Max | Mem Max   |
| -------------- | ---------------- | ---------------- | ------- | ------- | --------- |
| Bun (Elysia)   | 🟩🟩🟩🟩🟩 499.96    | 🟩 2.78 ms       | 0%      | ~28%    | ~65.04MB  |
| Node Fastify   | 🟩🟩🟩🟩🟩 500.00     | 🟩 2.95 ms       | 0%      | ~47%    | ~51MB     |
| .NET           | 🟨🟨🟨🟨⬜ 249.6     | 🟨 13.95 ms      | 0%      | ~46%    | ~108.3MB  |

---

**Legend:**
- 🟩 = Excellent
- 🟨 = Good
- 🟧 = Fair
- ⬜ = Below others

- **Peak RPS**: Higher is better (max 500)
- **Avg Resp Time**: Lower is better

**Summary:**  
Bun (Elysia) and Node Fastify continue to shine with max RPS and ultra-low latency. .NET shows consistent and respectable performance but at significantly higher memory usage and slightly slower response times. It’s a solid choice for more resource-heavy workloads where .NET’s broader ecosystem is beneficial.
