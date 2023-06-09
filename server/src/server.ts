import express from "express";
import swaggerUi from "swagger-ui-express";
import { APP_ROUTER_PREFIX, serverPort } from "./infra/environments";
import { handleCors } from "./server/cors";
import routes from "./server/routes";
import { swaggerDocument } from "./swagger/index";

const app = express();

app.use(express.json());
handleCors(app);

app.use(APP_ROUTER_PREFIX, routes);

app.use(`${APP_ROUTER_PREFIX}/swagger`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(serverPort, () =>
	console.log(`Server running on port ${serverPort}`)
);
