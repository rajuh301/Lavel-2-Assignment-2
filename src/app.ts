import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoute } from './app/config/modules/product/product.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application route

app.use('/api', ProductRoute);

const getAController = (req: Request, res: Response) => {
  res.send('Api home page');
};

app.get('/', getAController);

export default app;
