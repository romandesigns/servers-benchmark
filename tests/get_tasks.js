import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    {
      duration: "30s",
      target: 600,
    },
    {
      duration: "2m",
      target: 1600,
    },
    {
      duration: "1m",
      target: 100,
    },
    {
      duration: "30s",
      target: 0,
    },
  ],
};

const endpoint = (port, segment) =>
  `http://localhost:${port}/api/v1/${segment}`;

export default function () {
  const res = http.get(endpoint(8080, "get-tasks"));
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(0.5);
}
