import AncestralController from "@ancestral/controller";
import statusRepository from "@repository/statusRepository";
import { Request, Response } from "express";

class getGenres extends AncestralController {
  async exec(req: Request, res: Response): Promise<any> {
    try {
      let statusName = req.query.statusName as string;
      let statusId = req.query.id as string;

      const connection = await this.openDatabaseConnection();

      const response = await statusRepository
        .getStatus({
          statusName,
          statusId,
          databaseConnection: connection!,
        });

      return res.status(200).json(response);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}

export default new getGenres();