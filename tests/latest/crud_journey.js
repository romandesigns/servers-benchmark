import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "20s", target: 30 },
    { duration: "20s", target: 50 },
    { duration: "10s", target: 0 },
  ],
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)"],
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

    check(
      res,
      {
        create_status_200_201: (r) => r.status === 200 || r.status === 201,
      },
      { operation: "create" }
    );

    taskId = res.json().id || res.json()._id;
  });

  if (!taskId) return;

  sleep(0.5);

  group("Read Task", () => {
    const res = http.get(`${baseUrl}/${taskId}/get-task`, {
      tags: { operation: "read" },
    });

    check(
      res,
      {
        read_status_200: (r) => r.status === 200,
      },
      { operation: "read" }
    );
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

    check(
      res,
      {
        update_status_200: (r) => r.status === 200,
      },
      { operation: "update" }
    );
  });

  sleep(0.5);

  group("Re-read Task", () => {
    const res = http.get(`${baseUrl}/${taskId}/get-task`, {
      tags: { operation: "read-again" },
    });

    check(
      res,
      {
        reread_status_200: (r) => r.status === 200,
      },
      { operation: "read-again" }
    );
  });

  sleep(0.5);

  group("Delete Task", () => {
    const res = http.del(`${baseUrl}/${taskId}`, null, {
      tags: { operation: "delete" },
    });

    check(
      res,
      {
        delete_status_200_204: (r) => r.status === 200 || r.status === 204,
      },
      { operation: "delete" }
    );
  });

  sleep(Math.random());
}
