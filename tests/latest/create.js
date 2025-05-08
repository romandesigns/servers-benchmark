import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "20s", target: 50 },
    { duration: "10s", target: 0 },
  ],
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)"],
};
const baseUrl = "http://localhost:6582/api/v1/";

export default function () {
  const payload = JSON.stringify({
    title: `VU ${__VU} task`,
    description: "initial description",
  });
  const res = http.post(`${baseUrl}create-task`, payload, {
    headers: { "Content-Type": "application/json" },
    tags: { operation: "create" },
  });
  check(res, {
    create_status_200_201: (r) => r.status === 200 || r.status === 201,
  });
  sleep(1);
}
