import { useState } from "react";
import { getRandomContent } from "../../api/liraflixApi";
import {
	Button,
	RandomMoviePickerExternalContainer,
	RandomMoviePickerInternalContainer,
	Title,
} from "./styles";
import ContentCard from "../ContentList/ContentCard";
import UpdateForm from "../UpdateForm";
import { PlayCircle } from "@mui/icons-material";
import themes from "../../themes";

const RandomMoviePicker = () => {
	const [randomContent, setRandomContent] = useState();
	const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
	const [contentId, setContentId] = useState<number>();
	const [oldContentStatus, setOldContentStatus] = useState<string>();

	const handleGetRandomContent = async () => {
		const response = await getRandomContent();
		setRandomContent(response?.data);
	};

	return (
		<RandomMoviePickerExternalContainer>
			<RandomMoviePickerInternalContainer>
				<Title>Me escolha algo para assistir!!</Title>
				{!randomContent ? (
					<PlayCircle
						sx={{
							fontSize: "6rem",
							color: themes.colors.red,
							cursor: "pointer",
							transition: "ease-in-out 0.1s",
							":hover": {
								transform: "scale(1.1)",
							},
						}}
						onClick={handleGetRandomContent}
					/>
				) : (
					<>
						<ContentCard
							isWatchlist={false}
							contentProps={randomContent}
							setShowUpdateForm={setShowUpdateForm}
							setContentId={setContentId}
							setOldContentStatus={setOldContentStatus}
						/>
						{showUpdateForm && (
							<UpdateForm
								oldContentStatus={oldContentStatus}
								contentId={contentId}
								setShowUpdateForm={setShowUpdateForm}
							/>
						)}
						<Button onClick={handleGetRandomContent}>
							Gerar novo conteúdo
						</Button>
					</>
				)}
			</RandomMoviePickerInternalContainer>
		</RandomMoviePickerExternalContainer>
	);
};

export default RandomMoviePicker;
