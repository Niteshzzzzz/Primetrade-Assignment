const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];

// Check for required environment variables in production
if (process.env.NODE_ENV === 'production') {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://admin:admin@127.0.0.1:27017/myapp?authSource=admin',
  JWT_SECRET: process.env.JWT_SECRET || 'my_secret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
