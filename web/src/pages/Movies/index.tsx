import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { MoviesContainer } from "./styles";
import ContentList from "../../components/ContentList";
import { popularMoviesApiUrl } from "../../api/moviesApi";
import { MovieProps } from "../../types/movie";
import ContentSkeleton from "../../components/ContentList/ContentSkeleton";

const Movies = () => {
	const bearerToken = import.meta.env.VITE_BEARER_TOKEN_MOVIE_API;
	const [loading, setLoading] = useState<boolean>(true);
	const [movies, setMovies] = useState<MovieProps[]>([]);
	const [searchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1", 10);

	useEffect(() => {
		axios
			.get(popularMoviesApiUrl(page), {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${bearerToken}`,
				},
			})
			.then(({ data }) => setMovies(data.results))
			.then(() => setLoading(false))
			.catch((err: Error) => console.error(err));
	}, []);

	return (
		<MoviesContainer>
			{loading && <ContentSkeleton />}
			{!loading && (
				<>
					<ContentList contentList={movies} />
					<Pagination
						page={page}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "#fff",
							overflow: "hidden",
						}}
						count={10}
						renderItem={(item) => (
							<PaginationItem
								sx={{
									color: "#fff",
									":hover": {
										color: "#e50914",
									},
								}}
								component={Link}
								to={
									!searchParams.get("search")
										? `/movies${item.page === 1 ? "" : `?page=${item.page}`}`
										: `/movies?search=${searchParams}`
								}
								reloadDocument
								{...item}
							/>
						)}
					/>
				</>
			)}
		</MoviesContainer>
	);
};

export default Movies;
