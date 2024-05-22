import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class deleteContent extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const contentId = this.getStringBodyAtt(req, 'id');

      const connection = await this.openDatabaseConnection();

      const response = await contentRepository.deleteContent({
        contentId,
        databaseConnection: connection!,
      });

      return res.status(200).json(response);
    } catch (e: any | undefined) {
      throw new Error(e.message);
    }
  }
}

export default new deleteContent();