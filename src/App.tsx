import { HashRouter, Route, Routes } from "react-router-dom";
import ListadoActividades from "./ListadoActividades/ListadoActividades";
import { StepperProvider } from "./context/StepperContext";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route
					path="/"
					element={
						<StepperProvider>
							<ListadoActividades />
						</StepperProvider>
					}
				/>
			</Routes>
		</HashRouter>
	);
}

export default App;
