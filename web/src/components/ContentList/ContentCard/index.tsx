import { useEffect, useState } from "react";

import { getMovieDataById } from "@api/moviesApi";
import { CircularProgress } from "@mui/material";

import { useAlertContext } from "@context/alertContext";
import { addContentToList, updateContentStatus } from "@api/liraflixApi";
import { ContentProps } from "@src/types/content";
import { MovieProps } from "@src/types/movie";
import { AnimeProps } from "@src/types/anime";
import { translateStatusIdToName } from "@utils/translateStatus";
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
import { AxiosResponse } from "axios";
import { Content } from "@src/models/Content";

export interface ContentCardProps {
	contentProps: AnimeProps & MovieProps & ContentProps;
	isWatchlist?: boolean;
	setShowUpdateForm: any;
	setContentId: any;
	content: ContentProps;
	setContent: any;
	setOldContentStatus: any;
}

const ContentCard = ({
	contentProps,
	isWatchlist,
	setShowUpdateForm,
	setContentId,
	content,
	setContent,
	setOldContentStatus,
}: ContentCardProps) => {
	const { setAlertInfo } = useAlertContext();

	const [toggleContentInfo, setToggleContentInfo] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>();
	const [genres, setGenres] = useState<Array<string>>([]);
	const [globalRating, setGlobalRating] = useState<string>("");
	const [personalRating, setPersonalRating] = useState<string | null>(null);
	const [contentType, setContentType] = useState<string>("");
	const [contentName, setContentName] = useState<string>("");
	const [contentImage, setContentImage] = useState<string>("");
	const [contentStatusName, setContentStatusName] = useState<string>("");

	const basePosterUrl = import.meta.env.VITE_BASE_POSTER_URL;

	const handleAddContent = async (
		contentProps: AnimeProps & MovieProps & ContentProps
	) => {
		setLoading(true);
		const contentStatus = "Plan to Watch";
		const images =
			contentProps.images?.webp?.image_url ||
			`${basePosterUrl}/${contentProps.poster_path}`;
		let genres = "";
		if (contentProps.genres) {
			contentProps.genres.forEach((genre) => (genres += `${genre.name},`));
		} else if (contentProps.genre_ids) {
			await getMovieDataById(contentProps.id).then(
				(response: AxiosResponse | undefined) =>
					response?.data.genres.forEach((genre) => {
						genres += `${genre.name},`;
					})
			);
		}

		const response = await addContentToList({
			contentName,
			contentStatus,
			contentType,
			globalRating,
			genres,
			images,
		});

		if (response) {
			if (response.message) {
				setAlertInfo({ message: response.message, type: "warning" });
			} else {
				setAlertInfo({
					message: "Conteúdo adicionado com sucesso!",
					type: "success",
				});
			}
		}
		setLoading(false);
	};

	const getGenresName = async () =>
		await getMovieDataById(contentProps.id).then(
			(response: AxiosResponse | undefined) =>
				response?.data.genres.map((genre) => genre.name)
		);

	const translateStatusName = async () => {
		if (!content) return;
		if (!content.content_status) return;
		const contentStatusName = await translateStatusIdToName(
			content.content_status
		);
		if (contentStatusName) setContentStatusName(contentStatusName);
	};

	useEffect(() => {
		const isPublicAnime = contentProps.broadcast;
		const isPublicMovie = contentProps.score || contentProps.poster_path;

		if (isPublicAnime) {
			const content = new Content({
				content_type: "Anime",
				genres: contentProps.genres.map((theme: any) => theme.name),
				global_rating: parseFloat(contentProps.score?.toFixed(2)),
				name: contentProps.title,
				personal_rating: null,
				images: contentProps.images.jpg.image_url,
			});
			setContentType(content.contentType);
			setGlobalRating(content.globalRating.toString());
			setContentImage(content.images);
			setContentName(content.name);
		} else if (isPublicMovie) {
			const fetchData = async () => {
				setGenres(await getGenresName());
			};

			fetchData();

			const content = new Content({
				content_type: "Movie",
				genres: genres,
				global_rating: parseFloat(contentProps.vote_average?.toFixed(2)),
				name: contentProps.title,
				personal_rating: null,
				images: `${basePosterUrl}${contentProps?.poster_path}`,
			});
			setContentType(content.contentType);
			setGlobalRating(content.globalRating.toString());
			setContentImage(content.images);
			setContentName(content.name);
		} else {
			const content = new Content({
				content_type: contentProps.content_type,
				genres: contentProps.genres,
				global_rating: contentProps.global_rating,
				name: contentProps.name,
				personal_rating: contentProps.personal_rating
					? contentProps.personal_rating
					: null,
				images: contentProps.images,
				content_status: contentProps.content_status,
				creation_timestamp: contentProps.creation_timestamp,
				id: contentProps.id,
				record_timestamp: contentProps.record_timestamp,
			});

			setContent(content);
			setContentType(content.contentType);
			setGlobalRating(content.globalRating.toString());
			setPersonalRating(
				content.personal_rating ? content.personal_rating.toString() : null
			);
			setContentImage(content.images);
			setContentName(content.name);
			translateStatusName();
		}
	}, [contentProps]);

	return (
		<ContentCardContainer
			onMouseEnter={() => setToggleContentInfo(true)}
			onMouseLeave={() => setToggleContentInfo(false)}
		>
			{toggleContentInfo && (
				<ContentInfo>
					<ContentInfoText>
						<ContentTitle>{contentName}</ContentTitle>
						{globalRating && (
							<ContentRating>
								Nota Global: {Number(globalRating).toFixed(2)}
							</ContentRating>
						)}
						{personalRating && (
							<ContentRating>
								Nota Pessoal: {Number(personalRating).toFixed(2)}
							</ContentRating>
						)}
						{isWatchlist && (
							<ContentStatus>
								Status: {contentStatusName ? contentStatusName : "Não definido"}
							</ContentStatus>
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
									if (!content) return;
									setContentId(content.id);
									setOldContentStatus(content.content_status);
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
