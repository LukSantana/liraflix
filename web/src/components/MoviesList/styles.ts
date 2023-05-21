import { styled } from "styled-components";

export const MoviesListContainer = styled.div`
	margin-top: 6rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(5, 1fr);
	grid-column-gap: 8px;
	grid-row-gap: 8px;
	padding: 2rem;
	box-sizing: border-box;
`;
