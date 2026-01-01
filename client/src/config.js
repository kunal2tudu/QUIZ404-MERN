// config.js
// Dynamically determine the API URL based on the environment

const getApiUrl = () => {
    // If we are in development (Vite sets this automatically)
    if (import.meta.env.DEV) {
        return 'http://localhost:5000';
    }
    // In production (Vercel), proper routing lets us use relative paths
    // OR we can rely on the proxy if set up differently.
    // For Vercel + Express serverless, usage is often same-domain.
    return '';
};

export const API_BASE_URL = getApiUrl();
