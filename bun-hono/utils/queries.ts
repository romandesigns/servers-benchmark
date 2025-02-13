interface PgQueries  {
  getTasks: string,
  getTask: string,
  insertTask: string,
  updateTask: string,
  deleteTask: string,
}

const pgQueries:PgQueries = {
  getTasks: "SELECT * FROM tasks",
  getTask: "SELECT * FROM tasks WHERE id = $1",
  insertTask:
    "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
  updateTask: "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
  deleteTask: "DELETE FROM tasks WHERE id = $1",
};

export default pgQueries;
