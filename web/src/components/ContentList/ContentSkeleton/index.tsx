import { ContentSkeletonContainer } from "./styles";
import { Skeleton } from "@mui/material";

const ContentSkeleton = () => {
	const skeletonCardsNumbers = 20;

	return (
		<ContentSkeletonContainer>
			{[...Array(skeletonCardsNumbers)].map((skeletonCard, index) => (
				<Skeleton variant="rounded" width="1fr" height="12rem" key={'skeleton' + index}/>
			))}
		</ContentSkeletonContainer>
	);
};

export default ContentSkeleton;
