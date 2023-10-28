import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class getContentByQuery extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const contentId = this.getStringBodyAtt(req, 'id');
      const contentName = this.getStringBodyAtt(req, 'name');
      const contentStatus = this.getStringBodyAtt(req, 'status');
      const contentType = this.getStringBodyAtt(req, 'type');

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