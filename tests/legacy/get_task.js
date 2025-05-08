import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [{ duration: "30s", target: 600 }],
};

const endpoint = (port, segment) =>
  `http://localhost:${port}/api/v1/${segment}`;

export default function () {
  const tasks = http.get(endpoint(8080, "get-tasks"));

  if (tasks.status === 200 && Array.isArray(tasks.json().data)) {
    tasks.json().data.forEach((task) => {
      if (task.id) {
        console.log(`Fetching task with ID: ${task.id}`);
        const res = http.get(endpoint(8080, `${task.id}/get-task`));

        check(res, {
          "status is 200": (r) => r.status === 200,
          [`task id matches for ${task.id}`]: (r) => {
            const taskData = r.json();
            return taskData && taskData.data && taskData.data.id === task.id;
          },
        });
      } else {
        console.error("Task object is missing an ID");
      }
    });
  } else {
    console.error(
      `Failed to fetch tasks or invalid response format: ${tasks.status} - ${tasks.body}`
    );
  }

  sleep(0.5);
}
