import pgQueries from "../utils/queries.js";
import { pool } from "../config/database-connection.js";

// CONTROLLER: retrieving all tasks
const getTasks = async function (req, res) {
  try {
    const tasks = await pool.query(pgQueries.getTasks);
    res.status(200).json({success: true, message:"All tasks retrieved", data: tasks.rows});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error occurred", error: e });
  }
};

// CONTROLLER: retrieving task
const getTask = async function (req, res) {
  try {
    const value = [req.params.id];
    const task = await pool.query(pgQueries.getTask, value);
    res.status(200).json({success: true, message:"Task retrieved", data: task.rows});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error occurred", error: e });
  }
};

// CONTROLLER: create task
const createTask = async function (req, res) {
  try {
    const values = [req.body.title, req.body.description]
    const task = await pool.query(pgQueries.insertTask, values);
    res.status(200).json({success: true,message:"Task created", data: task.rows});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error occurred", error: e });
  }
};

// CONTROLLER: update task
const updateTask = async function (req, res) {
  try {
    const values = [req.body.title, req.body.description,req.params.id];
    const task = await pool.query(pgQueries.updateTask, values);
    res.status(200).json({success: true, message:"Task updated", data: task.rows});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error occurred", error: e });
  }
};

// CONTROLLER: delete task
const deleteTask = async function (req, res) {
  try {
    const values = [req.params.id];
    const task = await pool.query(pgQueries.deleteTask, values);
    res.status(200).json({success: true, message:"Task deleted", data: task.rows});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error occurred", error: e });
  }
};

export { getTasks, getTask,createTask , updateTask, deleteTask};
