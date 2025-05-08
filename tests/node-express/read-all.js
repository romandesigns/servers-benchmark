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
    { duration: "30s", target: 500 },
    { duration: "1m", target: 1300 },
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
    test_type: "read",
    environment: "development",
  },
  gracefulStop: "5s",
  maxRedirects: 5,
};

export default function () {
  const res = http.get(`${baseUrl}/get-tasks`);
  logResponse("[GET ALL TASKS]", res);
  check(res, {
    "get all tasks status is 200": (r) => r.status === 200,
    "response body is not empty": (r) => r.body && r.body.length > 0,
  });
  if (res.status !== 200) {
    console.error(`Request failed with status ${res.status}`);
  }
  sleep(0.5);
}
