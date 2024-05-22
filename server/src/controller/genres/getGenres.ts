import AncestralController from "@ancestral/controller";
import genresRepository from "@repository/genresRepository";
import { Request, Response } from "express";

class getGenres extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      let genreName = req.query.genreName as string;
      let contentType = req.query.contentType as string;
      let genreId = req.query.id as string;

      const connection = await this.openDatabaseConnection();

      const response = await genresRepository
        .getGenres({
          genreName,
          contentType,
          genreId,
          databaseConnection: connection!,
        });

      return res.status(200).json(response);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}

export default new getGenres();