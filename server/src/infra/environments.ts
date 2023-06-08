import dotenv from 'dotenv';
dotenv.config()

export const serverPort = process.env.SERVER_PORT;
export const APP_ROUTER_PREFIX = '/liraflix/api/v1';