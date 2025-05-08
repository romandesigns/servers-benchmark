import http from "k6/http";
import { check, sleep } from "k6";
import {
  randomItem,
  randomString,
} from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

export const options = {
  stages: [
    { duration: "30s", target: 300 },
    { duration: "30s", target: 600 },
    { duration: "30s", target: 0 },
  ],
};

const baseUrl = "http://localhost:8080/api/v1";

export default function () {
  const actions = ["create", "read_all", "read_one", "update", "delete"];
  const action = randomItem(actions);

  switch (action) {
    case "create":
      createTask();
      break;
    case "read_all":
      getAllTasks();
      break;
    case "read_one":
      getRandomTask();
      break;
    case "update":
      updateRandomTask();
      break;
    case "delete":
      deleteRandomTask();
      break;
  }

  sleep(0.5);
}

function createTask() {
  const payload = JSON.stringify({
    title: `Task ${randomString(5)}`,
    description: `Description ${randomString(10)}`,
  });

  const headers = { "Content-Type": "application/json" };

  const res = http.post(`${baseUrl}/create-task`, payload, { headers });

  console.log(`[CREATE] Payload: ${payload}, Status: ${res.status}`);

  check(res, {
    "create task status is 201": (r) => r.status === 201,
  });
}

function getAllTasks() {
  const res = http.get(`${baseUrl}/get-tasks`);

  console.log(
    `[READ_ALL] Status: ${res.status}, Total tasks: ${
      res.json().data?.length || 0
    }`
  );

  check(res, {
    "get all tasks status is 200": (r) => r.status === 200,
  });
}

function getRandomTask() {
  const tasksRes = http.get(`${baseUrl}/get-tasks`);

  if (tasksRes.status === 200 && Array.isArray(tasksRes.json().data)) {
    const tasks = tasksRes.json().data;
    if (tasks.length > 0) {
      const task = randomItem(tasks);
      const res = http.get(`${baseUrl}/${task.id}/get-task`);

      console.log(
        `[READ_ONE] Fetching task ID: ${task.id}, Status: ${res.status}`
      );

      check(res, {
        "get task by ID status is 200": (r) => r.status === 200,
        "task ID matches": (r) => {
          const taskData = r.json();
          return taskData && taskData.data && taskData.data.id === task.id;
        },
      });
    } else {
      console.log(`[READ_ONE] No tasks found to fetch.`);
    }
  } else {
    console.log(`[READ_ONE] Failed to fetch tasks list.`);
  }
}

function updateRandomTask() {
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

      console.log(
        `[UPDATE] Updating task ID: ${task.id}, Payload: ${payload}, Status: ${res.status}`
      );

      check(res, {
        "update task status is 200": (r) => r.status === 200,
      });
    } else {
      console.log(`[UPDATE] No tasks found to update.`);
    }
  } else {
    console.log(`[UPDATE] Failed to fetch tasks list.`);
  }
}

function deleteRandomTask() {
  const tasksRes = http.get(`${baseUrl}/get-tasks`);

  if (tasksRes.status === 200 && Array.isArray(tasksRes.json().data)) {
    const tasks = tasksRes.json().data;
    if (tasks.length > 0) {
      const task = randomItem(tasks);
      const res = http.del(`${baseUrl}/${task.id}/delete-task`);

      console.log(
        `[DELETE] Deleting task ID: ${task.id}, Status: ${res.status}`
      );

      check(res, {
        "delete task status is 200": (r) => r.status === 200,
      });
    } else {
      console.log(`[DELETE] No tasks found to delete.`);
    }
  } else {
    console.log(`[DELETE] Failed to fetch tasks list.`);
  }
}
