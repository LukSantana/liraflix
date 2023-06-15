import ContentCard from "./ContentCard";
import { ContentListContainer } from "./styles";

const ContentsList = ({ contentList }) => {
	return (
		<ContentListContainer>
			{contentList.map(content => (
				<ContentCard
					key={content?.id || content?.mal_id}
					contentProps={content}
				/>
			))}
		</ContentListContainer>
	);
};

export default ContentsList;
