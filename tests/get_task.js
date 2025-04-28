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
  tasks.data.map((task) => {
    const res = http.get(endpoint(8080, `get-task/${task.id}`));
    check(res, {
      "status is 200": (r) => r.status === 200,
      "response contains task ID": (r) => r.json().id === task.id,
    });
  });

  sleep(0.5);
}
