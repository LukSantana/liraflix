import { Express } from "express"
import cors from "cors";

let corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200,
};

export const handleCors = (app: Express) => {
  return app.use(cors(corsOptions));
}