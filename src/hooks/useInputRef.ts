import { InputRef } from "antd";
import { useRef } from "react";

export const useInputRefs = () => {
	// Refs for inputs
	const inputsRefs = {
		demandas: useRef<(InputRef | null)[]>([]),
		ofertas: useRef<(InputRef | null)[]>([]),
		depositos: useRef<(InputRef | null)[]>([]),
		destinos: useRef<(InputRef | null)[]>([]),
	};

	const getInputValues = (
		ref: React.RefObject<(InputRef | null)[]>,
		fallback: string | number = 0
	) =>
		// Si ref.current es null, utiliza un array vacío para mapear
		(ref.current || []).map((input) =>
			parseInt(input?.input?.value || String(fallback))
		);

	return {
		inputsRefs,
		getInputValues,
	};
};
