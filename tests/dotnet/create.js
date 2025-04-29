import http from "k6/http";
import { check, sleep } from "k6";
import { randomString } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import { logResponse } from "../../helper/logger.js";

export const options = {
  stages: [
    { duration: "30s", target: 300 },
    { duration: "30s", target: 600 },
    { duration: "30s", target: 0 },
  ],
};

const baseUrl = "http://localhost:8080/api/v1";

export default function () {
  const payload = JSON.stringify({
    title: `Task ${randomString(5)}`,
    description: `Description ${randomString(10)}`,
  });

  const headers = { "Content-Type": "application/json" };

  const res = http.post(`${baseUrl}/create-task`, payload, { headers });

  // --- Clean unified logging
  logResponse("[CREATE TASK]", res, { payload });

  check(res, {
    "create task status is 201": (r) => r.status === 201,
    "response time is less than 200ms": (r) => r.timings.duration < 200,
  });

  sleep(0.56);
}
