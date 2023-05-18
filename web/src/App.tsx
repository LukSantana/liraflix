import { BrowserRouter } from "react-router-dom";
import Router from "./Router/index.tsx";
import Header from "./components/Header/index.tsx";
import { MainContainer } from "./styles.ts";

function App() {
	return (
		<BrowserRouter>
			<MainContainer>
				<Header />
				<Router/>
			</MainContainer>
		</BrowserRouter>
	);
}

export default App;
