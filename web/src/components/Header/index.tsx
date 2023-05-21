import { Link } from "react-router-dom";
import { RoutesInfo } from "../../utils/routesInfo";
import { HeaderContainer, HeaderLogo, NavItem, NavList } from "./styles";

const Header = () => {
	return (
		<HeaderContainer>
			<HeaderLogo src="assets/img/logo.png" />
			<NavList>
				{RoutesInfo.basicRoutes.map((route) => (
					<Link
						style={{
							color: "transparent",
						}}
						to={route.path}
						className="nav-item-link"
						key={route.routeName}
					>
						<NavItem>{route.routeName}</NavItem>
					</Link>
				))}
				{RoutesInfo.dynamicRoutes.map((route) => (
					<Link
						style={{
							color: "transparent",
						}}
						to={`${route.path}?page=${1}`}
						className="nav-item-link"
						key={`${route.routeName}`}
					>
						<NavItem>{route.routeName}</NavItem>
					</Link>
				))}
			</NavList>
		</HeaderContainer>
	);
};

export default Header;
