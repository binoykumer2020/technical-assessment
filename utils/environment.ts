import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  baseUrl: process.env.BASE_URL!,
  apiBaseUrl: process.env.API_BASE_URL!,
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,
  invalidPassword: process.env.INVALID_PASSWORD!,
};


