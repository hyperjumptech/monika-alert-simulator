import dotenv from 'dotenv';

// Get environment variables
dotenv.config();

const config = {
  port: parseInt(process.env.PORT as string, 10) || 8000,
  host: process.env.HOST || '0.0.0.0',
  environment: process.env.NODE_ENV || 'development'
};

export default config;
