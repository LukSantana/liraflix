import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class getContentByQuery extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const contentId = this.getStringBodyAtt(req, 'contentId', false);
      const contentName = this.getStringBodyAtt(req, 'contentName', false);
      const contentStatus = this.getStringBodyAtt(req, 'contentStatus', false);
      const contentType = this.getStringBodyAtt(req, 'contentType', false);

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