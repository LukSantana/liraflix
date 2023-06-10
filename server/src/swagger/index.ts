import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import { APP_ROUTER_PREFIX } from "../infra/environments";
import { swaggerDocument } from "./root";

const Swagger: Router = Router()

Swagger.use(`${APP_ROUTER_PREFIX}/swagger`, swaggerUi.serve);
Swagger.use(swaggerUi.setup(swaggerDocument))

export default Swagger;