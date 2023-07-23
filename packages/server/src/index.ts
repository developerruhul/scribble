require('dotenv').config();
import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';
import syntaxErrHandler, {
  customErrHandler,
} from './controllers/error-handler';

/**
 * EXPRESS CONFIGS
 */
const app = Express();

app.use(cors({ origin: process.env.FRONTEND_URL, optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// handle syntax error in the request body
app.use(syntaxErrHandler);

/**
 * ROUTES
 */
app.use('/auth', authRoute);

// handle error created inside app logics
app.use(customErrHandler);

/**
 * SERVER CONFIGS
 */
const host = process.env.BACKEND_HOST ?? 'localhost';
const port = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 3001;

app.listen(port, () => {
  console.log(`Listening to http://${host}:${port}`);
});

// Global error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
