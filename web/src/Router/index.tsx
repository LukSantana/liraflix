import { Route, Routes } from "react-router-dom";
import { RoutesInfo } from "../utils/routesInfo";

const Router = () => {
	return (
		<Routes>
			{RoutesInfo.basicRoutes.map((route) => (
				<Route key={route.routeName} path={route.path} element={route.element} />
			))}
			{RoutesInfo.dynamicRoutes.map((route) => (
				<Route key={route.routeName} path={route.path} element={route.element} />
			))}
		</Routes>
	);
};

export default Router;
