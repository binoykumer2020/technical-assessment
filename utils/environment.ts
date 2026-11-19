import dotenv from 'dotenv';

const config = dotenv.config();

if (config.error) {
  throw config.error;
}

const env = config.parsed ?? {};

export const ENV = {
  baseUrl: env.BASE_URL!,
  apiBaseUrl: env.API_BASE_URL!,
  username: env.USERNAME!,
  password: env.PASSWORD!,
  invalidPassword: env.INVALID_PASSWORD!,
};
