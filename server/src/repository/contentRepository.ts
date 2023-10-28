import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

class ContentRepository {
  async getContentList(
    id: string,
    name: string,
    content_status: string,
    content_type: string,
    databaseConnection: PrismaClient,
  ) {
    try {
      let whereProps: {
        id?: string;
        name?: string;
        content_status?: string;
        content_type?: string;
      } = {
        id: id,
        name: name,
        content_status: content_status,
        content_type: content_type
      };

      let response = await databaseConnection.contentList.findMany({
        where: whereProps,
      });

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async createContent(
    contentName: string,
    content_status: string,
    content_type: string,
    global_rating: number,
    personal_rating: number,
    genres: string[],
    images: string[],
    databaseConnection: PrismaClient,
  ) {
    try {
      const contentStatusResponse = await databaseConnection?.contentStatus.findFirst({
        where: {
          status: content_status,
        },
      });
      const contentStatus = contentStatusResponse?.id;

      const contentTypeResponse = await databaseConnection?.contentType.findFirst({
        where: {
          name: content_type,
        },
      });
      const contentType = contentTypeResponse?.id;

      const globalRating = global_rating;
      const personalRating = personal_rating;

      const queryData: {
        id: any;
        name: any;
        content_status: any;
        content_type: any;
        global_rating: any;
        personal_rating: any;
        genres: any;
        images: any;
      } = {
        id: randomUUID(),
        name: contentName,
        content_status: contentStatus,
        content_type: contentType,
        global_rating: globalRating,
        personal_rating: personalRating && personalRating,
        genres: `[${genres.join(',')}]`,
        images: images,
      };

      const response = await databaseConnection?.contentList.create({
        data: queryData,
      });

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateContent(
    contentId: string,
    contentStatus: string,
    databaseConnection: PrismaClient,
  ) {
    try {
      const contentStatusResponse = await databaseConnection.contentStatus.findFirst({
        where: {
          status: contentStatus,
        },
      });

      const response = await databaseConnection.contentList.update({
        where: { id: contentId },
        data: {
          content_status: contentStatusResponse?.id,
        },
      });

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async deleteContent(
    contentId: string,
    databaseConnection: PrismaClient,
  ) {
    try {
      const response = await databaseConnection.contentList.delete({
        where: {
          id: contentId,
        },
      });

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new ContentRepository();