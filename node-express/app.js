import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/index.js";
import client from "prom-client";

dotenv.config();
const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds by method and route",
  labelNames: ["method", "route", "status_code"],
});
register.registerMetric(httpRequestDuration);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Middleware to track response time
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({
    method: req.method,
    route: req.route?.path || req.path, // Normalize dynamic routes
  });
  res.on("finish", () => {
    end({ status_code: res.statusCode });
  });
  next();
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// App routes
app.get("/health", (req, res) => res.status(200).send("ok"));

app.get("/test", (req, res) =>
  res.status(200).json({ success: true, message: "Hologic" })
);
app.use("/api/v1", taskRoutes);

//Launching application
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT || 6582}`)
);
