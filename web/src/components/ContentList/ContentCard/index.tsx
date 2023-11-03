import { useEffect, useState } from "react";

import { getMovieDataById } from "@api/moviesApi";
import { CircularProgress } from "@mui/material";

import { useAlertContext } from "@context/alertContext";
import { addContentToList, updateContentStatus } from "@api/liraflixApi";
import { ContentProps } from "@src/types/content";
import { MovieProps } from "@src/types/movie";
import { AnimeProps } from "@src/types/anime";
import { translateStatus } from "@utils/translateStatus";
import Button from "@components/Button";
import "@src/styles.css";
import {
	ContentBanner,
	ContentCardContainer,
	ContentInfo,
	ContentRating,
	ContentStatus,
	ContentTitle,
} from "./styles";

export interface ContentCardProps {
	contentProps: AnimeProps & MovieProps & ContentProps;
	isWatchlist?: boolean;
	setShowUpdateForm: (showUpdateForm: boolean) => void;
	setContentId: (contentId: number | string) => void;
	setOldContentStatus: (contentStatus: string) => void;
}

const ContentCard = ({
	contentProps,
	isWatchlist,
	setShowUpdateForm,
	setContentId,
	setOldContentStatus,
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
		let genres = "";
		if (contentProps.genres) {
			contentProps.genres.forEach((genre) => (genres += `${genre.name},`));
		} else if (contentProps.genre_ids) {
			await getMovieDataById(contentProps.id).then((response) =>
				response.data.genres.forEach((genre) => {
					genres += `${genre.name},`;
				})
			);
		}

		const response = await addContentToList({
			contentName,
			contentStatus,
			contentType,
			globalRating: rating,
			genres,
			images,
		});
		if (response) {
			if ("data" in response && response.data && response.data.message) {
				setAlertInfo({ message: response.data.message, type: "warning" });
			}
			setTimeout(
				() =>
					setAlertInfo({
						message: "",
						type: "",
					}),
				3000
			);
		}
		setLoading(false);
	};

	const handleUpdateStatus = async (contentProps: AnimeProps & MovieProps) => {
		setLoading(true);
		const contentId = contentProps.id.toString();

		const response = await updateContentStatus(contentId, "");
		console.log(response);
		if (response) {
			if ("data" in response && response.data && response.data.message) {
				setAlertInfo({ message: response.data.message, type: "warning" });
				setTimeout(
					() =>
						setAlertInfo({
							message: "",
							type: "",
						}),
					3000
				);
			}
		}
		setLoading(false);
	};

	let contentStatus = "";

	useEffect(() => {
		async () => {
			const translatedStatus = await translateStatus(
				contentProps.content_status
			);
			contentStatus = translatedStatus;
		};
	}, []);

	return (
		<ContentCardContainer
			onMouseEnter={() => setToggleContentInfo(true)}
			onMouseLeave={() => setToggleContentInfo(false)}
		>
			{toggleContentInfo && (
				<ContentInfo>
					<ContentTitle>{name}</ContentTitle>
					{contentScore !== 0 && contentScore && (
						<ContentRating>
							Nota: {Number(contentScore).toFixed(2)}
						</ContentRating>
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
						<Button
							onClick={() => {
								setContentId(contentProps.id);
								setOldContentStatus(contentProps.content_status);
								handleUpdateStatus(contentProps);
								setShowUpdateForm(true);
							}}
						>
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
				src={bannerImg !== "null" ? bannerImg : "assets/img/noimage.png"}
			/>
		</ContentCardContainer>
	);
};

export default ContentCard;
