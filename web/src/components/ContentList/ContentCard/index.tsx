import { useState } from "react";
import { MovieProps } from "../../../types/movie";
import { AnimeProps } from "../../../types/anime";
import {
	ContentBanner,
	ContentCardContainer,
	ContentInfo,
	ContentRating,
	ContentStatus,
	ContentTitle,
} from "./styles";
import "./styles.css";
import {
	addContentToList,
	updateContentStatus,
} from "../../../api/liraflixApi";
import { getMovieDataById } from "../../../api/moviesApi";
import { CircularProgress } from "@mui/material";
import { useAlertContext } from "../../../context/alertContext";
import { ContentProps } from "../../../types/content";
import Button from "../../Button";

export interface ContentCardProps {
	contentProps: AnimeProps & MovieProps & ContentProps;
	isWatchlist?: boolean;
	showUpdateForm: boolean;
	setShowUpdateForm: any;
}

const ContentCard = ({
	contentProps,
	isWatchlist,
	showUpdateForm,
	setShowUpdateForm,
}: ContentCardProps) => {
	const [toggleContentInfo, setToggleContentInfo] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>();
	const { backdrop_path, title, vote_average, score, trailer, images } =
		contentProps;
	const basePosterUrl = import.meta.env.VITE_BASE_POSTER_URL;
	const { setAlertInfo } = useAlertContext();

	let contentScore: number;
	let bannerImg: string;
	let name: string;
	let contentType: string;
	if (contentProps.broadcast) {
		contentType = "Anime";
		contentScore = vote_average;
		bannerImg = `${basePosterUrl}${backdrop_path}`;
		name = title;
	} else if (contentProps.score) {
		contentType = "Movie";
		contentScore = score;
		bannerImg = trailer.images.maximum_image_url
			? trailer.images.maximum_image_url
			: images.webp.large_image_url;
		name = title;
	} else {
		contentType = "Anime";
		contentScore = contentProps.global_rating;
		bannerImg = contentProps.images;
		name = contentProps.name;
	}

	const handleAddContent = async (contentProps: AnimeProps & MovieProps) => {
		setLoading(true);
		const contentName = contentProps.title;
		const contentStatus = "Plan to Watch";
		const rating = contentProps.vote_average || contentProps.score;
		const images =
			contentProps.images?.webp?.image_url ||
			`${basePosterUrl}/${contentProps.poster_path}`;
		const genres: Array<string> = [];
		if (contentProps.genres) {
			contentProps.genres.forEach((genre) => genres.push(genre.name));
		} else if (contentProps.genre_ids) {
			await getMovieDataById(contentProps.id).then((response) =>
				response.data.genres.forEach((genre) => {
					genres?.push(genre.name);
				})
			);
		}

		const response = await addContentToList(
			contentName,
			contentStatus,
			contentType,
			rating,
			genres,
			images
		);
		if (response.message) {
			setAlertInfo({ message: response.message, type: "warning" });
		}
		setTimeout(
			() =>
				setAlertInfo({
					message: "",
					type: "",
				}),
			3000
		);
		setLoading(false);
	};

	const handleUpdateStatus = async (contentProps: AnimeProps & MovieProps) => {
		setLoading(true);
		const contentId = contentProps.id.toString();

		const response = await updateContentStatus(contentId, "");
		if (response.message) {
			setAlertInfo({ message: response.message, type: "warning" });
		}
		setTimeout(
			() =>
				setAlertInfo({
					message: "",
					type: "",
				}),
			3000
		);
		setLoading(false);
	};

	let contentStatus;

	switch (contentProps.content_status) {
		case "0755b68e-e00d-4e1c-a631-38d81e48cc19": {
			contentStatus = "Em espera";
			break;
		}
		case "07be2da2-00f9-4501-a129-9cb5b3f3f5c9": {
			contentStatus = "Assistindo";
			break;
		}
		case "ce6969fb-530f-4273-9518-eafe4d17f977": {
			contentStatus = "Droppado";
			break;
		}
		case "da3cea2f-4d6f-461c-832c-4047cc550ba1": {
			contentStatus = "Planeja Assistir";
			break;
		}
		case "df4b8791-8750-4956-88ba-a2c241c16914": {
			contentStatus = "Assistido";
			break;
		}
		default: {
			contentStatus = "Não foi possível recuperar o status";
		}
	}

	return (
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
					{isWatchlist && (
						<ContentStatus>Status: {contentStatus}</ContentStatus>
					)}
					{!isWatchlist ? (
						<Button onClick={() => handleAddContent(contentProps)}>
							{loading ? (
								<CircularProgress sx={{ color: "#fff;" }} />
							) : (
								"Adicionar à Lista"
							)}
						</Button>
					) : (
						<Button onClick={() => setShowUpdateForm(!!showUpdateForm)}>
							{loading ? (
								<CircularProgress sx={{ color: "#fff;" }} />
							) : (
								"Atualizar Status"
							)}
						</Button>
					)}
				</ContentInfo>
			)}
			<ContentBanner
				src={!bannerImg.includes("null") ? bannerImg : "assets/img/noimage.png"}
			/>
		</ContentCardContainer>
	);
};

export default ContentCard;
