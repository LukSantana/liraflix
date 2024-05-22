import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";

import ContentList from "@components/ContentList";
import ContentSkeleton from "@components/ContentList/ContentSkeleton";
import { getBestAnime } from "@api/animesApi";
import { AnimeProps } from "@src/types/anime";

import { AnimesContainer } from "./styles";
import { getPageParam } from "@src/utils/getPageParam";

const Animes = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [animes, setAnimes] = useState<AnimeProps[]>([]);
	const [searchParams] = useSearchParams();
	const {page, pageParam} = getPageParam(searchParams)
	
	useEffect(() => {
		getBestAnime(pageParam!).then((response) => {
			setAnimes(response?.data.data);
			setLoading(false);
		});
	}, []);

	return (
		<AnimesContainer>
			{loading && <ContentSkeleton />}
			{!loading && (
				<>
					<ContentList contentList={animes} isWatchlist={false} />
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
