import express from "express";

import { APP_ROUTER_PREFIX, serverPort } from "./infra/environments";
import { handleCors } from "./server/cors";
import routes from "./server/routes";
import Swagger from "./swagger";

const app = express();

app.use(express.json());
handleCors(app);

app.use(APP_ROUTER_PREFIX, routes);

app.use(Swagger);

app.listen(serverPort, () =>
	console.log(`Server running on port ${serverPort}`)
);
