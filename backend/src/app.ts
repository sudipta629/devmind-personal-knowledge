import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Health Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Backend Running Successfully'
  });
});

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
