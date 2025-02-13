const pgQueries = {
  getTasks: "SELECT * FROM tasks",
  getTask: "SELECT * FROM tasks WHERE id = $1",
  insertTask:
    "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
  updateTask: "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
  deleteTask: "DELETE FROM tasks WHERE id = $1",
};

module.exports = pgQueries;
