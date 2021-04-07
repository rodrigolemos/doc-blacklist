import express, { Request, Response } from 'express';

const app = express();

app.get('/', (_: Request, res: Response) => {
  return res.send({ message: 'Hello world' });
});

const port = 3001;

app.listen(port, () => console.log(`App listening on port ${port}`));
