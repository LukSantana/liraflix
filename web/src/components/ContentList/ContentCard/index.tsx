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
import "./styles.css";
import {
	ButtonContainer,
	ContentBanner,
	ContentCardContainer,
	ContentInfo,
	ContentInfoText,
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
	const { setAlertInfo } = useAlertContext();

	const [toggleContentInfo, setToggleContentInfo] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>();
	const [contentScore, setContentScore] = useState<string>("");
	const [contentType, setContentType] = useState<string>("");
	const [contentName, setContentName] = useState<string>("");
	const [contentImage, setContentImage] = useState<string>("");

	const basePosterUrl = import.meta.env.VITE_BASE_POSTER_URL;

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
		let formattedScore: string;
		async () => {
			const translatedStatus = await translateStatus(
				contentProps.content_status
			);
			contentStatus = translatedStatus;
		};

		if (contentProps.broadcast) {
			setContentType("Anime");
			formattedScore = contentProps.score?.toFixed(2);
			setContentScore(formattedScore);
			setContentImage(contentProps.images.jpg.image_url);
			setContentName(contentProps.title);
		} else if (contentProps.score) {
			setContentType("Movie");
			setContentScore(contentProps.vote_average?.toFixed(2));
			contentProps.trailer.images.maximum_image_url
				? setContentImage(contentProps.trailer.images.maximum_image_url)
				: setContentImage(contentProps.images.webp.large_image_url);
			setContentName(contentProps.title);
		} else if (contentProps.poster_path) {
			setContentType("Movie");
			setContentScore(contentProps.vote_average?.toFixed(2));
			setContentImage(`${basePosterUrl}${contentProps?.poster_path}`);
			setContentName(contentProps.title);
		} else {
			setContentType("Anime");
			setContentScore(contentProps?.global_rating?.toFixed(2));
			setContentImage(contentProps.images);
			setContentName(contentProps.name);
		}
	}, []);

	return (
		<ContentCardContainer
			onMouseEnter={() => setToggleContentInfo(true)}
			onMouseLeave={() => setToggleContentInfo(false)}
		>
			{toggleContentInfo && (
				<ContentInfo>
					<ContentInfoText>
						<ContentTitle>{contentName}</ContentTitle>
						{contentScore !== "0.00" && contentScore && (
							<ContentRating>
								Nota: {Number(contentScore).toFixed(2)}
							</ContentRating>
						)}
						{isWatchlist && (
							<ContentStatus>Status: {contentStatus}</ContentStatus>
						)}
					</ContentInfoText>
					<ButtonContainer>
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
					</ButtonContainer>
				</ContentInfo>
			)}
			<ContentBanner
				src={
					!["null", "undefined"].includes(contentImage!)
						? contentImage
						: "assets/img/noimage.png"
				}
			/>
		</ContentCardContainer>
	);
};

export default ContentCard;
