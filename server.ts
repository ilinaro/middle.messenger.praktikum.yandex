import express, { Request, Response } from 'express';

import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`My static server is running on port ${PORT}!`);
});
