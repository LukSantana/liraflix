import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class getContentByQuery extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      let contentId = req.query.id as string;
      let contentName = req.query.name as string;
      let contentStatus = req.query.status as string;
      let contentType = req.query.type as string;

      const connection = await this.openDatabaseConnection();

      const response = await contentRepository
        .getContentList(
          contentId,
          contentName,
          contentStatus,
          contentType,
          connection!
        );

      return res.status(200).json(response);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}

export default new getContentByQuery();