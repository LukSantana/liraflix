import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper';
import "swiper/css";
import { CarouselImage } from "./styles";

export interface imgListProps {
	imgList: Array<{
		imgUrl: string;
	}>;
}

const Carousel = ({ imgList }: imgListProps) => {
	return (
		<Swiper
			spaceBetween={50}
      centeredSlides={true}
			parallax
			autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
			slidesPerView={1}
			style={{
				width: "100%",
			}}
			effect="fade"
      enabled
      loop
      modules={[Autoplay]}
		>
			{imgList.map((img) => (
				<SwiperSlide style={{ width: "100%" }} key={img.imgUrl}>
					<CarouselImage src={img.imgUrl} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Carousel;
