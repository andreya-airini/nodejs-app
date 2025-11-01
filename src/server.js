// src/server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
// import { Student } from './models/student.js';

import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

import authRoutes from './routes/authRoutes.js';

import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Перший маршрут
app.use(authRoutes);
app.use(studentsRoutes);
app.use(userRoutes);

// Тестовий маршрут для генерації помилки
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
