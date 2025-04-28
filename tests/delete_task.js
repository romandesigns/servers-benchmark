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
  const res = http.del(`http://localhost:8080/api/v1/delete-task/${taskId}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response confirms deletion": (r) =>
      r.body.includes("Task deleted successfully"),
  });

  sleep(0.5);
}
