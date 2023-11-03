export const protocol = "http://";
export const localHostPort = import.meta.env.API_PORT;
export const liraflixApiBaseUrl = import.meta.env.LIRAFLIX_API_BASE_URL;
export const liraflixApiUrl = `${protocol}localhost:${localHostPort}${liraflixApiBaseUrl}`
