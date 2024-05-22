import { PrismaClient } from "@prisma/client";

export interface getStatusTypes {
  statusName: string,
  statusId: string,
  databaseConnection: PrismaClient
}