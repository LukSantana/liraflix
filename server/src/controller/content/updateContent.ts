import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class updateContent extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const contentId = req.params.id;
      const contentStatus = req.body.content_status;


      const connection = await this.openDatabaseConnection();

      const response = await contentRepository.updateContent(
        contentId,
        contentStatus,
        connection!,
      );

      return res.status(200).json(response);
    } catch (e: any | undefined) {
      throw new Error(e.message);
    }
  }
}

export default new updateContent();