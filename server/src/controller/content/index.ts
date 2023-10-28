import {
  Request,
  Response,
  Router
} from "express";
import getContentByQuery from "./getContentByQuery";
import createContent from "./createContent";
import updateContent from "./updateContent";
import deleteContent from "./deleteContent";

const contentRouter = Router();

contentRouter.get("/content", async (req: Request, res: Response): Promise<any> => {
  return await getContentByQuery.execute(req, res)
})

contentRouter.post("/content", async (req: Request, res: Response) => {
  return await createContent.execute(req, res);
});

contentRouter.put("/content/:id", async (req: Request, res: Response) => {
  return await updateContent.execute(req, res);
});

contentRouter.delete("/content/:id", async (req: Request, res: Response) => {
  return await deleteContent.execute(req, res);
});

export default contentRouter;
