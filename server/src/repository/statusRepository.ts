import { PrismaClient } from "@prisma/client";

class StatusRepository {
  async getStatus(
    statusName: string,
    statusId: string,
    databaseConnection: PrismaClient,
  ) {
    try {
      const response = await databaseConnection.contentStatus.findMany({
        where: {
          id: statusId,
          status: statusName,
        },
      });

      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new StatusRepository();