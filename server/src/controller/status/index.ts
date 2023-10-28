import { Request, Response, Router } from "express";
import getStatus from "./getStatus";

const statusRouter = Router();

statusRouter.get("/status", async (req: Request, res: Response): Promise<any> => {
  return await getStatus.execute(req, res)
});

export default statusRouter;
