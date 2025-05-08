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
  const taskId = __ENV.TASK_ID;
  if (!taskId) {
    console.error("TASK_ID not provided.");
    return;
  }
  const payload = JSON.stringify({
    title: `VU ${__VU} updated`,
    description: "updated description",
  });
  const res = http.put(`${baseUrl}${taskId}/update-task`, payload, {
    headers: { "Content-Type": "application/json" },
    tags: { operation: "update" },
  });
  check(res, {
    update_status_200: (r) => r.status === 200,
  });
  sleep(1);
}
