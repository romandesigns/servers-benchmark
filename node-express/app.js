
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
app.get('/health', (req, res) => res.status(200).send('ok'));

app.get('/test', (req, res) => res.status(200).json({success: true, message:"Hologic"}));
app.use('/api/v1', taskRoutes);

//Launching application
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT || 6582}`) );
