// stepsConfig.js
import FormCreacionMatriz from "../FormCreacionMatriz/FormCreacionMatriz";
import MatrizTransporte from "../MatrizTransporte/MatrizTransporte";
import PanelResultado from "../PanelResultado/PanelResultado";

export const steps = [
	{ title: "Definir matriz", content: <FormCreacionMatriz /> },
	{ title: "Ingresar valores", content: <MatrizTransporte /> },
	{ title: "Resultados", content: <PanelResultado /> },
];
