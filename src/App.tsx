import { HashRouter, Route, Routes } from "react-router-dom";
import ListadoActividades from "./ListadoActividades/ListadoActividades";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<ListadoActividades />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
