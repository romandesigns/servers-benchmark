import http from "k6/http";
import { check, sleep } from "k6";
import {
  randomItem,
  randomString,
} from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import { logResponse } from "../helper/logger.js";

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

      const payload = JSON.stringify({
        title: `Updated ${randomString(5)}`,
        description: `Updated description ${randomString(10)}`,
        complete: true,
      });

      const headers = { "Content-Type": "application/json" };
      const res = http.put(`${baseUrl}/${task.id}/update-task`, payload, {
        headers,
      });

      logResponse("[UPDATE TASK]", res, { taskId: task.id, payload });

      check(res, {
        "update task status is 200": (r) => r.status === 200,
      });
    } else {
      console.warn("[UPDATE TASK] No tasks found to update.");
    }
  } else {
    console.error(
      `[UPDATE TASK] Failed to retrieve tasks. Status: ${tasksRes.status}`
    );
  }

  sleep(0.5);
}
