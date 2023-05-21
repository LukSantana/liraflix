import MovieCard from "./MovieCard";
import { MoviesListContainer } from "./styles";

const MoviesList = ({ moviesList }) => {
	return (
		<MoviesListContainer>
			{moviesList.map((movie) => (
				<MovieCard key={movie.id} movieProps={movie} />
			))}
			
		</MoviesListContainer>
	);
};

export default MoviesList;
