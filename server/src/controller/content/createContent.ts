import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class createContent extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const contentName = this.getStringBodyAtt(req, 'contentName')!;
      const content_status = this.getStringBodyAtt(req, 'contentStatus')!;
      const content_type = this.getStringBodyAtt(req, 'contentType')!;
      const global_rating = this.getFloatBodyAtt(req, 'globalRating')!;
      let personal_rating = this.getFloatBodyAtt(req, 'personalRating', false);
      const genres = this.getStringBodyAtt(req, 'genres')!;
      const images = this.getStringBodyAtt(req, 'images')!;

      if (!personal_rating) personal_rating = null;

      const connection = await this.openDatabaseConnection();

      const response = await contentRepository.createContent({
        contentName,
        content_status,
        content_type,
        global_rating,
        personal_rating,
        genres,
        images,
        databaseConnection: connection!,
      }
      );

      return res.status(201).json(response);
    } catch (e: any | undefined) {
      throw new Error(e.message);
    }
  };
}

export default new createContent();