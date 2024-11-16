import {
	CodeOutlined,
	FileTextOutlined,
	TruckOutlined,
} from "@ant-design/icons";
import { InputRef, Tag } from "antd";
import { fontFamily } from "../general/constants";
import { FormValues } from "./types";
import { CSSProperties, MutableRefObject } from "react";

export const formStyle: CSSProperties = {
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
};

export const getTipoActividadNombre = (tipoId: string) => {
	switch (tipoId) {
		case "t":
			return (
				<Tag
					style={{
						fontFamily: fontFamily,
						fontSize: "1em",
						padding: "4px",
					}}
					icon={<TruckOutlined />}
					color="#FE5F55"
				>
					Problema de transporte
				</Tag>
			);
		case "p":
			return (
				<Tag
					style={{
						fontFamily: fontFamily,
						fontSize: "1em",
						padding: "4px",
					}}
					icon={<CodeOutlined />}
					color="#43BCCD"
				>
					Programación
				</Tag>
			);
		default:
			return (
				<Tag
					style={{
						fontFamily: fontFamily,
						fontSize: "1em",
						padding: "4px",
					}}
					icon={<FileTextOutlined />}
					color="#FABC2A"
				>
					Redacción abierta
				</Tag>
			);
	}
};

export const generateMatrix = (
	rows: number,
	columns: number
): { value: string }[][] => {
	return Array.from({ length: columns }, () =>
		Array.from({ length: rows }, () => ({ value: "0" }))
	);
};

export const convertToNumberMatrix = (data: FormValues): number[][] => {
	return data.matrix.map(
		(row) => row.map((cell) => parseFloat(cell.value)) // Convierte cada string a número
	);
};

const findMinCoordinates = (matrix: number[][]): [number, number] => {
	let min = Infinity; // Iniciar con el valor más alto posible
	let coordinates: [number, number] = [-1, -1]; // Inicializar con un valor por defecto

	// Recorrer la matriz
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			const value = matrix[i][j];

			if (value < min) {
				// Encontramos un nuevo mínimo, actualizamos la coordenada
				min = value;
				coordinates = [i, j];
			}
		}
	}

	return coordinates;
};
export const costoMin = (
	matrizCostos: number[][],
	demandas: number[],
	ofertas: number[],
	depositosNombres: string[],
	destinosNombres: string[]
) => {
	const logs: string[] = [];
	let costoTotal = 0;
	// Calcula la suma de ofertas y demandas
	const sumaOfertas = ofertas.reduce((acc, curr) => acc + curr, 0);
	const sumaDemandas = demandas.reduce((acc, curr) => acc + curr, 0);
	if (sumaDemandas !== sumaOfertas) {
		logs.push("La la demanda y la oferta deben ser iguales");
		return logs;
	}
	// Recorre la matriz de costos y encuentra el menor valor

	let [i, j] = findMinCoordinates(matrizCostos); // Desestructurar directamente las coordenadas

	while (i !== -1 && j !== -1) {
		logs.push(
			`Encontramos el costo mínimo de ${matrizCostos[i][j]} en el depósito ${depositosNombres[j]} para el destino ${destinosNombres[i]} que tiene una demanda de ${demandas[i]} y una oferta de ${ofertas[j]}`
		);

		// Guardamos el costo antes de actualizar a infinito
		const costoUnitario = matrizCostos[i][j];

		// Actualizar el costo a infinito para evitar volver a seleccionar este valor
		matrizCostos[i][j] = Infinity;

		const oferta = ofertas[j];
		const demanda = demandas[i];

		if (demanda > oferta) {
			// Si la demanda es mayor, cubrimos la oferta disponible
			costoTotal += oferta * costoUnitario;
			demandas[i] -= oferta;
			ofertas[j] = 0;
		} else {
			// Si la oferta es mayor o igual, cubrimos toda la demanda
			costoTotal += demanda * costoUnitario;
			ofertas[j] -= demanda;
			demandas[i] = 0;

			// Actualizar la fila completa a infinito para evitar más selecciones
			matrizCostos[i].fill(Infinity);
		}

		// Encontrar nuevas coordenadas del siguiente costo mínimo
		[i, j] = findMinCoordinates(matrizCostos);
	}
	logs.push(`El costo total es de ${costoTotal}`);
	return logs;
};

const encontrarEsquinaNoroeste = (matrix: number[][]): [number, number] => {
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] !== Infinity) {
				return [row, col];
			}
		}
	}
	return [-1, -1]; // Si no se encuentra ningún valor distinto a Infinity
};

export const esquinaNoroeste = (
	matrizCostos: number[][],
	demandas: number[],
	ofertas: number[],
	depositosNombres: string[],
	destinosNombres: string[]
) => {
	const logs: string[] = [];
	let costoTotal = 0;
	// Calcula la suma de ofertas y demandas
	const sumaOfertas = ofertas.reduce((acc, curr) => acc + curr, 0);
	const sumaDemandas = demandas.reduce((acc, curr) => acc + curr, 0);
	if (sumaDemandas !== sumaOfertas) {
		logs.push("La demanda y la oferta deben ser iguales");
		return logs;
	}

	let [i, j] = encontrarEsquinaNoroeste(matrizCostos);
	while (i !== -1 && j !== -1) {
		const costoUnitario = matrizCostos[i][j];
		const oferta = ofertas[j];
		const demanda = demandas[i];
		const destino = destinosNombres[i];
		const deposito = depositosNombres[j];

		if (demanda > oferta) {
			logs.push(
				`Asignamos al destino ${destino} toda la oferta del depósito ${deposito}, que es de ${oferta}, para cubrir su demanda de ${demanda}.`
			);
			// Si la demanda es mayor, cubrimos la oferta disponible
			costoTotal += oferta * costoUnitario;
			demandas[i] -= oferta;
			ofertas[j] = 0;
			// Actualizar la columna a infinito para evitar más selecciones
			for (let k = 0; k < matrizCostos.length; k++) {
				matrizCostos[k][j] = Infinity;
			}
		} else {
			logs.push(
				`Cubirmos la demanda completa del destino ${destino} que es de ${demanda} con la oferta del deposito ${deposito} que es de ${oferta}`
			);
			// Si la oferta es mayor o igual, cubrimos toda la demanda
			costoTotal += demanda * costoUnitario;
			ofertas[j] -= demanda;
			demandas[i] = 0;
			// Actualizar la fila a infinito para evitar más selecciones
			matrizCostos[i].fill(Infinity);
		}

		console.log(matrizCostos);
		[i, j] = encontrarEsquinaNoroeste(matrizCostos);
	}

	logs.push(`El costo total es de ${costoTotal}`);
	return logs;
};

const penalizacionesFila = (matrizCostos: number[][]): number[] => {
	return matrizCostos.map((fila) => {
		// Ordenamos la fila y obtenemos los dos menores
		const [menor1, menor2] = fila.sort((a, b) => a - b).slice(0, 2);
		// Calculamos la diferencia entre los dos menores
		return menor2 - menor1;
	});
};

const penalizacionesPorColumna = (matrizCostos: number[][]): number[] => {
	const numFilas = matrizCostos.length;
	const numColumnas = matrizCostos[0].length;
	const diferencias: number[] = [];

	for (let j = 0; j < numColumnas; j++) {
		const columna = [];

		// Extraemos los elementos de la columna
		for (let i = 0; i < numFilas; i++) {
			columna.push(matrizCostos[i][j]);
		}

		// Ordenamos la columna y obtenemos los dos menores
		const [menor1, menor2] = columna.sort((a, b) => a - b).slice(0, 2);

		// Calculamos la diferencia entre los dos menores
		diferencias.push(menor2 - menor1);
	}

	return diferencias;
};

export const vogel = (
	matrizCostos: number[][],
	demandas: number[],
	ofertas: number[],
	depositosNombres: string[],
	destinosNombres: string[]
) => {
	const logs: string[] = [];
	let costoTotal = 0;
	// Calcula la suma de ofertas y demandas
	const sumaOfertas = ofertas.reduce((acc, curr) => acc + curr, 0);
	const sumaDemandas = demandas.reduce((acc, curr) => acc + curr, 0);
	if (sumaDemandas !== sumaOfertas) {
		logs.push("La demanda y la oferta deben ser iguales");
		return logs;
	}
	let penalizacionesRow = penalizacionesFila(matrizCostos);
	let penalizacionesCol = penalizacionesPorColumna(matrizCostos);
	console.log("penalizaciones filas: " + penalizacionesRow);
	console.log("penalizaciones columnas: " + penalizacionesCol);
};

export const getResult = (
	selectedAlgorithm: "costo_minimo" | "esquina_noroeste" | "vogel",
	data: FormValues,
	demandas: number[],
	ofertas: number[],
	depositosNombres: string[],
	destinosNombres: string[]
) => {
	switch (selectedAlgorithm) {
		case "costo_minimo":
			return costoMin(
				convertToNumberMatrix(data),
				demandas,
				ofertas,
				depositosNombres,
				destinosNombres
			);
		case "esquina_noroeste":
			return esquinaNoroeste(
				convertToNumberMatrix(data),
				demandas,
				ofertas,
				depositosNombres,
				destinosNombres
			);
		case "vogel":
			return vogel(
				convertToNumberMatrix(data),
				demandas,
				ofertas,
				depositosNombres,
				destinosNombres
			);
		default:
			return costoMin(
				convertToNumberMatrix(data),
				demandas,
				ofertas,
				depositosNombres,
				destinosNombres
			);
	}
};

export const getField = (inputsRefs: {
	demandas: MutableRefObject<(InputRef | null)[]>;
	ofertas: MutableRefObject<(InputRef | null)[]>;
	depositos: MutableRefObject<(InputRef | null)[]>;
	destinos: MutableRefObject<(InputRef | null)[]>;
}) => {
	return {
		demandas: inputsRefs.demandas.current.map((input) =>
			parseInt(input?.input?.value || "0")
		),
		ofertas: inputsRefs.ofertas.current.map((input) =>
			parseInt(input?.input?.value || "0")
		),
		depositosNombres: inputsRefs.depositos.current.map(
			(input) => input?.input?.value || ""
		),
		destinosNombres: inputsRefs.destinos.current.map(
			(input) => input?.input?.value || ""
		),
	};
};
