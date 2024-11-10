// stepsConfig.js
import FormCreacionMatriz from "../FormCreacionMatriz/FormCreacionMatriz";
import MatrizTransporte from "../MatrizTransporte/MatrizTransporte";

export const steps = [
	{ title: "Definir matriz", content: <FormCreacionMatriz /> },
	{ title: "Ingresar valores", content: <MatrizTransporte /> },
	{ title: "Resultados", content: "Last-content" },
];
