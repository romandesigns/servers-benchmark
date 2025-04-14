"use strict";
const pgQueries = require("../utils/queries.js");
const base = "/api/v1";
const client = require("prom-client");

module.exports = async function (fastify, opts) {
  const register = new client.Registry();
  client.collectDefaultMetrics({ register });

  const taskCreatedCounter = new client.Counter({
    name: "task_created_total",
    help: "Total number of tasks created",
  });

  const taskDeletedCounter = new client.Counter({
    name: "task_deleted_total",
    help: "Total number of tasks deleted",
  });

  register.registerMetric(taskCreatedCounter);
  register.registerMetric(taskDeletedCounter);

  // METRICS endpoint
  fastify.get("/metrics", async function (request, reply) {
    reply.header("Content-Type", register.contentType);
    reply.send(await register.metrics());
  });

  // HEALTH check
  fastify.get("/health", async function (request, reply) {
    reply.status(200).send("ok");
  });

  // TEST route
  fastify.get("/test", async function (request, reply) {
    reply.status(200).send({ success: true, message: "Hologic" });
  });

  // GET all tasks
  fastify.get(`${base}/get-tasks`, async function (request, reply) {
    try {
      const tasks = await fastify.pg.query(pgQueries.getTasks);
      reply.status(200).send({
        success: true,
        message: "All tasks retrieved",
        data: tasks.rows,
      });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });

  // GET one task
  fastify.get(`${base}/:id/get-task`, async function (request, reply) {
    try {
      const task = await fastify.pg.query(pgQueries.getTask, [
        request.params.id,
      ]);
      reply.status(200).send({
        success: true,
        message: "Task retrieved",
        data: task.rows[0] || null,
      });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });

  // CREATE task
  fastify.post(`${base}/create-task`, async function (request, reply) {
    try {
      const task = await fastify.pg.query(pgQueries.insertTask, [
        request.body.title,
        request.body.description,
      ]);

      taskCreatedCounter.inc(); // ✅ Count new task

      reply.status(200).send({
        success: true,
        message: "Task created",
        data: task.rows[0],
      });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });

  // UPDATE task
  fastify.patch(`${base}/:id/update-task`, async function (request, reply) {
    try {
      const task = await fastify.pg.query(pgQueries.updateTask, [
        request.body.title,
        request.body.description,
        request.params.id,
      ]);
      reply.status(200).send({
        success: true,
        message: "Task updated",
        data: task.rows[0],
      });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });

  // DELETE task
  fastify.delete(`${base}/:id/delete-task`, async function (request, reply) {
    try {
      const task = await fastify.pg.query(pgQueries.deleteTask, [
        request.params.id,
      ]);

      taskDeletedCounter.inc(); // ✅ Count deletion

      reply.status(200).send({
        success: true,
        message: "Task deleted",
        data: task.rows[0],
      });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });
};
