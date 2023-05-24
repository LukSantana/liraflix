import { styled } from "styled-components";

export const ContentSkeletonContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%/3, max(64px, 100%/5)), 1fr));
	grid-column-gap: 8px;
	grid-row-gap: 8px;
	padding: 0 2rem;
	box-sizing: border-box;
`;
