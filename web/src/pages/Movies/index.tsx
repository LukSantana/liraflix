import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "api";

const Movies = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
    const movieApi = api("@themoviedb/v3#5pyq71plhaq40n6");
		movieApi.auth('Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2Q2Y2VhNjYwYTA3NGNmMzkyMzkzYTFkZTg5ZTdlZiIsInN1YiI6IjY0NjZhOTQ2YTUwNDZlMDEwNThhOTRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tiF4AUa7u03JK9UW31byvqCs1VCENdziy1wMiR6VsDM');
		movieApi
			.moviePopularList({ language: "pt-BR", page: searchParams.get('page') })
			.then(({ data }) => console.log(data))
			.catch((err) => console.error(err));
	}, []);

	return <div>Movies</div>;
};

export default Movies;
