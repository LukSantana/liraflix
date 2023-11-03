export const protocol = "http://";
export const localHostPort = import.meta.env.VITE_BASE_API_PORT;
export const liraflixApiBaseUrl = import.meta.env.VITE_BASE_LIRAFLIX_API_BASE_URL;
export const liraflixApiUrl = `${protocol}localhost:${localHostPort}${liraflixApiBaseUrl}`