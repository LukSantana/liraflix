export const bestAnimeApiUrl = (page) => `https://api.jikan.moe/v4/top/anime?page=${page}&limit=25`;

export const searchAnimeApiUrl = (searchQuery, page) => `https://api.jikan.moe/v4/anime?q=${searchQuery}&page=${page}&limit=25`