import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import getGenres from "./getGenres";

const genresRouter = Router();
genresRouter.get("/genres", async (req: Request, res: Response): Promise<any> => {
  return await getGenres.execute(req, res)
});

export default genresRouter;
