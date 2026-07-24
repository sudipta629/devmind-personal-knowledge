const fs = require('fs');
const path = require('path');

const dirs = [
  'src',
  'src/config',
  'src/controllers',
  'src/routes',
  'src/services',
  'src/middlewares',
  'src/models',
  'src/utils',
  'src/types',
  'src/constants',
  'src/interfaces'
];

dirs.forEach(d => {
  const p = path.join(__dirname, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const files = {
  'src/app.ts': "import express, { Application, Request, Response, NextFunction } from 'express';\\nimport cors from 'cors';\\nimport helmet from 'helmet';\\nimport morgan from 'morgan';\\nimport compression from 'compression';\\nimport cookieParser from 'cookie-parser';\\nimport rateLimit from 'express-rate-limit';\\nimport { errorHandler } from './middlewares/errorHandler';\\nimport { notFound } from './middlewares/notFound';\\n\\nconst app: Application = express();\\n\\n// Middlewares\\napp.use(express.json());\\napp.use(express.urlencoded({ extended: true }));\\napp.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));\\napp.use(helmet());\\napp.use(morgan('dev'));\\napp.use(compression());\\napp.use(cookieParser());\\n\\nconst limiter = rateLimit({\\n  windowMs: 15 * 60 * 1000,\\n  max: 100\\n});\\napp.use(limiter);\\n\\n// Health Route\\napp.get('/', (req: Request, res: Response) => {\\n  res.status(200).json({\\n    success: true,\\n    message: 'Backend Running Successfully'\\n  });\\n});\\n\\n// 404 Handler\\napp.use(notFound);\\n\\n// Global Error Handler\\napp.use(errorHandler);\\n\\nexport default app;\\n",
  'src/server.ts': "import dotenv from 'dotenv';\\ndotenv.config();\\n\\nimport app from './app';\\nimport { logger } from './utils/logger';\\n\\nconst PORT = process.env.PORT || 5000;\\n\\napp.listen(PORT, () => {\\n  logger.info(`Server running on http://localhost:${PORT}`);\\n});\\n",
  '.env': "PORT=5000\\nNODE_ENV=development\\nFRONTEND_URL=http://localhost:3000\\nJWT_SECRET=CHANGE_ME_LATER\\n",
  'tsconfig.json': "{\\n  \\"compilerOptions\\": {\\n    \\"target\\": \\"ES2022\\",\\n    \\"module\\": \\"CommonJS\\",\\n    \\"moduleResolution\\": \\"node\\",\\n    \\"esModuleInterop\\": true,\\n    \\"forceConsistentCasingInFileNames\\": true,\\n    \\"strict\\": true,\\n    \\"skipLibCheck\\": true,\\n    \\"outDir\\": \\"./dist\\",\\n    \\"rootDir\\": \\"./src\\",\\n    \\"resolveJsonModule\\": true,\\n    \\"baseUrl\\": \\".\\",\\n    \\"paths\\": {\\n      \\"@/*\\": [\\"src/*\\"]\\n    }\\n  },\\n  \\"include\\": [\\"src/**/*\\"],\\n  \\"exclude\\": [\\"node_modules\\", \\"dist\\"]\\n}\\n",
  'src/middlewares/errorHandler.ts': "import { Request, Response, NextFunction } from 'express';\\nimport { ApiError } from '../utils/ApiError';\\nimport { logger } from '../utils/logger';\\n\\nexport const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {\\n  let statusCode = err.statusCode || 500;\\n  let message = err.message || 'Internal Server Error';\\n\\n  if (!(err instanceof ApiError)) {\\n    logger.error(err);\\n  }\\n\\n  res.status(statusCode).json({\\n    success: false,\\n    message,\\n    stack: process.env.NODE_ENV === 'production' ? null : err.stack\\n  });\\n};\\n",
  'src/middlewares/notFound.ts': "import { Request, Response, NextFunction } from 'express';\\n\\nexport const notFound = (req: Request, res: Response, next: NextFunction) => {\\n  res.status(404).json({\\n    success: false,\\n    message: 'API route not found'\\n  });\\n};\\n",
  'src/middlewares/auth.middleware.ts': "import { Request, Response, NextFunction } from 'express';\\n\\nexport const authMiddleware = (req: Request, res: Response, next: NextFunction) => {\\n  // Placeholder\\n  next();\\n};\\n",
  'src/middlewares/validation.middleware.ts': "import { Request, Response, NextFunction } from 'express';\\n\\nexport const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {\\n  // Placeholder\\n  next();\\n};\\n",
  'src/middlewares/logger.middleware.ts': "import { Request, Response, NextFunction } from 'express';\\nimport { logger } from '../utils/logger';\\n\\nexport const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {\\n  logger.info(`${req.method} ${req.url}`);\\n  next();\\n};\\n",
  'src/utils/ApiResponse.ts': "export class ApiResponse<T> {\\n  public success: boolean;\\n  public message: string;\\n  public data?: T;\\n\\n  constructor(statusCode: number, message: string = 'Success', data?: T) {\\n    this.success = statusCode < 400;\\n    this.message = message;\\n    this.data = data;\\n  }\\n}\\n",
  'src/utils/ApiError.ts': "export class ApiError extends Error {\\n  public statusCode: number;\\n  public isOperational: boolean;\\n\\n  constructor(statusCode: number, message: string, isOperational: boolean = true, stack: string = '') {\\n    super(message);\\n    this.statusCode = statusCode;\\n    this.isOperational = isOperational;\\n    if (stack) {\\n      this.stack = stack;\\n    } else {\\n      Error.captureStackTrace(this, this.constructor);\\n    }\\n  }\\n}\\n",
  'src/utils/asyncHandler.ts': "import { Request, Response, NextFunction } from 'express';\\n\\nexport const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {\\n  Promise.resolve(fn(req, res, next)).catch(next);\\n};\\n",
  'src/utils/logger.ts': "export const logger = {\\n  info: (msg: string) => console.log(`[INFO] ${msg}`),\\n  error: (msg: any) => console.error(`[ERROR] ${msg}`),\\n  warn: (msg: string) => console.warn(`[WARN] ${msg}`)\\n};\\n"
};

const routeNames = [
  'auth.routes.ts',
  'article.routes.ts',
  'profile.routes.ts',
  'comment.routes.ts',
  'follow.routes.ts',
  'bookmark.routes.ts',
  'notification.routes.ts',
  'search.routes.ts',
  'dashboard.routes.ts'
];

routeNames.forEach(name => {
  files['src/routes/' + name] = "import { Router } from 'express';\\nconst router = Router();\\n\\n// Routes\\n// router.get('/', controller.getAll);\\n\\nexport default router;\\n";
});

const serviceNames = [
  'auth.service.ts',
  'article.service.ts',
  'profile.service.ts',
  'comment.service.ts',
  'follow.service.ts',
  'bookmark.service.ts',
  'notification.service.ts'
];

serviceNames.forEach(name => {
  const serviceName = name.split('.')[0].charAt(0).toUpperCase() + name.split('.')[0].slice(1);
  files['src/services/' + name] = "class " + serviceName + "Service {\\n  // Placeholder methods\\n}\\n\\nexport const " + name.split('.')[0] + "Service = new " + serviceName + "Service();\\n";
});

const controllerNames = [
  'auth.controller.ts',
  'article.controller.ts',
  'profile.controller.ts',
  'comment.controller.ts',
  'follow.controller.ts',
  'bookmark.controller.ts',
  'notification.controller.ts',
  'search.controller.ts',
  'dashboard.controller.ts'
];

controllerNames.forEach(name => {
  const className = name.split('.')[0].charAt(0).toUpperCase() + name.split('.')[0].slice(1) + 'Controller';
  files['src/controllers/' + name] = "import { Request, Response, NextFunction } from 'express';\\n\\nclass " + className + " {\\n  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {\\n    // Placeholder\\n  }\\n\\n  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {\\n    // Placeholder\\n  }\\n\\n  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {\\n    // Placeholder\\n  }\\n\\n  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {\\n    // Placeholder\\n  }\\n\\n  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {\\n    // Placeholder\\n  }\\n}\\n\\nexport const " + name.split('.')[0] + "Controller = new " + className + "();\\n";
});

Object.keys(files).forEach(f => {
  const p = path.join(__dirname, f);
  const data = files[f].replace(/\\$\{([^\}]+)\}/g, '$$$$1'); // Ensure literal string replacement logic wasn't the issue, actually I replaced with regular strings
  fs.writeFileSync(p, files[f]);
});

const pkgPath = path.join(__dirname, 'package.json');
let pkg = {};
if (fs.existsSync(pkgPath)) {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}
pkg.scripts = {
    ...pkg.scripts,
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "build": "tsc"
};
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log('Setup complete.');
