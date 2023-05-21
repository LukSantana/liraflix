import styled from "styled-components";

export const MovieCardContainer = styled.div`
	hover: scale(1.1);
	position: relative;
`;

export const MovieInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	background: RGBA(0, 0, 0, 0.8);
	width: 100%;
	height: 100%;
	z-index: 999;
	text-align: center;
	position: absolute;
`;

export const MovieTitle = styled.h2`
	font-family: 'Inter', sans-serif;
	font-size: 20px;
	font-weight: 600;
	
`;

export const MovieRating = styled.p`
	font-family: 'Inter', sans-serif;
	font-size: 16px;
	font-weight: 400;
`;

export const MovieBanner = styled.img`
	width: 100%;
	object-fit: contain;
	z-index: 2;
`;
