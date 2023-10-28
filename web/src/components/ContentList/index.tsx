import { useState } from "react";
import ContentCard from "./ContentCard";
import { ContentListContainer } from "./styles";
import UpdateForm from "../UpdateForm";

const ContentsList = ({ contentList, isWatchlist }) => {
	const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
	const [contentId, setContentId] = useState<number>();
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
					oldContentStatus={oldContentStatus}
					contentId={contentId}
					setShowUpdateForm={setShowUpdateForm}
				/>
			)}
		</ContentListContainer>
	);
};

export default ContentsList;
