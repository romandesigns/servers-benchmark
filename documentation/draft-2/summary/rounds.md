Here are the tables for the first and second rounds, following your format:

## 🚦 API Server Comparison (0.25 CPU / 128MB)

| Server         | Peak RPS         | Avg Resp Time    | Error % | CPU Max | Mem Max   |
| -------------- | ---------------- | --------------- | ------- | ------- | --------- |
| Bun (Elysia)   | 🟩🟩🟩🟩⬜ 249.0    | 🟧 70.26 ms      | 0%      | ~30%    | ~70.6MB   |
| Bun (Hono)     | 🟩🟩🟩🟩🟩 250.0    | 🟨 12.33 ms      | 0%      | ~30%    | ~46.5MB   |
| Node Fastify   | 🟩🟩🟩🟩⬜ 249.2    | 🟨 13.39 ms      | 0%      | ~6%     | ~49.9MB   |
| .NET           | 🟧🟧⬜⬜⬜ 133.6    | ⬜ 1.89 s        | 0%      | ~6%     | ~109.6MB  |
| Node Express   | ⬜⬜⬜⬜⬜ 60.2     | ⬜ 3.98 s        | 0%      | ~26%    | ~60.6MB   |

---

## 🚦 API Server Comparison (0.5 CPU / 256MB)

| Server         | Peak RPS         | Avg Resp Time    | Error % | CPU Max | Mem Max   |
| -------------- | ---------------- | --------------- | ------- | ------- | --------- |
| Bun (Elysia)   | 🟩🟩🟩🟩🟩 250.0    | 🟩 3.1 ms        | 0%      | ~40%    | ~78.1MB   |
| Bun (Hono)     | 🟩🟩🟩🟩🟩 249.0    | 🟩 3.75 ms       | 0%      | ~50%    | ~74.6MB   |
| Node Fastify   | 🟩🟩🟩🟩🟩 250.0    | 🟩 3.28 ms       | 0%      | ~6%     | ~50.1MB   |
| .NET           | 🟨🟨🟨🟨⬜ 245.5    | 🟨 31.09 ms      | 0%      | ~20%    | ~107.4MB  |
| Node Express   | 🟧🟧⬜⬜⬜ 135.1    | 🟧 706 ms        | 0%      | ~45%    | ~124.1MB  |

# 🚦 API Server Comparison (0.75 CPU / 384MB)

| Server         | Peak RPS         | Avg Resp Time    | Error % | CPU Max | Mem Max   |
| -------------- | ---------------- | --------------- | ------- | ------- | --------- |
| Bun (Elysia)   | 🟩🟩🟩🟩🟩 250      | 🟩 3.06 ms       | 0%      | ~35%    | ~70.4MB   |
| Bun (Hono)     | 🟩🟩🟩🟩🟩 250      | 🟩 3.88 ms       | 0%      | ~45%    | ~78.9MB   |
| Node Fastify   | 🟩🟩🟩🟩🟩 250      | 🟩 3.3 ms        | 0%      | ~6%     | ~39.0MB   |
| .NET           | 🟨🟨🟨🟨⬜ 246.6    | 🟨 14.74 ms      | 0%      | ~20%    | ~106.2MB  |
| Node Express   | 🟧🟧🟧⬜⬜ 217.3    | 🟧 160 ms        | 0%      | ~71%    | ~66.6MB   |

**Legend:**
- 🟩 = Excellent
- 🟨 = Good
- 🟧 = Fair
- ⬜ = Below others

- **Peak RPS**: Higher is better (max 250)
- **Avg Resp Time**: Lower is better

**Summary:**  
Bun (Elysia), Bun (Hono), and Node Fastify all reach the maximum RPS with ultra-low latency and efficient resource usage. .NET is close behind with good performance. Node Express lags in both throughput and latency at this resource level.
