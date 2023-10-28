import AncestralController from "@ancestral/controller";
import contentRepository from "@repository/contentRepository";
import { Request, Response } from "express";

class getRandomContent extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      const connection = await this.openDatabaseConnection();

      const response = await contentRepository
        .getRandomContent(
          connection!
        );

      return res.status(200).json(response);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}

export default new getRandomContent();