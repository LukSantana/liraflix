import { useState } from "react";

import ContentCard from "@components/ContentList/ContentCard";
import UpdateForm from "@components/UpdateForm";
import { ContentListContainer } from "./styles";
import { AnimeProps } from "@src/types/anime";
import { MovieProps } from "@src/types/movie";
import { ContentProps } from "@src/types/content";

interface ContentListProps {
	contentList: Array<AnimeProps & MovieProps & ContentProps>;
	isWatchlist?: boolean;
}

const ContentList = ({ contentList, isWatchlist }: ContentListProps) => {
	const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
	const [contentId, setContentId] = useState<string | number>();
	const [content, setContent] = useState<ContentProps>();
	const [oldContentStatus, setOldContentStatus] = useState<string>();

	return (
		<ContentListContainer>
			{contentList.map((content) => (
				<ContentCard
					key={content?.id || content?.mal_id}
					contentProps={content}
					isWatchlist={isWatchlist}
					setShowUpdateForm={setShowUpdateForm}
					setContentId={setContentId}
					content={content}
					setContent={setContent}
					setOldContentStatus={setOldContentStatus}
				/>
			))}
			{showUpdateForm && (
				<UpdateForm
					content={content!}
					oldContentStatus={oldContentStatus!}
					contentId={contentId!}
					setShowUpdateForm={setShowUpdateForm}
				/>
			)}
		</ContentListContainer>
	);
};

export default ContentList;
