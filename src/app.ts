import express, { Application, NextFunction, Request, Response } from 'express';
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

// Not Found Middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handling Middleware-----
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  // console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: err.message,
  });
});

export default app;
