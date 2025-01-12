import dotenv from "dotenv";

dotenv.config();

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 9000,
  ENVIRONMENT: process.env.ENVIRONMENT,

  RABBITMQ_URL: process.env.RABBITMQ_URL as string,
};

export default configs;
