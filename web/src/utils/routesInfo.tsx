import Animes from "../pages/Animes";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Search from "../pages/Search";
import Watchlist from "../pages/Watchlist";

interface RoutesProps {
  routeName: string;
  routeDescription: string;
  path: string;
  element: JSX.Element;
}

class routesInfo {
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
        element: <Search/>,
      },
    ];
  }
}

export const RoutesInfo = new routesInfo();