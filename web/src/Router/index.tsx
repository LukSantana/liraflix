import { Route, Routes } from "react-router-dom";
import { routesInfo } from "@utils/routesInfo";

const Router = () => {
	return (
		<Routes>
			{routesInfo.basicRoutes.map((route) => (
				<Route
					key={route.routeName}
					path={route.path}
					element={route.element}
				/>
			))}

			{routesInfo.dynamicRoutes.map((route) => (
				<Route
					key={route.routeName}
					path={route.path}
					element={route.element}
				/>
			))}
		</Routes>
	);
};

export default Router;
