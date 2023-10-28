import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

abstract class AncestralController {
  protected databaseConnection: PrismaClient | undefined

  constructor() {
    this.databaseConnection = undefined
  }

  async exec(req: Request, res: Response) {

  }

  async execute(req: Request, res: Response) {
    try {
      return await this.exec(req, res);
    } catch (e: any) {
      throw new Error(e);
    } finally {
      await this.closeDatabaseConnection();
    }
  }

  async openDatabaseConnection(): Promise<PrismaClient | void> {
    try {
      this.databaseConnection = new PrismaClient();

      return this.databaseConnection;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async closeDatabaseConnection() {
    try {
      await this.databaseConnection?.$disconnect()
    } catch (e: any) {
      throw new e;
    }
  }
}

export default AncestralController;