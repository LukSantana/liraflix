import { useState } from "react";
import { Link } from "react-router-dom";
import { RoutesInfo } from "../../utils/routesInfo";
import {
	HeaderContainer,
	HeaderLogo,
	NavItem,
	NavList,
	NavbarContainer,
	SearchAvatarContainer,
	SearchContainer,
} from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import TextInput from "../TextInput";

const Header = () => {
	const [searchParams, setSearchParams] = useState<string | null>(null);
	const searchParamsInput = document.getElementById("search-input");
	searchParamsInput?.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("search-button")?.click();
		}
	});

	return (
		<HeaderContainer>
			<NavbarContainer>
				<Link
					style={{
						color: "transparent",
					}}
					to="/"
					className="nav-item-link"
				>
					<HeaderLogo src="assets/img/logo.png" />
				</Link>
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
					{RoutesInfo.dynamicRoutes
						.filter((route) => route.routeName !== "Search")
						.map((route) => {
							return (
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
							);
						})}
				</NavList>
			</NavbarContainer>
			<SearchAvatarContainer>
				<SearchContainer>
					<TextInput
						id="search-input"
						onChange={(e) => setSearchParams(e.target.value)}
					/>
					<Link
						id="search-button"
						to={`/search?search=${searchParams}&page=1`}
						reloadDocument
					>
						<SearchIcon
							sx={{
								color: "#fff",
								cursor: "pointer",
								fontSize: "40px",
								transition: "all 0.1s ease-out",
								":hover": {
									scale: "1.1",
								},
							}}
						/>
					</Link>
				</SearchContainer>
				<Avatar alt="Baby Yoda Avatar" src="/assets/img/avatar/yoda.jpeg" />
			</SearchAvatarContainer>
		</HeaderContainer>
	);
};

export default Header;
