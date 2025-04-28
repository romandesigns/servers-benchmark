import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 600 },
    { duration: "2m", target: 1600 },
    { duration: "1m", target: 100 },
    { duration: "30s", target: 0 },
  ],
};

const endpoint = (port, segment) =>
  `http://localhost:${port}/api/v1/${segment}`;

export default function () {
  const tasks = http.get(endpoint(8080, "get-tasks"));
  if (tasks.status === 200 && Array.isArray(tasks.json().data)) {
    tasks.json().data.forEach((task) => {
      if (task.id) {
        console.log(`Fetching task with ID: ${task.id}`);
        // Corrected endpoint format
        const res = http.get(endpoint(8080, `${task.id}/get-task`));
        if (res.status === 200) {
          try {
            const taskData = res.json();
            check(res, {
              "status is 200": (r) => r.status === 200,
              "response contains task ID": (r) => taskData.id === task.id,
            });
          } catch (error) {
            console.error(
              `Failed to parse JSON for task ID ${task.id}: ${error.message}`
            );
          }
        } else {
          console.error(
            `Failed to fetch task with ID ${task.id}: ${res.status} - ${res.body}`
          );
        }
      } else {
        console.error("Task object is missing an ID");
      }
    });
  } else {
    console.error(
      `Failed to fetch tasks or invalid response format: ${tasks.body}`
    );
  }

  sleep(0.5);
}
