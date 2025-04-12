import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 100 },
    { duration: "30s", target: 100 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  let res = http.get("http://localhost:6582/api/v1/get-tasks");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(0.1);
}
