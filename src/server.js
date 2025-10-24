// src/server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
// import { Student } from './models/student.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());

// Перший маршрут
app.use(studentsRoutes);

// Тестовий маршрут для генерації помилки
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
