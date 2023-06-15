import axios from "axios";

const bearerToken = import.meta.env.VITE_BEARER_TOKEN_MOVIE_API;

export const getPopularMovies = async (page: string) => {
	let url: URL | string = new URL(
		"https://api.themoviedb.org/3/movie/top_rated"
	);
	url.searchParams.set("language", "pt-BR");
	url.searchParams.set("page", page);

	url = url.toString();
	let response;

	await axios
		.get(url, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${bearerToken}`,
			},
		})
		.then((data) => (response = data));

	return response;
};

export const searchMovie = (searchQuery: string, page: string) => {
	let url: URL | string = new URL("https://api.themoviedb.org/3/search/movie");
	url.searchParams.set("query", searchQuery);
	url.searchParams.set("include_adult", "false");
	url.searchParams.set("language", "pt-BR");
	url.searchParams.set("page", page);

	url = url.toString();
	let response;

	axios
		.get(url, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${bearerToken}`,
			},
		})
		.then((data) => (response = data.data));

	return response;
};

export const getMovieDataById = async (id: number) => {
	const url = `https://api.themoviedb.org/3/movie/${id}`

	let response;

	await axios
		.get(url, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${bearerToken}`,
			},
		})
		.then((data) => (response = data));

	return response;
}
