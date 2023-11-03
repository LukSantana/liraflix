import { styled } from "styled-components";
import themes from "@themes";

export const ButtonWrapper = styled.button`
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
