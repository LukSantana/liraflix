import styled from "styled-components";
import themes from "../../themes";

export const HeaderContainer = styled.div`
	position: fixed;
	top: 0;
	display: flex;
	align-items: center;
	jutify-content: space-between;
	padding: 0 2rem;
	width: 100%;
	gap: 4rem;
	background: rgb(0, 0, 0);
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.8) 10%,
		rgba(0, 0, 0, 0.6) 50%,
		rgba(0, 0, 0, 0) 100%
	);
	height: 6rem;
	z-index: 9999999999;
`;

export const NavbarContainer = styled.div`
	display: flex;
	gap: 4rem;
	width: 80%;
`;

export const HeaderLogo = styled.img`
	width: 6rem;
	height: 1.7rem;
`;

export const NavList = styled.ul`
	display: flex;
	gap: 4rem;
	align-items: center;
	font-size: 16px;
	font-weight: 500;
	width: 60%;
`;

export const NavItem = styled.li`
	color: #fff;
	transition: all 0.2s ease-in-out;

	&:hover {
		color: ${themes.colors.red};
		scale: 1.1;
	}
`;

export const SearchAvatarContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

export const SearchContainer = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;

export const SearchButton = styled.button`
	border: none;
	background: none;
`;
