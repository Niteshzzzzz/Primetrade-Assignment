import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import env from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

// CORS configuration to allow credentials
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
if (env.NODE_ENV === 'development') app.use(morgan('dev'));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

export default app;
