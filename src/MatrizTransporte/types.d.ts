import { InputRef } from "antd";
import { SetStateAction } from "react";

export interface Props {
	inputsRefDestinos: React.MutableRefObject<(InputRef | null)[]>;
}

export interface PropsFooter {
	inputsRefDemandas: React.MutableRefObject<(InputRef | null)[]>;
}

export interface PropsBody {
	inputsRefDepositos: React.MutableRefObject<(InputRef | null)[]>;
	inputsRefOferta: React.MutableRefObject<(InputRef | null)[]>;
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
