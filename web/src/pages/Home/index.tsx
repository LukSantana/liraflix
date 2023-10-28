import Carousel from "../../components/Carousel";
import RandomMoviePicker from "../../components/RandomMoviePicker";
import { imgList } from "../../utils/bannerImgList";
import { HomeContainer } from "./styles";

const Home = () => {
	return (
		<HomeContainer>
			<Carousel imgList={imgList} />
			<RandomMoviePicker />
		</HomeContainer>
	);
};

export default Home;
