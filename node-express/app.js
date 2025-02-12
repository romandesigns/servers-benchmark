import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// App routes
app.get('/api/v1/get-tasks', (req, res) => {res.send('Get all tasks!');});
app.get('/:id/api/v1/get-task', (req, res) => {res.send('Get task!');});
app.post('/api/v1/create-task', (req, res) => {res.send('Create task!');});
app.patch('/:id/api/v1/update-task', (req, res) => {res.send('Update task tasks');});
app.delete('/:id/api/v1/delete-task', (req, res) => {res.send('Delete task!');});

//Launching application
app.listen(process.env.APP_PORT, () => console.log(`Listening on port ${process.env.APP_PORT}`) );
