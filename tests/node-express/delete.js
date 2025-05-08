import http from "k6/http";
import { check, sleep } from "k6";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import { logResponse } from "../../helper/logger.js";

const node_express_port = 6582;
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
    "http_req_duration{method:DELETE}": ["p(95)<150"],
  },
  tags: {
    test_type: "delete",
    environment: "development",
  },
  gracefulStop: "5s",
  maxRedirects: 5,
};

export default function () {
  const tasksRes = http.get(`${baseUrl}/get-tasks`);
  const jsonResponse = tasksRes.json();

  if (
    tasksRes.status === 200 &&
    jsonResponse &&
    Array.isArray(jsonResponse.data)
  ) {
    const tasks = jsonResponse.data;

    if (tasks.length > 0) {
      const task = randomItem(tasks);
      const res = http.del(`${baseUrl}/${task.id}/delete-task`);
      logResponse("[DELETE TASK]", res, { taskId: task.id });
      check(res, {
        "delete task status is 200": (r) => r.status === 200,
      });
      if (res.status !== 200) {
        console.error(
          `[DELETE TASK] Failed to delete task with ID: ${task.id}. Response: ${res.body}`
        );
      }
    } else {
      console.warn("[DELETE TASK] No tasks found to delete.");
      return;
    }
  } else {
    console.error(
      `[DELETE TASK] Failed to retrieve tasks. Status: ${tasksRes.status}. Response: ${tasksRes.body}`
    );
  }
  sleep(0.5);
}
