import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";

import { MovieProps } from "@src/types/movie";
import { getContent } from "@api/liraflixApi";
import ContentList from "@components/ContentList";
import ContentSkeleton from "@components/ContentList/ContentSkeleton";

import themes from "@themes";

import { WatchlistContainer } from "./styles";

const Watchlist = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [content, setContent] = useState<MovieProps[]>([]);
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page") || "1";

	useEffect(() => {
		getContent({})
			.then((response) => setContent(response?.data))
			.then(() => setLoading(false));
	}, []);

	return (
		<WatchlistContainer>
			{loading && <ContentSkeleton />}
			{!loading && (
				<>
					<ContentList contentList={content} isWatchlist={true} />
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
		</WatchlistContainer>
	);
};

export default Watchlist;
