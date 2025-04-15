import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 100, // virtual users
  duration: "30s",
};

export default function () {
  const res = http.get("http://localhost:6582/api/v1/get-tasks");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
