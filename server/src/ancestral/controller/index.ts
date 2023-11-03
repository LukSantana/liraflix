import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { isBooleanObject, isStringObject } from "util/types";

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

  getIntParam(request: Request, paramName: string, required: boolean = true): number {
    const param = request.params[paramName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required parameter: ${paramName}`);
    }
    const parsedParam = parseInt(param, 10);

    if (required && isNaN(parsedParam)) {
      throw new Error(`Invalid parameter type: ${paramName}. Expected integer.`);
    }

    return parsedParam;
  }

  getFloatParam(request: Request, paramName: string, required: boolean = true): number {
    const param = request.params[paramName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required parameter: ${paramName}`);
    }
    const parsedParam = parseFloat(param);

    if (required && isNaN(parsedParam)) {
      throw new Error(`Invalid parameter type: ${paramName}. Expected float.`);
    }

    return parsedParam;
  }

  getFloatQueryParam(request: Request, paramName: string, required: boolean = true): number {
    const param = request.query[paramName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required query parameter: ${paramName}`);
    }

    let parsedParam: any = param

    if (typeof param === 'string') {
      parsedParam = parseFloat(param);
    }

    if (required && isNaN(parsedParam)) {
      throw new Error(`Invalid query parameter type: ${paramName}. Expected float.`);
    }

    return parsedParam!;
  }

  getStringQueryParam(request: Request, paramName: string, required: boolean = true): string {
    const param = request.query[paramName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required query parameter: ${paramName}`);
    }

    let parsedParam: any = param

    if (required && typeof parsedParam === undefined) {
      throw new Error(`Invalid query parameter type: ${paramName}. Expected string.`);
    }

    return parsedParam!;
  }

  getStringParam(request: Request, paramName: string, required: boolean = true): string {
    const param = request.params[paramName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required parameter: ${paramName}`);
    }

    if (required && typeof param !== 'string') {
      throw new Error(`Invalid parameter type: ${paramName}. Expected string.`);
    }

    return param;
  }

  getIntBodyAtt(request: Request, attributeName: string, required: boolean = true): number {
    const param = request.body[attributeName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required parameter: ${attributeName}`);
    }
    const parsedParam = parseInt(param, 10);

    if (required && isNaN(parsedParam)) {
      throw new Error(`Invalid parameter type: ${attributeName}. Expected integer.`);
    }

    return parsedParam;
  }

  getFloatBodyAtt(request: Request, attributeName: string, required: boolean = true): number | undefined {
    const param = request.body[attributeName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required parameter: ${attributeName}`);
    }
    let parsedParam: number = parseFloat(param);

    if (required && isNaN(parsedParam)) {
      throw new Error(`Invalid parameter type: ${attributeName}. Expected float.`);
    }

    if (!required && isNaN(parsedParam)) {
      return undefined;
    }

    return parsedParam;
  }

  getBoolBodyAtt(request: Request, attributeName: string, required: boolean = true): boolean {
    const param = request.body[attributeName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required parameter: ${attributeName}`);
    }

    if (required && typeof param !== 'boolean') {
      throw new Error(`Invalid parameter type: ${attributeName}. Expected boolean.`);
    }

    return param;
  }

  getStringBodyAtt(request: Request, paramName: string, required = true): string {
    const param = request.body[paramName];

    if (required && typeof param === 'undefined') {
      throw new Error(`Missing required parameter: ${paramName}`);
    }

    if (required && typeof param !== 'string') {
      throw new Error(`Invalid parameter type: ${paramName}. Expected string.`);
    }

    return param;
  }
}

export default AncestralController;