import { registerAs } from '@nestjs/config';

export default registerAs('CommonEnv', () => ({
  PORT: process.env.PORT,
  PROJECT_ID: process.env.PROJECT_ID,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
}));
