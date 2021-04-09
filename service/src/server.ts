import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import routes from './routes';

const app: express.Application = express();

app.use(cors());

// It validates middleware config such as xss and referrer policy
app.use(helmet());

// It limits requests payload size
app.use(express.json({ limit: '10kb' }));

// It limits request quantity from the same IP in a period
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.use(routes);

export default app;
