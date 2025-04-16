import http from "k6/http";
import { check } from "k6";

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

export default function () {
  const res = http.get("http://localhost:3000/api/v1/get-tasks");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
