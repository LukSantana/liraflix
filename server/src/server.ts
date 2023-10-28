import express from "express";

import {
	APP_ROUTER_PREFIX,
	serverPort
} from "@infra/environments";
import { handleCors } from "@server/cors";
import routes from "@server/routes";

const app = express();
handleCors(app);

app.use(express.json());
app.use(APP_ROUTER_PREFIX, routes);

app.listen(serverPort, () =>
	console.log(`Server running on port ${serverPort}`)
);
