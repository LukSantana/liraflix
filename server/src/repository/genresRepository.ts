import { PrismaClient } from "@prisma/client";

class GenresRepository {
  async getGenres(
    genreName: string,
    contentType: string,
    genreId: string,
    databaseConnection: PrismaClient,
  ) {
    try {
      let whereProps: {
        name: string;
        content_type: string;
        id: string,
      } = {
        name: genreName,
        content_type: contentType,
        id: genreId,
      };

      let response;

      response = await databaseConnection.genres.findMany({
        where: whereProps,
      });
      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new GenresRepository();