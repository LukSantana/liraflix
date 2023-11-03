import { BrowserRouter } from "react-router-dom";
import Router from "@src/Router/index.tsx";
import Header from "@components/Header/index.tsx";
import { SearchContextProvider } from "@context/searchContext.tsx";
import { AlertContextProvider } from "@context/alertContext.tsx";
import AlertComponent from "@components/Alert/index.tsx";

import { MainContainer } from "@src/styles.ts";

function App() {
	return (
		<AlertContextProvider>
			<SearchContextProvider>
				<BrowserRouter>
					<MainContainer>
						<Header />
						<Router />
						<AlertComponent />
					</MainContainer>
				</BrowserRouter>
			</SearchContextProvider>
		</AlertContextProvider>
	);
}

export default App;
