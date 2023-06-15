import { useState } from "react";
import ContentCard from "./ContentCard";
import { ContentListContainer } from "./styles";
import UpdateForm from "../UpdateForm";

const ContentsList = ({ contentList, isWatchlist }) => {
	const [showUpdateForm, setShowUpdateForm] = useState<boolean>(true);

	return (
		<ContentListContainer>
			{contentList.map((content) => (
				<ContentCard
					key={content?.id || content?.mal_id}
					contentProps={content}
					isWatchlist={isWatchlist}
					showUpdateForm={showUpdateForm}
					setShowUpdateForm={setShowUpdateForm}
				/>
			))}
			{showUpdateForm && (
				<UpdateForm contentId={''} />
			)}
		</ContentListContainer>
	);
};

export default ContentsList;
