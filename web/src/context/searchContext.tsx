import { createContext, useContext, useState } from "react";
import { AnimeProps } from "../types/anime";
import { MovieProps } from "../types/movie";
import { searchMovie } from "../api/moviesApi";
import { searchAnime } from "../api/animesApi";

export interface SearchContextContent {
	content: Array<MovieProps & AnimeProps> | undefined;
	setContent: any;
	fetchData: (
		searchParams: string | null | undefined,
		page: string | undefined
	) => Promise<Array<MovieProps & AnimeProps>>;
	sortContentByScore: (
		content: Array<MovieProps & AnimeProps> | undefined
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
	const [content, setContent] = useState<Array<MovieProps & AnimeProps>>();

	const fetchData = async (
		searchParams: string | null | undefined,
		page: string | undefined
	) => {
		if (page === undefined) {
			page = "1";
		}

		const tempMovies = searchMovie(searchParams!, page);
		const tempAnimes = searchAnime(searchParams!, page);

		return [...(await tempAnimes), ...(await tempMovies)];
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
