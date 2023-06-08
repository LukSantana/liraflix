export const bestAnimeApiUrl = (page: string) => {
	const url = new URL("https://api.jikan.moe/v4/top/anime");
	url.searchParams.set("page", page);
	url.searchParams.set("limit", "25");

	return url.toString();
};

export const searchAnimeApiUrl = (searchQuery: string, page: string) => {
	const url = new URL("https://api.jikan.moe/v4/anime");
	url.searchParams.set("q", searchQuery);
	url.searchParams.set("page", page);
	url.searchParams.set("limit", "25");

	return url.toString();
};
