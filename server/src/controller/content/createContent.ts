import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class createContent extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const contentName = this.getStringBodyAtt(req, 'contentName');
      const contentStatus = this.getStringBodyAtt(req, 'contentStatus');
      const contentType = this.getStringBodyAtt(req, 'contentType');
      const globalRating = this.getFloatBodyAtt(req, 'contentType');
      const personalRating = this.getFloatBodyAtt(req, 'personalRating');
      const genres = this.getStringBodyAtt(req, 'genres');
      const images = this.getStringBodyAtt(req, 'images');

      const connection = await this.openDatabaseConnection();

      const response = await contentRepository.createContent(
        contentName,
        contentStatus,
        contentType,
        globalRating,
        personalRating,
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