import { registerAs } from '@nestjs/config';

export default registerAs('authEnv', () => ({
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL,
  AUTH_URI: process.env.AUTH_URI,
}));
