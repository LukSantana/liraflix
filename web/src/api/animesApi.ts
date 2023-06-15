import axios from "axios";

export const getBestAnime = async (page: string) => {
	let url: URL | string = new URL("https://api.jikan.moe/v4/top/anime");
	url.searchParams.set("page", page);
	url.searchParams.set("limit", "25");

	url = url.toString();
	let response;

	await axios.get(url).then((data) => (response = data));

	return response;
};

export const searchAnime = async (searchQuery: string, page: string) => {
	let url: URL | string = new URL("https://api.jikan.moe/v4/anime");
	url.searchParams.set("q", searchQuery);
	url.searchParams.set("page", page);
	url.searchParams.set("limit", "25");
	url = url.toString();
	let response;
	await axios.get(url).then((data) => (response = data));

	return response;
};
