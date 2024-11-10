import { InputRef } from "antd";
import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";

// Define el tipo de contexto
interface StepperContextType {
	current: number;
	prev: () => void;
	next: () => void;
	setValuesForm: Dispatch<
		SetStateAction<{
			nroDestinos: number;
			nroFuentes: number;
			result: string[];
		}>
	>;
	valuesForm: {
		nroDestinos: number;
		nroFuentes: number;
		result: string[];
	};
	inputsRefs: {
		demandas: MutableRefObject<(InputRef | null)[]>;
		ofertas: MutableRefObject<(InputRef | null)[]>;
		depositos: MutableRefObject<(InputRef | null)[]>;
		destinos: MutableRefObject<(InputRef | null)[]>;
	};
	getInputValues: (
		ref: RefObject<(InputRef | null)[]>,
		fallback?: string | number
	) => number[];
}

// Define el tipo de las props del proveedor
interface StepperProviderProps {
	children: ReactNode;
}
