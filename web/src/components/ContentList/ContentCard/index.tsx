import { useState } from "react";
import { Link } from "react-router-dom";
import { MovieProps } from "../../../types/movie";
import { AnimeProps } from "../../../types/anime";
import {
	ContentBanner,
	ContentCardContainer,
	ContentInfo,
	ContentRating,
	ContentTitle,
} from "./styles";
import "./styles.css";

export interface ContentCardProps {
	contentProps: AnimeProps & MovieProps;
}

const ContentCard = ({ contentProps }: ContentCardProps) => {
	const [toggleContentInfo, setToggleContentInfo] = useState<boolean>();
	const { backdrop_path, title, vote_average, score, trailer, images, url } =
		contentProps;
	const basePosterUrl = import.meta.env.VITE_BASE_POSTER_URL;

	let contentScore: number;
	let bannerImg: string;
	let name: string;
	if (!contentProps.score) {
		contentScore = vote_average;
		bannerImg = `${basePosterUrl}${backdrop_path}`;
		name = title;
	} else {
		contentScore = score;
		bannerImg = trailer.images.maximum_image_url ? trailer.images.maximum_image_url : images.webp.large_image_url;
		name = title;
	}

	return (
		<Link to={url} style={{ color: "inherit" }} className="content_anchor">
			<ContentCardContainer
				onMouseEnter={() => setToggleContentInfo(true)}
				onMouseLeave={() => setToggleContentInfo(false)}
			>
				{toggleContentInfo && (
					<ContentInfo>
						<ContentTitle>{name}</ContentTitle>
						{contentScore !== 0 && contentScore && (
							<ContentRating>Nota: {contentScore.toFixed(2)}</ContentRating>
						)}
					</ContentInfo>
				)}
				<ContentBanner src={!bannerImg.includes('null') ? bannerImg : 'assets/img/noimage.png'} />
			</ContentCardContainer>
		</Link>
	);
};

export default ContentCard;
