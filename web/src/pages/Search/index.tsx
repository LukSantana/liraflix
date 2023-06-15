import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";

import { SearchPageContainer } from "./styles";
import ContentList from "../../components/ContentList";
import { useSearchContext } from "../../context/searchContext";
import { MovieProps } from "../../types/movie";
import { AnimeProps } from "../../types/anime";
import NoContentWarning from "../../components/ContentList/NoContentWarning";
import ContentSkeleton from "../../components/ContentList/ContentSkeleton";
import themes from "../../themes";

const Search = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [noContent, setNoContent] = useState<boolean>(false);
	const [params] = useSearchParams();
	const searchParams = params.get("search");

	const page = params.get("page") || "1";
	const { content } = useSearchContext();
	useState<Array<MovieProps & AnimeProps>>();
	const { fetchData, sortContentByScore, setContent, filterContentByTitle } =
		useSearchContext();

	const getData = async () => {
		const tempData = sortContentByScore(
			filterContentByTitle(await fetchData(searchParams, page), searchParams)
		);

		setContent(tempData);

		if (!tempData.length) {
			setNoContent(true);
		}

		setLoading(false);

		return tempData;
	};

	useEffect(() => {
		getData();
	}, [searchParams]);

	return (
		<SearchPageContainer>
			{loading && <ContentSkeleton />}
			{noContent && <NoContentWarning />}
			{!noContent && content !== undefined && (
				<>
					<ContentList contentList={content} />
					<Pagination
						page={parseInt(page)}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "#fff",
							overflow: "hidden",
						}}
						count={content.length < 20 ? 1 : 10}
						renderItem={(item) => (
							<PaginationItem
								sx={{
									color: "#fff",
									":hover": {
										color: themes.colors.red,
									},
								}}
								component={Link}
								to={`/search?search=${searchParams}${
									item.page === 1 ? "" : `&page=${item.page}`
								}`}
								reloadDocument
								{...item}
							/>
						)}
					/>
				</>
			)}
		</SearchPageContainer>
	);
};

export default Search;
