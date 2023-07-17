require('dotenv').config();
import Express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';

/**
 * EXPRESS CONFIGS
 */
const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**
 * ROUTES
 */
app.use('/auth', authRoute);

/**
 * SERVER CONFIGS
 */
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(port, () => {
  console.log(`Listening to http://${host}:${port}`);
});
