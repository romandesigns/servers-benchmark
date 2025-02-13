import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/index.js';
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// App routes
app.get('/test', (req, res) => res.status(200).json({success: true, message:"Hologic"}));
app.use('/api/v1', taskRoutes);

//Launching application
app.listen(process.env.APP_PORT, () => console.log(`Listening on port ${process.env.APP_PORT}`) );
