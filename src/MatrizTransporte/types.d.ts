import { SetStateAction } from "react";

export interface PropsBody {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<FormValues, any>;
}

export type Cell = { value: string };
export type FormValues = {
	matrix: Cell[][];
};

export interface SelectAlgorithmProps {
	setSelectedAlgorithm: Dispatch<
		SetStateAction<"costo_minimo" | "esquina_noroeste" | "vogel">
	>;
}

export interface TableMatrizProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<FormValues, any>;
	expanded: boolean;
}
