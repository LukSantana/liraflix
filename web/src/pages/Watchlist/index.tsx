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
import { ContentWrapper } from "../styles";
import { getPageParam } from "@src/utils/getPageParam";

const Watchlist = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [content, setContent] = useState<MovieProps[]>([]);
	const [searchParams] = useSearchParams();
	const {page} = getPageParam(searchParams);

	useEffect(() => {
		getContent({ page }).then((response) => {
			setContent(response?.data);
			setLoading(false);
		});
	}, []);

	return (
		<WatchlistContainer>
			{loading && <ContentSkeleton />}
			{!loading && (
				<ContentWrapper>
					<ContentList contentList={content} isWatchlist={true} />
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
										color: themes.colors.red,
									},
								}}
								component={Link}
								to={
									!searchParams.get("search")
										? `/watchlist${item.page === 1 ? "" : `?page=${item.page}`}`
										: `/watchlist?search=${searchParams}`
								}
								reloadDocument
								{...item}
							/>
						)}
					/>
				</ContentWrapper>
			)}
		</WatchlistContainer>
	);
};

export default Watchlist;
