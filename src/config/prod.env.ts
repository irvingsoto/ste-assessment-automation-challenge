import dotenv from "dotenv";

dotenv.config();

export const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
export const userName = process.env.USER_NAME ?? "defaultUser";
export const userPassword = process.env.PASSWORD ?? "defaultPass";