import { registerAs } from '@nestjs/config';

export default registerAs('CommonEnv', () => ({
  PORT: process.env.PORT,
  PROJECT_ID: process.env.PROJECT_ID,
  PUB_SUB_TOPIC_ID: process.env.PUB_SUB_TOPIC_ID,
  PUB_SUB_SUBSCRIPTION_ID: process.env.PUB_SUB_SUBSCRIPTION_ID,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
}));
