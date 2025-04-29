import http from "k6/http";
import { check, sleep } from "k6";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
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
  const tasksRes = http.get(`${baseUrl}/get-tasks`);

  if (tasksRes.status === 200 && Array.isArray(tasksRes.json().data)) {
    const tasks = tasksRes.json().data;

    if (tasks.length > 0) {
      const task = randomItem(tasks);
      const res = http.get(`${baseUrl}/${task.id}/get-task`);

      // --- Log full transaction cleanly
      logResponse("[GET SINGLE TASK]", res, { taskId: task.id });

      check(res, {
        "get single task status is 200": (r) => r.status === 200,
        "task ID matches": (r) => {
          const taskData = r.json();
          return taskData && taskData.data && taskData.data.id === task.id;
        },
      });
    } else {
      console.warn("[GET SINGLE TASK] No tasks found to fetch.");
    }
  } else {
    console.error(
      `[GET SINGLE TASK] Failed to retrieve tasks. Status: ${tasksRes.status}`
    );
  }

  sleep(0.5);
}
