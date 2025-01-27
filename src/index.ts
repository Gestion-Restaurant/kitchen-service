import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mongooseConnect } from "./middleware/DBMiddleware";
import KitchenRouter from "./routes/kitchen.routes";
import DishRouter from "./routes/dish.routes";
import { requestLogger } from './middleware/requestLogger';

const corsOptions = {
};

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

mongooseConnect();

app.use(express.json());
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});

app.use('/restaurants', KitchenRouter);
app.use('/dishes', DishRouter);