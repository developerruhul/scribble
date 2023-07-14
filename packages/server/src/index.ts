import Express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = Express();

app.get('/', (req, res) => {
  res.json({ text: 'Hello worldss' });
});

app.listen(port, host, () => {
  console.log(`Listening to http://${host}:${port}`);
});
