import { Router } from "express";
import {
  contentRoutes,
  genresRoutes,
  statusRoutes
} from "@controller/index";
import Swagger from "../swagger";

const router = Router();

router.use(contentRoutes);
router.use(genresRoutes);
router.use(statusRoutes)
router.use(Swagger)

export default router;
