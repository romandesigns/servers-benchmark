# 📊 Benchmark Results: Bun Elysia API - First Draft

## 🧪 Consolidated Performance Table

| Round | CPU / RAM        | Total Requests | Avg Resp Time | p95 Resp Time | RPS     | Error % | CPU Max | Mem Max   |
|-------|------------------|----------------|---------------|---------------|---------|---------|---------|-----------|
| 1     | 0.25 CPU / 128MB | 90,005         | 2.88 ms       | 5.52 ms       | 499.99  | 0%      | ~25%    | ~60.8MB   |
| 2     | 0.5 CPU / 256MB  | 90,000         | 2.77 ms       | 4.93 ms       | 499.95  | 0%      | ~25%    | ~63.57MB  |
| 3     | 1 CPU / 384MB    | 90,005         | 2.78 ms       | 5.08 ms       | 499.96  | 0%      | ~28%    | ~65.04MB  |

---

## 🧠 Observations & Notes

### ✅ Round 1 (Low Resource: 0.25 CPU / 128MB)

- Processed **90,005 requests** with **zero errors**.
- **Average response time** was **2.88 ms**, with **p95 latency** at **5.52 ms**.
- Achieved **peak RPS** of **499.99**.
- CPU usage peaked at approximately **~25%**, memory at **~60.8MB**.
- Incredibly efficient compared to other runtimes under minimal resource conditions.

### ✅ Round 2 (Mid Resource: 0.5 CPU / 256MB)

- Completed **90,000 requests** with no reported errors.
- **Average response time** slightly improved to **2.77 ms**, and **p95 latency** dropped to **4.93 ms**.
- Maintained a solid **RPS** of **499.95**.
- CPU usage remained consistent at **~25%**, and memory climbed modestly to **~63.57MB**.
- Performance is extremely stable even as resources increase.

### ✅ Round 3 (High Resource: 1 CPU / 384MB)

- Maintained **90,005 successful requests** and **0% error rate**.
- **Average response time** steady at **2.78 ms**, with **p95 latency** at **5.08 ms**.
- **RPS** remained consistent at **499.96**, matching previous rounds.
- CPU usage peaked at **~28%**, memory climbed slightly to **~65.04MB**.
- Shows minimal gain from added resources, confirming exceptional efficiency even at lower tiers.

---

## 🔧 Supporting Assets

| ROUNDS | Grafana      | K6           | Resources usage |
|--------|--------------|--------------|-----------------|
| 1      | ![Grafana](sandbox:/mnt/data/first-draft-round-1-resources.png) | ![K6](sandbox:/mnt/data/first-draft-round-1-stats.png) | ![Stats](sandbox:/mnt/data/first-draft-round-1-resources.png) |
| 2      | ![Grafana](sandbox:/mnt/data/first-draft-round-2-resources.png) | ![K6](sandbox:/mnt/data/first-draft-round-2-stats.png) | ![Stats](sandbox:/mnt/data/first-draft-round-2-resources.png) |
| 3      | ![Grafana](sandbox:/mnt/data/first-draft-round-3-resources.png) | ![K6](sandbox:/mnt/data/first-draft-round-3-stats.png) | ![Stats](sandbox:/mnt/data/first-draft-round-3-resources.png) |

---

## 📋 Final Assessment

Bun Elysia showcases **outstanding performance** and **minimal resource consumption**. Across all three rounds, it maintained sub-3ms average response times and nearly identical RPS. The framework is highly optimized for speed and scalability even at low CPU and memory tiers, making it a top-tier candidate for ultra-fast and efficient services under load.
