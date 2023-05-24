export const popularMoviesApiUrl = (page) => `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=${page}`;

export const searchMovie = (searchQuery, page) => `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=pt-BR&page=${page}`