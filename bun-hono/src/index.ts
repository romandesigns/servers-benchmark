import { Hono } from 'hono'
import pgQueries from "../utils/queries";
import {pool} from './config/database-connection';

const app = new Hono()
const base = '/api/v1'

// CONTROLLER: retrieving all tasks
app.get(`${base}/get-tasks`, async (c) => {
  try {
    const tasks = await pool.query(pgQueries.getTasks);
    return c.json({success: true, message:"All tasks retrieved", data: tasks.rows});
  } catch (e) {
    console.error(e);
    c.json({ message: "Server error occurred", error: e });
  }
});

// CONTROLLER: retrieving task
app.get(`${base}/:id/get-task`, async (c) => {
  try {
    const value = [c.req.param('id')];
    const task = await pool.query(pgQueries.getTask, value);
    return c.json({success: true, message:"Task retrieved", data: task.rows});
  } catch (e) {
    console.error(e);
    return c.json({ message: "Server error occurred", error: e });
  }
});

// CONTROLLER: create task
app.post(`${base}/create-task`, async (c) => {
  try {
    const {title, description} = await c.req.json();
    const values = [title, description];
    const task = await pool.query(pgQueries.insertTask, values);
    return c.json({success: true, message:"All tasks retrieved", data: task.rows});
  } catch (e) {
    console.error(e);
    return c.json({ message: "Server error occurred", error: e });
  }
});

// CONTROLLER: update task
app.patch(`${base}/:id/update-task`, async (c) => {
  try {
    const id = c.req.param('id');
    const {title, description} = await c.req.json();
    const values = [title, description, id];
    console.log(values);
    const task = await pool.query(pgQueries.updateTask, values);
    return c.json({success: true, message:"Task updated", data: task.rows});
  } catch (e) {
    console.error(e);
    return c.json({ message: "Server error occurred", error: e });
  }
});

// CONTROLLER: delete task
app.delete(`${base}/:id/delete-task`, async (c) => {
  try {
    const values = [c.req.param('id')];
    const task = await pool.query(pgQueries.deleteTask, values);
    return c.json({success: true, message:"Task deleted", data: task.rows});
  } catch (e) {
    console.error(e);
    return c.json({ message: "Server error occurred", error: e });
  }
});

export default {
  port: Bun.env.APP_PORT,
  fetch: app.fetch,
}
