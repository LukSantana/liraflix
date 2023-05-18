import Carousel from "../../components/Carousel";
import RandomMoviePicker from "../../components/RandomMoviePicker";
import { imgList } from "../../utils/bannerImgList";

const Home = () => {
	return (
		<>
			<Carousel imgList={imgList} />
			<RandomMoviePicker />
		</>
	);
};

export default Home;
