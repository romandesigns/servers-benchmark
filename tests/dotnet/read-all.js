import http from "k6/http";
import { check, sleep } from "k6";
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
  const res = http.get(`${baseUrl}/get-tasks`);

  // --- Clean unified logging
  logResponse("[GET ALL TASKS]", res);

  check(res, {
    "get all tasks status is 200": (r) => r.status === 200,
  });

  sleep(0.5);
}
