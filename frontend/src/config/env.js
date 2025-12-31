// Frontend environment configuration
// Note: import.meta.env variables are available at runtime in Vite, not during direct node execution
const config = {
  // API URL - use /api for dev proxy, or set VITE_API_URL in .env
  apiUrl: typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL 
    ? import.meta.env.VITE_API_URL 
    : 'http://localhost:5000',
  
  appName: typeof import.meta !== 'undefined' && import.meta.env?.VITE_APP_NAME 
    ? import.meta.env.VITE_APP_NAME 
    : 'Task Manager App',
  
  appVersion: typeof import.meta !== 'undefined' && import.meta.env?.VITE_APP_VERSION 
    ? import.meta.env.VITE_APP_VERSION 
    : '1.0.0',
  
  isDevelopment: typeof import.meta !== 'undefined' && import.meta.env?.DEV,
  isProduction: typeof import.meta !== 'undefined' && import.meta.env?.PROD,
};

export default config;
