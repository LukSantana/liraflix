import Animes from "@src/pages/Animes";
import Home from "@src/pages/Home";
import Movies from "@src/pages/Movies";
import Search from "@src/pages/Search";
import Watchlist from "@src/pages/Watchlist";

interface RoutesProps {
	routeName: string;
	routeDescription: string;
	path: string;
	element: JSX.Element;
}

class RoutesInfo {
	basicRoutes: Array<RoutesProps>;
	dynamicRoutes: Array<RoutesProps>;

	constructor() {
		this.basicRoutes = [
			{
				routeName: "Home",
				routeDescription: "Home Page",
				path: "/",
				element: <Home />,
			},
			{
				routeName: "Minha Lista",
				routeDescription: "Minha lista de filmes e animes",
				path: "/watchlist",
				element: <Watchlist />,
			},
		];

		this.dynamicRoutes = [
			{
				routeName: "Filmes",
				routeDescription: "Página de Filmes",
				path: "/movies",
				element: <Movies />,
			},
			{
				routeName: "Animes",
				routeDescription: "Página de Animes",
				path: "/animes",
				element: <Animes />,
			},
			{
				routeName: "Search",
				routeDescription: "Página de busca de conteúdo",
				path: "/search",
				element: <Search />,
			},
		];
	}
}

export const routesInfo = new RoutesInfo();
