import { BrowserRouter } from "react-router-dom";
import Router from "./Router/index.tsx";
import Header from "./components/Header/index.tsx";
import { MainContainer } from "./styles.ts";
import { SearchContextProvider } from "./context/searchContext.tsx";

function App() {
	return (
		<SearchContextProvider>
			<BrowserRouter>
				<MainContainer>
					<Header />
					<Router />
				</MainContainer>
			</BrowserRouter>
		</SearchContextProvider>
	);
}

export default App;
