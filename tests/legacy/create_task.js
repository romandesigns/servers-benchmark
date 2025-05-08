import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Counter } from "k6/metrics";

const responseTime = new Trend("response_time");
const errorCount = new Counter("error_count");

export const options = {
  stages: [
    { duration: "30s", target: 600 },
    { duration: "2m", target: 1600 },
    { duration: "1m", target: 100 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const url = "http://localhost:8080/api/v1/create-task";
  const payload = JSON.stringify({
    title: `New user create - ${Math.floor(Math.random() * 1000)}`,
    description: `Dummy description ${Math.random()}`,
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.post(url, payload, params);

  responseTime.add(res.timings.duration);
  if (res.status !== 200) {
    errorCount.add(1);
    console.error(`Request failed with status ${res.status}: ${res.body}`);
  }

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(0.5);
}
