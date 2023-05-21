import { useState } from "react";
import { Link } from "react-router-dom";
import { MovieProps } from "../../../types/movie";
import {
	MovieBanner,
	MovieCardContainer,
	MovieInfo,
	MovieRating,
	MovieTitle,
} from "./styles";
import "./styles.css";

export interface MovieCardProps {
	movieProps: MovieProps;
}

const MovieCard = ({ movieProps }: MovieCardProps) => {
	const [toggleMovieInfo, setToggleMovieInfo] = useState<boolean>();
	const { backdrop_path, title, vote_average } = movieProps;
	const basePosterUrl = import.meta.env.VITE_BASE_POSTER_URL;

	return (
		<Link to="" style={{ color: "inherit" }} className="movie_anchor">
			<MovieCardContainer
				onMouseEnter={() => setToggleMovieInfo(true)}
				onMouseLeave={() => setToggleMovieInfo(false)}
			>
				{toggleMovieInfo && (
					<MovieInfo>
						<MovieTitle>{title}</MovieTitle>
						<MovieRating>Nota: {vote_average}</MovieRating>
					</MovieInfo>
				)}
				<MovieBanner src={`${basePosterUrl}${backdrop_path}`} />
			</MovieCardContainer>
		</Link>
	);
};

export default MovieCard;
