import http from "k6/http";
import { check, group, sleep } from "k6";

// CAN PERFORM CRUD OPERATIONS

// 1, 2, 3
// const bun_elysia = 6485;

// 1, 2, 3
// const dotnet = 8080;

// 1, 2, 3
const node_fastify = 3000;

// const bun_hono = 1103;
// const node_express = 6582;

const PORT = node_fastify;

// NOTE: This approach will be commented out because:
// It models load based on the number of active virtual users (VUs),
// which results in more processed requests when more resources are available.
// This skews the comparison, since higher resources naturally lead to higher throughput.
// ⚠️ NOT IDEAL — our goal is to measure how efficiently the server handles CRUD operations
// under a consistent request rate, given a fixed resource allocation.

// export const options = {
//   stages: [
//     { duration: "10s", target: 10 },
//     { duration: "20s", target: 50 },
//     { duration: "20s", target: 150 },
//     { duration: "10s", target: 40 },
//     { duration: "5s", target: 0 },
//   ],
//   thresholds: {
//     checks: [
//       { threshold: "rate==1.0", abortOnFail: false, delayAbortEval: "10s" },
//     ],
//   },
// };

export const options = {
  scenarios: {
    consistent_requests: {
      executor: "constant-arrival-rate",
      rate: 2500, // 💥2500 requests per second
      timeUnit: "1.5s", //  Time unit to apply the rate
      duration: "3m", // ⏱️ Test duration
      preAllocatedVUs: 500, //  Initial VUs to allocate (doubled from 50)
      maxVUs: 1200, //  Maximum VUs the test can scale to (doubled from 300)
    },
  },
  thresholds: {
    checks: [{ threshold: "rate==1.0" }],
  },
};

export default function () {
  const baseUrl = `http://192.168.32.4:${PORT}/api/v1`;
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
            responseData?.data?.id || // handles: { data: { id: "..." } }
            (Array.isArray(responseData?.data) && responseData.data[0]?.id) || // handles: { data: [ { id: "..." } ] }
            null;

          if (taskId) {
            console.log("✅ Extracted Task ID:", taskId);
            createdTasks.push(taskId);
          } else {
            console.error(
              "❌ Could not extract task ID from response:",
              JSON.stringify(responseData)
            );
          }
        } catch (err) {
          console.error(
            `🚨 Failed to parse JSON: ${err.message}. Response: ${res.body}`
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

      const isDotNet = baseUrl.includes(":8080");
      const method = isDotNet ? http.put : http.patch;

      const res = method(`${baseUrl}/${taskId}/update-task`, payload, {
        headers: { "Content-Type": "application/json" },
        tags: { operation: "update" },
      });

      console.log(`Update Task Response: ${res.status}, Body: ${res.body}`);

      check(res, {
        update_status_200: (r) => r.status === 200,
      });

      if (res.status === 200) {
        try {
          const responseData = res.json();
          const updatedId =
            responseData?.data?.id || // single object
            (Array.isArray(responseData?.data) && responseData.data[0]?.id) ||
            null;

          if (!updatedId || updatedId !== taskId) {
            console.warn(
              `⚠️ Update response ID mismatch or missing for task ${taskId}`
            );
          }
        } catch (err) {
          console.error(`🚨 Failed to parse update response: ${err.message}`);
        }
      } else {
        console.error(`❌ Failed to update task: ${taskId}`);
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

      if (res.status === 200) {
        try {
          const data =
            res.json()?.data ??
            (Array.isArray(res.json()?.data) ? res.json()?.data[0] : null);

          if (!data) {
            console.warn(
              `⚠️ Missing data in re-read response for task ${taskId}`
            );
          } else if (!data.title.includes("updated")) {
            console.warn(
              `⚠️ Task ${taskId} was not updated correctly: title = ${data.title}`
            );
          }
        } catch (err) {
          console.error(`🚨 Failed to parse re-read response: ${err.message}`);
        }
      } else {
        console.error(`❌ Task not found during Re-read Task: ${taskId}`);
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
      if (res.status === 200 || res.status === 204) {
        try {
          const result = res.json();
          if (result?.message && !result.message.includes("deleted")) {
            console.warn(
              `⚠️ Delete response message doesn't confirm deletion: ${result.message}`
            );
          }
        } catch (_) {
          // Skip parsing if no body (204 status)
        }
      } else {
        console.error(`❌ Failed to delete task: ${taskId}`);
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
      // sleep(Math.random());

      updateTask(taskId);
      // sleep(Math.random());

      validateUpdatedTask(taskId);
      // sleep(Math.random());

      deleteTask(taskId);
      // sleep(Math.random());
    }
  }

  // Main Execution Flow
  createTask();
  processTasks();
  // sleep(Math.random());
}
