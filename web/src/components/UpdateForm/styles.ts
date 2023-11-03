import { styled } from "styled-components";
import themes from "@themes";

export const Overlay = styled.div`
	position: absolute;
	top: 0;
	z-index: 9999999999999999;
	width: 100dvw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.6);
`;

export const UpdateFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 4rem;
	padding: 5rem;
	border-radius: 8px;
	background-color: ${themes.colors.darkGray};
`;

export const UpdateFormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 80%;
	height: 80%;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	border-radius: 8px;
	padding: 1rem;
`;

export const FormTitle = styled.h1`
	font-size: 28px;
	text-transform: uppercase;
	font-weight: 600;
	text-align: center;
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 8px;
`;

export const Label = styled.label`
	font-weight: 600;
	color: #fff;
`;

export const Select = styled.select`
	border-radius: 4px;
	border: 1px solid #a6a6a6;
	padding: 0.8rem 0.6rem;
	font-size: 16px;
`;

export const Option = styled.option`
	border-radius: 6px;
	padding: 8px 0;

	&:hover {
		background-color: #5a5a5a;
	}
`;
