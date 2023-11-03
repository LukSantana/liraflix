import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

class ContentRepository {
  async getContent(
    id: string,
    contentName: string,
    contentStatus: string,
    contentType: string,
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
        name: contentName,
        content_status: contentStatus,
        content_type: contentType
      };

      let response = await databaseConnection.contentList.findMany({
        where: whereProps,
      });

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async createContent({
    contentName,
    content_status,
    content_type,
    global_rating,
    genres,
    images,
    databaseConnection,
    personal_rating,
  }: {
    contentName: string,
    content_status: string,
    content_type: string,
    global_rating: number,
    genres: string,
    images: string,
    databaseConnection: PrismaClient,
    personal_rating?: number,
  }
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
        id: string,
        name: string,
        content_status: string,
        content_type: string,
        global_rating: number,
        genres: string,
        images: string,
        personal_rating?: number,
      } = {
        id: randomUUID(),
        name: contentName,
        content_status: contentStatus!,
        content_type: contentType!,
        global_rating: globalRating,
        personal_rating: personalRating && personalRating,
        genres: genres,
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

  async getRandomContent(
    databaseConnection: PrismaClient,
  ) {
    try {
      const contentCount = await databaseConnection.contentList.count();
      const skip = Math.floor(Math.random() * contentCount);

      let response = await databaseConnection.contentList.findFirst({
        skip: skip,
      });

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new ContentRepository();