import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "20s", target: 50 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const baseUrl = "https://github.com/tasks";

  // Step 1: Create a new task
  const createPayload = JSON.stringify({
    title: `To Delete ${__VU}`,
    description: "temp record",
  });

  const createRes = http.post(baseUrl, createPayload, {
    headers: { "Content-Type": "application/json" },
  });

  check(createRes, {
    "create status is 201 or 200": (r) => r.status === 201 || r.status === 200,
  });

  const task = createRes.json();
  const taskId = task.id || task._id;

  // Step 2: Delete that task
  const deleteRes = http.del(`${baseUrl}/${taskId}`);

  check(deleteRes, {
    "delete status is 200 or 204": (r) => r.status === 200 || r.status === 204,
  });
}
