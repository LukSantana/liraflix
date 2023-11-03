import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";

import ContentList from "@components/ContentList";
import ContentSkeleton from "@components/ContentList/ContentSkeleton";
import { getPopularMovies } from "@api/moviesApi";
import { MovieProps } from "@src/types/movie";
import themes from "@themes";

import { MoviesContainer } from "./styles";

const Movies = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [movies, setMovies] = useState<MovieProps[]>([]);
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page") || "1";

	useEffect(() => {
		getPopularMovies(page)
			.then((response) => setMovies(response.data.results))
			.then(() => setLoading(false));
	}, []);

	return (
		<MoviesContainer>
			{loading && <ContentSkeleton />}
			{!loading && (
				<>
					<ContentList contentList={movies} isWatchlist={false} />
					<Pagination
						page={parseInt(page)}
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
										color: themes.colors.red,
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
