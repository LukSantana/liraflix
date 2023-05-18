const apiKey = import.meta.env.VITE_MOVIES_API_KEY

export const popularMoviesApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}?language=pt-BR?page=`