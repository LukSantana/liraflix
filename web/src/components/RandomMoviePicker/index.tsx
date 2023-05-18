
import {
  Button,
	Icon,
	RandomMoviePickerExternalContainer,
	RandomMoviePickerInternalContainer,
	Title,
} from "./styles";

const RandomMoviePicker = () => {
	return (
		<RandomMoviePickerExternalContainer>
			<RandomMoviePickerInternalContainer>
				<Title>Me escolha algo para assistir!!</Title>
				<Button>
					<Icon src="assets/img/icons/play.png" />
				</Button>
			</RandomMoviePickerInternalContainer>
		</RandomMoviePickerExternalContainer>
	);
};

export default RandomMoviePicker;
