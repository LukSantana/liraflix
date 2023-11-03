import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class getContentByQuery extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const contentId = this.getStringQueryParam(req, 'contentId', false);
      const contentName = this.getStringQueryParam(req, 'contentName', false);
      const contentStatus = this.getStringQueryParam(req, 'contentStatus', false);
      const contentType = this.getStringQueryParam(req, 'contentType', false);

      const connection = await this.openDatabaseConnection();

      const response = await contentRepository
        .getContent(
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