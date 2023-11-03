import styled from "styled-components";

export const ContentCardContainer = styled.div`
	position: relative;
	transition: all 0.1s ease-out;
	border-radius: 8px;
	`;

export const ContentInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background: RGBA(0, 0, 0, 0.8);
	border-radius: 8px;
	z-index: 999;
	text-align: center;
	position: absolute;
	box-sizing: border-box;
	height: 99.4%;
	width: 100%;
`;

export const ContentInfoText = styled.span`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin: 0rem 1rem;
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

export const ContentStatus = styled.p`
	font-family: "Inter", sans-serif;
	font-size: 16px;
	font-weight: 600;
`;

export const ContentTrailer = styled.iframe`
	width: 28rem;
	height: 15.8rem;
`;

export const ContentBanner = styled.img`
	object-fit: cover;
	z-index: 2;
	width: 100%;
	height: 15.8rem;
	border-radius: 8px;
`;

export const ButtonContainer = styled.div`
	margin: 0.5rem 1rem;
`;

