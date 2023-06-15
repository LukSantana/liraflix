import { Router } from "express";
import contentRouter from "../routes/contentRoutes";
import genresRouter from "../routes/genresRoutes";

const router = Router();

router.use(contentRouter);
router.use(genresRouter);

export default router;
