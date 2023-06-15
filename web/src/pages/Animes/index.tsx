import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { AnimesContainer } from "./styles";
import ContentList from "../../components/ContentList";
import { getBestAnime } from "../../api/animesApi";
import ContentSkeleton from "../../components/ContentList/ContentSkeleton";
import { AnimeProps } from "../../types/anime";

const Animes = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [animes, setAnimes] = useState<AnimeProps[]>([]);
	const [searchParams] = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1", 10);

	useEffect(() => {
		getBestAnime(searchParams.get("page")!).then((response) =>
			setAnimes(response.data.data)
		);
		setLoading(false);
	}, []);

	return (
		<AnimesContainer>
			{loading && <ContentSkeleton />}
			{!loading && (
				<>
					<ContentList contentList={animes} />
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
								to={`/animes${item.page === 1 ? "" : `?page=${item.page}`}`}
								reloadDocument
								{...item}
							/>
						)}
					/>
				</>
			)}
		</AnimesContainer>
	);
};

export default Animes;
