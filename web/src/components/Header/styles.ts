import styled from "styled-components";

export const HeaderContainer = styled.div`
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	width: 100%;
	background: rgb(0, 0, 0);
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.4) 0%,
		rgba(0, 212, 255, 0) 100%
	);
	height: 6rem;
	z-index: 9999999999;
`;

export const HeaderLogo = styled.img`
	width: 8rem;
	height: 2.5rem;
`;

export const NavList = styled.ul`
	display: flex;
	justify-content: flex-end;
	gap: 8rem;
	align-items: center;
	font-size: 18px;
	font-weight: 500;
	width: 60%;
`;

export const NavItem = styled.li`
	color: #fff;
	transition: all 0.2s ease-in-out;

	&:hover {
		color: #e50914;
		scale: 1.1;
	}
`;
