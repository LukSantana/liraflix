import { PrismaClient } from "@prisma/client";

export interface getGenresTypes {
  genreName: string,
  contentType: string,
  genreId: string,
  databaseConnection: PrismaClient
}