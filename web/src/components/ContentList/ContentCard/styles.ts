import styled from "styled-components";
import themes from "../../../themes";

export const ContentCardContainer = styled.div`
	position: relative;
	transition: all 0.1s ease-out;

	&:hover{
		scale(1.1);
	}
`;

export const ContentInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background: RGBA(0, 0, 0, 0.8);
	z-index: 999;
	text-align: center;
	position: absolute;
	padding: 2rem;
	width: 28rem;
	height: 15.8rem;

	@media only screen and ${themes.devices.mobileS} {
		width: 100%;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.laptop} {
		width: 32rem;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.laptopL} {
		width: 28rem;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.desktop} {
		width: 40rem;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.desktopM} {
		width: 37rem;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.desktopL} {
		width: 32rem;
		height: 15.8rem;
	}
`;

export const ContentTitle = styled.h2`
	font-family: "Inter", sans-serif;
	font-size: 20px;
	font-weight: 600;
`;

export const ContentRating = styled.p`
	font-family: "Inter", sans-serif;
	font-size: 16px;
	font-weight: 400;
`;

export const ContentTrailer = styled.iframe`
	width: 28rem;
	height: 15.8rem;
`;

export const ContentBanner = styled.img`
	object-fit: cover;
	z-index: 2;
	width: 28rem;
	height: 15.8rem;

	@media only screen and ${themes.devices.mobileS} {
		width: 100%;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.laptop} {
		width: 32rem;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.laptopL} {
		width: 28rem;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.desktop} {
		width: 40rem;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.desktopM} {
		width: 37rem;
		height: 15.8rem;
	}
	@media only screen and ${themes.devices.desktopL} {
		width: 32rem;
		height: 15.8rem;
	}
`;

export const AddButton = styled.button`
	border: none;
	background-color: ${themes.colors.red};
	font-weight: 600;
	padding: 1rem 2rem;
	font-size: 16px;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.1s ease-out;
	&:hover {
		scale: 1.04;
	}
`;
