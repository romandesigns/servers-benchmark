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

export default function () {
  const taskId = 1; // Replace with a valid task ID
  const url = `http://localhost:8080/api/v1/update-task/${taskId}`;
  const payload = JSON.stringify({
    title: `Updated task title - ${Math.floor(Math.random() * 1000)}`,
    description: `Updated description ${Math.random()}`,
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.put(url, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response contains updated title": (r) =>
      r.json().title.includes("Updated task title"),
  });

  sleep(0.5);
}
