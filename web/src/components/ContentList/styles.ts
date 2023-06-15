import { styled } from "styled-components";
import themes from "../../themes";

export const ContentListContainer = styled.div`
	display: grid;
	padding: 0 2rem;
	box-sizing: border-box;
	justify-items: center;
	width: 100%;

	@media only screen and ${themes.devices.mobileS} {
		grid-template-columns: repeat(1, auto);
		grid-row-gap: 16px;
		grid-column-gap: 4px;
	}
	@media only screen and ${themes.devices.laptop} {
		grid-template-columns: repeat(2, auto);
		grid-row-gap: 8px;
		grid-column-gap: 8px;
	}

	@media only screen and ${themes.devices.laptopL} {
		grid-template-columns: repeat(3, auto);
		grid-row-gap: 8px;
		grid-column-gap: 8px;
	}
	@media only screen and ${themes.devices.desktop} {
		grid-template-columns: repeat(3, auto);
	}
	@media only screen and ${themes.devices.desktopM} {
		grid-template-columns: repeat(4, auto);
	}
	@media only screen and ${themes.devices.desktopL} {
		grid-template-columns: repeat(5, auto);
	}
`;
