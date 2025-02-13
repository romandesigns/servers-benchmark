"use strict";
const pgQueries = require("../utils/queries.js");
const base = "/api/v1";

module.exports = async function (fastify, opts) {

  // CONTROLLER: retrieving all tasks
  fastify.get(`${base}/get-tasks`, async function (request, reply) {
    try {
      const tasks = await fastify.pg.query(pgQueries.getTasks);
      reply.status(200).send({success: true, message:"All tasks retrieved", data: tasks.rows});
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });

  // CONTROLLER: retrieving task
  fastify.get(`${base}/:id/get-task`, async function (request, reply) {
    try {
      const task = await fastify.pg.query(pgQueries.getTask, [
        request.params.id,
      ]);
      reply.status(200).send({success: true, message:"Task retrieved", data: task.rows});
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });

 // CONTROLLER: create task
  fastify.post(`${base}/create-task`, async function (request, reply) {
    try {
      const task = await fastify.pg.query(pgQueries.insertTask, [
        request.body.title,
        request.body.description,
      ]);
      reply.status(200).send({success: true,message:"Task created", data: task.rows});
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });

  // CONTROLLER: update task
  fastify.patch(`${base}/:id/update-task`, async function (request, reply) {
    try {
      const task = await fastify.pg.query(pgQueries.updateTask, [
        request.body.title,
        request.body.description,
        request.params.id,
      ]);
      reply.status(200).send({success: true, message:"Task updated", data: task.rows});
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });

  // CONTROLLER: delete task
  fastify.delete(`${base}/:id/delete-task`, async function (request, reply) {
    try {
      const task = await fastify.pg.query(pgQueries.deleteTask, [
        request.params.id,
      ]);
      reply.status(200).send({success: true, message:"Task deleted", data: task.rows});
    } catch (err) {
      console.error(err);
      reply.status(500).send({ message: "Server error occurred", error: err });
    }
  });
};
