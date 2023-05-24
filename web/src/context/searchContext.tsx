import { createContext, useContext, useState } from "react";
import { AnimeProps } from "../types/anime";
import { MovieProps } from "../types/movie";
import axios from "axios";
import { searchMovie } from "../api/moviesApi";
import { searchAnimeApiUrl } from "../api/animesApi";

export interface SearchContextContent {
	content: Array<MovieProps & AnimeProps> | undefined;
	setContent: any;
	fetchData: (
		searchParams: string | null | undefined,
		page: number | undefined
	) => Promise<Array<MovieProps & AnimeProps>>;
	sortContentByScore: (
		content: Array<MovieProps & AnimeProps> | undefined,
	) => Array<any>;
	filterContentByTitle: (
		content: Array<MovieProps & AnimeProps> | undefined,
		searchParams: string | null | undefined
	) => Array<any>;
}

export const SearchContext = createContext<SearchContextContent>(
	{} as SearchContextContent
);

export const SearchContextProvider = ({ children }) => {
	const bearerToken = import.meta.env.VITE_BEARER_TOKEN_MOVIE_API;
	const [content, setContent] = useState<Array<MovieProps & AnimeProps>>();

	const fetchData = async (
		searchParams: string | null | undefined,
		page: number | undefined
	) => {
		let tempMovies;
		let tempAnimes;

		await axios
			.get(searchMovie(searchParams, page), {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${bearerToken}`,
				},
			})
			.then(({ data }) => (tempMovies = data.results))
			.catch((err: Error) => console.error(err));

		await axios
			.get(searchAnimeApiUrl(searchParams, page), {
				method: "GET",
				headers: {
					accept: "application/json",
				},
			})
			.then(({ data }) => (tempAnimes = data.data))
			.catch((err: Error) => console.error(err));

		return [...tempAnimes, ...tempMovies];
	};

	function sortContentByScore(content): Array<any> {
		return content.sort((a, b) => {
			let propertyA = "score";
			let propertyB = "score";

			if (a[propertyA] === undefined) {
				propertyA = "vote_average";
			}

			if (b[propertyB] === undefined) {
				propertyB = "vote_average";
			}

			return a[propertyA] < b[propertyB] ? 1 : -1;
		});
	}

	function filterContentByTitle(content, searchParams): Array<any> {
		return content.filter((contentInfo) => {
			return contentInfo["title"]
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.toLowerCase()
				.includes(
					searchParams
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.toLowerCase()
				);
		});
	}

	return (
		<SearchContext.Provider
			value={{
				fetchData,
				content,
				setContent,
				sortContentByScore,
				filterContentByTitle,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => useContext(SearchContext);
