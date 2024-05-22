import { PrismaClient } from "@prisma/client";

export interface getContentTypes {
  id?: string,
  contentName?: string,
  contentStatus?: string,
  contentType?: string,
  page?: number,
  databaseConnection: PrismaClient,
}

export interface createContentTypes {
  contentName: string,
  content_status: string,
  content_type: string,
  global_rating: number,
  genres: string,
  images: string,
  databaseConnection: PrismaClient,
  personal_rating: number | null,
}

export interface updateContentTypes {
  contentId: string,
  contentStatus: string,
  databaseConnection: PrismaClient,
}

export interface deleteContentTypes {
  contentId: string,
  databaseConnection: PrismaClient,
}