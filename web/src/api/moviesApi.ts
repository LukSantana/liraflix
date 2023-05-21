const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

export const popularMoviesApiUrl = (page) => `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`;