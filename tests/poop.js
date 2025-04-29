import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 50, // 50 Virtual Users
  duration: "30s", // for 30 seconds
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests must complete below 500ms
  },
};

export default function () {
  http.get("http://localhost:8080/api/v1/get-tasks"); // <--- Target one of your Docker containers!
  sleep(0.1); // Short sleep between requests
}
