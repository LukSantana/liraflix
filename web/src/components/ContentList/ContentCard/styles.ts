import styled from "styled-components";

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
	width: 28rem;
	height: 15.8rem;
	z-index: 999;
	text-align: center;
	position: absolute;
	padding: 2rem;
`;

export const ContentTitle = styled.h2`
	font-family: 'Inter', sans-serif;
	font-size: 20px;
	font-weight: 600;
	
`;

export const ContentRating = styled.p`
	font-family: 'Inter', sans-serif;
	font-size: 16px;
	font-weight: 400;
`;

export const ContentTrailer = styled.iframe`
	width: 28rem;
	height: 15.8rem;
`;

export const ContentBanner = styled.img`
	width: 28rem;
	height: 15.8rem;
	object-fit: cover;
	z-index: 2;
`;
