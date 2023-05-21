import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { MoviesContainer } from "./styles";
import MoviesList from "../../components/MoviesList";
import { popularMoviesApiUrl } from "../../api/moviesApi";

const Movies = () => {
	const bearerToken = import.meta.env.VITE_BEARER_TOKEN_MOVIE_API;

	const [movies, setMovies] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1", 10);

	useEffect(() => {
		axios
			.get(popularMoviesApiUrl(searchParams.get("page")), {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${bearerToken}`,
				},
			})
			.then(({ data }) => setMovies(data.results))
			.catch((err: Error) => console.error(err));
	}, [searchParams]);

	return (
		<MoviesContainer>
			<MoviesList moviesList={movies} />
			<Pagination
				page={page}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					color: "#fff",
					overflow: "hidden"
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
						to={`/movies${item.page === 1 ? "" : `?page=${item.page}`}`}
						{...item}
					/>
				)}
			/>
		</MoviesContainer>
	);
};

export default Movies;
