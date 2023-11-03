import { useState } from "react";

import ContentCard from "@components/ContentList/ContentCard";
import UpdateForm from "@components/UpdateForm";
import { ContentListContainer } from "./styles";

interface ContentListProps {
	contentList: any[];
	isWatchlist?: boolean;
}

const ContentsList = ({ contentList, isWatchlist }: ContentListProps) => {
	const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
	const [contentId, setContentId] = useState<string | number>();
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
					setOldContentStatus={setOldContentStatus}
				/>
			))}
			{showUpdateForm && (
				<UpdateForm
					oldContentStatus={oldContentStatus!}
					contentId={contentId!}
					setShowUpdateForm={setShowUpdateForm}
				/>
			)}
		</ContentListContainer>
	);
};

export default ContentsList;
