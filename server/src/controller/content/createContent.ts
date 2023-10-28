import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class createContent extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      const contentName = body.name;
      const {
        content_status,
        content_type,
        global_rating,
        personal_rating,
        genres,
        images
      } = body

      const connection = await this.openDatabaseConnection();

      const response = await contentRepository.createContent(
        contentName,
        content_status,
        content_type,
        global_rating,
        personal_rating,
        genres,
        images,
        connection!,
      );

      return res.status(201).json(response);
    } catch (e: any | undefined) {
      throw new Error(e.message);
    }
  };
}

export default new createContent();