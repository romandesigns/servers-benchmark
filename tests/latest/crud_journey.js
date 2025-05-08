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
  let taskId;

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
      has_task_id: (r) =>
        r.json().data && r.json().data[0] && r.json().data[0].id,
    });

    const responseData = res.json();
    if (responseData.data && responseData.data[0]) {
      taskId = responseData.data[0].id;
    }
  });

  if (!taskId) return;

  sleep(0.5);

  group("Read Task", () => {
    const res = http.get(`${baseUrl}/${taskId}/get-task`, {
      tags: { operation: "read" },
    });

    console.log(`Read Task Response: ${res.status}, Body: ${res.body}`);

    check(res, {
      read_status_200: (r) => r.status === 200,
      has_correct_task_details: (r) =>
        r.json().data &&
        r.json().data.id === taskId &&
        r.json().data.title.includes(`VU ${__VU}`),
    });
  });

  sleep(0.5);

  group("Update Task", () => {
    const payload = JSON.stringify({
      title: `VU ${__VU} updated`,
      description: "updated description",
    });

    const res = http.put(`${baseUrl}/${taskId}/update-task`, payload, {
      headers: { "Content-Type": "application/json" },
      tags: { operation: "update" },
    });

    console.log(`Update Task Response: ${res.status}, Body: ${res.body}`);

    check(res, {
      update_status_200: (r) => r.status === 200,
      updated_correctly: (r) =>
        r.json().data &&
        r.json().data.title === `VU ${__VU} updated` &&
        r.json().data.description === "updated description",
    });
  });

  sleep(0.5);

  group("Delete Task", () => {
    const res = http.del(`${baseUrl}/${taskId}`, null, {
      tags: { operation: "delete" },
    });

    console.log(`Delete Task Response: ${res.status}, Body: ${res.body}`);

    check(res, {
      delete_status_200_204: (r) => r.status === 200 || r.status === 204,
    });
  });

  group("Validate Task Deletion", () => {
    const res = http.get(`${baseUrl}/${taskId}/get-task`, {
      tags: { operation: "validate-delete" },
    });

    check(res, {
      task_is_deleted: (r) => r.status === 404 || r.status === 410,
    });
  });

  sleep(Math.random());
}
