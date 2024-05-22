import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import {
  createContentTypes,
  deleteContentTypes,
  getContentTypes,
  updateContentTypes
} from "../types/content/contentFunctionsTypes";
import { Content } from "models/Content";
import { parseDateToString } from "utils/parseDateToString";
import { parseStringArrayStructuredToArray } from "utils/parseStringArrayStructuredToArray";

interface wherePropsTypes {
  id?: string;
  name?: string;
  content_status?: string;
  content_type?: string;
}

class ContentRepository {
  async getContent({
    id,
    contentName,
    contentStatus,
    contentType,
    page,
    databaseConnection,
  }: getContentTypes) {
    try {
      let whereProps: wherePropsTypes = {};

      if (id) whereProps.id = id
      if (contentName) whereProps.name = contentName
      if (contentStatus) whereProps.content_status = contentStatus
      if (contentType) whereProps.content_type = contentType

      let findManyProps: {
        where?: wherePropsTypes,
        take: number,
        skip?: number
      } = {
        take: 20,
      }

      if (whereProps.id || whereProps.content_status || whereProps.content_type || whereProps.name) findManyProps.where = whereProps

      if (page) findManyProps.skip = (page - 1) * 20

      let response = await databaseConnection.contentList.findMany(findManyProps)

      const contentList = response.map((content: any) => {
        let { id, content_status, content_type, creation_timestamp, genres, global_rating, name, personal_rating, record_timestamp, images } = content;

        if(typeof genres === 'string') genres = parseStringArrayStructuredToArray(genres)

        const contentObject = new Content({
          id,
          content_status,
          content_type,
          creation_timestamp: parseDateToString(creation_timestamp),
          genres,
          global_rating,
          name,
          personal_rating,
          record_timestamp: parseDateToString(record_timestamp),
          images,
        })

        return contentObject.exportResponse() 
      });

      return contentList;
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
  }: createContentTypes
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

      const contentObject = new Content({
        id: randomUUID(),
        name: contentName,
        content_status: contentStatus!,
        content_type: contentType!,
        global_rating: globalRating,
        personal_rating: personalRating,
        genres: parseStringArrayStructuredToArray(genres),
        images,
      })

      const contentData = contentObject.exportContentToDatabase();

      let queryData = contentData;

      const response = await databaseConnection?.contentList.create({
        data: queryData,
      });

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateContent({
    contentId,
    contentStatus,
    databaseConnection
  }: updateContentTypes) {
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

  async deleteContent({
    contentId,
    databaseConnection,
  }: deleteContentTypes) {
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

      if (response === null) throw new Error("No content found");

      const {
        id,
        content_status,
        content_type,
        creation_timestamp,
        genres,
        global_rating,
        name,
        personal_rating,
        record_timestamp,
        images,
      } = response;

      const parsedGenres = parseStringArrayStructuredToArray(genres);

      const parsedCreationTimestamp = parseDateToString(creation_timestamp);

      const parsedRecordTimestamp = parseDateToString(record_timestamp);


      const contentObject = new Content({
        id,
        content_status,
        content_type,
        creation_timestamp: parsedCreationTimestamp,
        genres: parsedGenres,
        global_rating,
        name,
        personal_rating,
        record_timestamp: parsedRecordTimestamp,
        images,
      })

      const contentResponse = contentObject.exportResponse();

      return contentResponse;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new ContentRepository();