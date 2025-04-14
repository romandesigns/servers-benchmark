import { Hono } from "hono";
import pgQueries from "../utils/queries";
import { pool } from "./config/database-connection";
import * as client from "prom-client";

const app = new Hono();
const base = "/api/v1";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const taskCreateCounter = new client.Counter({
  name: "task_created_total",
  help: "Total number of tasks created",
});

const taskDeleteCounter = new client.Counter({
  name: "task_deleted_total",
  help: "Total number of tasks deleted",
});

register.registerMetric(taskCreateCounter);
register.registerMetric(taskDeleteCounter);

// Prometheus metrics endpoint
app.get("/metrics", async (c) => {
  return c.text(await register.metrics(), 200, {
    "Content-Type": register.contentType,
  });
});

// Health check
app.get("/health", (c) => c.text("ok"));

// Test route
app.get("/test", (c) => c.json({ success: true, message: "Hologic" }));

// Retrieve all tasks
app.get(`${base}/get-tasks`, async (c) => {
  try {
    const tasks = await pool.query(pgQueries.getTasks);
    return c.json({
      success: true,
      message: "All tasks retrieved",
      data: tasks.rows,
    });
  } catch (e) {
    console.error(e);
    return c.json({
      success: false,
      message: "Server error occurred",
      error: e,
    });
  }
});

// Retrieve a single task
app.get(`${base}/:id/get-task`, async (c) => {
  try {
    const id = c.req.param("id");
    const task = await pool.query(pgQueries.getTask, [id]);
    return c.json({
      success: true,
      message: "Task retrieved",
      data: task.rows[0] || null,
    });
  } catch (e) {
    console.error(e);
    return c.json({
      success: false,
      message: "Server error occurred",
      error: e,
    });
  }
});

// Create a new task
app.post(`${base}/create-task`, async (c) => {
  try {
    const { title, description } = await c.req.json();
    const task = await pool.query(pgQueries.insertTask, [title, description]);

    taskCreateCounter.inc(); // 📈 Prometheus counter

    return c.json({
      success: true,
      message: "Task created",
      data: task.rows[0],
    });
  } catch (e) {
    console.error(e);
    return c.json({
      success: false,
      message: "Server error occurred",
      error: e,
    });
  }
});

// Update a task
app.patch(`${base}/:id/update-task`, async (c) => {
  try {
    const id = c.req.param("id");
    const { title, description } = await c.req.json();
    const task = await pool.query(pgQueries.updateTask, [
      title,
      description,
      id,
    ]);

    return c.json({
      success: true,
      message: "Task updated",
      data: task.rows[0],
    });
  } catch (e) {
    console.error(e);
    return c.json({
      success: false,
      message: "Server error occurred",
      error: e,
    });
  }
});

// Delete a task
app.delete(`${base}/:id/delete-task`, async (c) => {
  try {
    const id = c.req.param("id");
    const task = await pool.query(pgQueries.deleteTask, [id]);
    taskDeleteCounter.inc(); // 📉 Prometheus counter
    return c.json({
      success: true,
      message: "Task deleted",
      data: task.rows[0],
    });
  } catch (e) {
    console.error(e);
    return c.json({
      success: false,
      message: "Server error occurred",
      error: e,
    });
  }
});

const port = Bun.env.PORT || 1103;
console.log(`🚀 Hono server running on http://localhost:${port}`);
export default {
  port,
  fetch: app.fetch,
};
