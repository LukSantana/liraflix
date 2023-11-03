import { Skeleton } from "@mui/material";

import { ContentSkeletonContainer } from "./styles";

const ContentSkeleton = () => {
	const skeletonCardsNumbers = 20;

	return (
		<ContentSkeletonContainer>
			{[...Array(skeletonCardsNumbers)].map((_skeletonCard, index) => (
				<Skeleton
					variant="rounded"
					width="1fr"
					height="12rem"
					key={"skeleton" + index}
				/>
			))}
		</ContentSkeletonContainer>
	);
};

export default ContentSkeleton;
