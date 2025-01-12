import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerDocs from "./utils/swagger";
import configs from "./config/configs";
import { handleNotFound } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import route, { PREFIXES } from "./router";

const app: Express = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Holla!");
});

swaggerDocs(app, configs.PORT);

app.use(PREFIXES.API, route);

app.use(handleNotFound);
app.use(errorHandlerMiddleware);

export default app;
