import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "20s", target: 30 },
    { duration: "20s", target: 50 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    checks: [
      { threshold: "rate==1.0", abortOnFail: false, delayAbortEval: "10s" },
    ],
  },
};

export default function () {
  const baseUrl = "http://localhost:6582/api/v1/";
  const createdTasks = [];

  function createTask() {
    group("Create Task", () => {
      const payload = JSON.stringify({
        title: `VU ${__VU} task`,
        description: "initial description",
      });

      const res = http.post(`${baseUrl}/create-task`, payload, {
        headers: { "Content-Type": "application/json" },
        tags: { operation: "create" },
      });

      console.log(`Create Task Response: ${res.status}, Body: ${res.body}`);

      check(res, {
        create_status_200_201: (r) => r.status === 200 || r.status === 201,
      });

      if (res.status === 200 || res.status === 201) {
        try {
          const responseData = res.json();
          const taskId =
            responseData.data && responseData.data[0]
              ? responseData.data[0].id
              : null;
          if (taskId) {
            createdTasks.push(taskId);
          }
        } catch (err) {
          console.error(
            `Failed to parse JSON: ${err.message}. Response: ${res.body}`
          );
        }
      }
    });
  }

  function readTask(taskId) {
    group("Read Task", () => {
      const res = http.get(`${baseUrl}/${taskId}/get-task`, {
        tags: { operation: "read" },
      });

      console.log(`Read Task Response: ${res.status}, Body: ${res.body}`);

      check(res, {
        read_status_200: (r) => r.status === 200,
      });

      if (res.status !== 200) {
        console.error(`Task not found during Read Task: ${taskId}`);
      }
    });
  }

  function updateTask(taskId) {
    group("Update Task", () => {
      const payload = JSON.stringify({
        title: `VU ${__VU} updated`,
        description: "updated description",
      });

      const res = http.patch(`${baseUrl}/${taskId}/update-task`, payload, {
        headers: { "Content-Type": "application/json" },
        tags: { operation: "update" },
      });

      console.log(`Update Task Response: ${res.status}, Body: ${res.body}`);

      check(res, {
        update_status_200: (r) => r.status === 200,
      });

      if (res.status !== 200) {
        console.error(`Failed to update task: ${taskId}`);
      }
    });
  }

  function validateUpdatedTask(taskId) {
    group("Re-read Task", () => {
      const res = http.get(`${baseUrl}/${taskId}/get-task`, {
        tags: { operation: "read-again" },
      });

      console.log(`Re-read Task Response: ${res.status}, Body: ${res.body}`);

      check(res, {
        reread_status_200: (r) => r.status === 200,
      });

      if (res.status !== 200) {
        console.error(`Task not found during Re-read Task: ${taskId}`);
      }
    });
  }

  function deleteTask(taskId) {
    group("Delete Task", () => {
      const res = http.del(`${baseUrl}/${taskId}/delete-task`, null, {
        tags: { operation: "delete" },
      });

      console.log(`Delete Task Response: ${res.status}, Body: ${res.body}`);

      check(res, {
        delete_status_200_204: (r) => r.status === 200 || r.status === 204,
      });

      if (res.status !== 200 && res.status !== 204) {
        console.error(`Failed to delete task: ${taskId}`);
      }
    });
  }

  function processTasks() {
    while (createdTasks.length > 0) {
      // Getting the next task ID from the list
      const taskId = createdTasks.shift();

      if (!taskId) {
        console.error("No task ID found. Skipping...");
        continue;
      }

      readTask(taskId);
      sleep(Math.random());

      updateTask(taskId);
      sleep(Math.random());

      validateUpdatedTask(taskId);
      sleep(Math.random());

      deleteTask(taskId);
      sleep(Math.random());
    }
  }

  // Main Execution Flow
  createTask();
  processTasks();
  sleep(Math.random());
}
