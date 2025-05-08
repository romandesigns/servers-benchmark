import http from "k6/http";
import { check, sleep } from "k6";
import { logResponse } from "../../helper/logger.js";

const node_express_port = 6582;
const node_fastify_port = 3000;
const dotnet_port = 8080;
const bun_hono_port = 1103;
const node_elysia_port = 6585;

const PORT = node_express_port;
const baseUrl = `http://localhost:${PORT}/api/v1`;

export const options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 100 },
    { duration: "30s", target: 0 },
    { duration: "30s", target: 500 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"],
    http_req_failed: ["rate<0.01"],
    http_req_waiting: ["p(95)<150"],
  },
  tags: {
    test_type: "create",
    environment: "development",
  },
  gracefulStop: "5s",
  maxRedirects: 5,
};

export default function () {
  const payload = JSON.stringify({
    title: "Task created using NODE-EXPRESS server",
    description: "Just a dummy text description",
  });
  const headers = { "Content-Type": "application/json" };
  const res = http.post(`${baseUrl}/create-task`, payload, { headers });
  logResponse("[CREATE TASK]", res, { payload });
  check(res, {
    "create task status is 201": (r) => r.status === 201,
    "response time is less than 200ms": (r) => r.timings.duration < 200,
  });

  sleep(0.5);
}
