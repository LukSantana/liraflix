import { Genre } from "models/Genre";
import { getGenresTypes } from "types/genres/genresFunctionsTypes";
import { parseDateToString } from "utils/parseDateToString";

class GenresRepository {
  async getGenres({
    genreName,
    contentType,
    genreId,
    databaseConnection,
  }: getGenresTypes) {
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

      const genres = await databaseConnection.genres.findMany({
        where: whereProps,
      });

      const genreList = genres.map((genre) => {
        const { id, name, content_type, creation_timestamp, record_timestamp } = genre;

        const parsedCreationTimestamp = parseDateToString(creation_timestamp);
        const parsedRecordTimestamp = parseDateToString(record_timestamp);

        const genreObject = new Genre({
          id,
          name,
          content_type,
          creation_timestamp: parsedCreationTimestamp,
          record_timestamp: parsedRecordTimestamp,
        });

        return genreObject.exportResponse()
      })

      return genreList;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new GenresRepository();