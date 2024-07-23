import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', dataRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API!" });
});

export default app;
