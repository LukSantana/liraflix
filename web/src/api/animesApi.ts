import axios, { AxiosResponse } from "axios";

interface SearchAnimeProps {
	searchQuery: string;
	page: string;
}

export const getBestAnime = async (page: string): Promise<AxiosResponse | undefined> => {
	let url: URL | string = new URL("https://api.jikan.moe/v4/top/anime");

	url.searchParams.set("page", page);
	url.searchParams.set("limit", "2");

	url = url.toString();
	let response: AxiosResponse | undefined;

	await axios.get(url).then((data) => (response = data));

	return response;
};

export const searchAnime = async ({ searchQuery, page }: SearchAnimeProps): Promise<AxiosResponse | undefined> => {
	let url: URL | string = new URL("https://api.jikan.moe/v4/anime");
	
	url.searchParams.set("q", searchQuery);
	url.searchParams.set("page", page);
	url.searchParams.set("limit", "25");
	
	url = url.toString();

	let response: AxiosResponse | undefined;
	await axios.get(url).then((data) => (response = data));

	return response;
};
