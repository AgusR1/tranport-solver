// useMatrizTransporte.ts
import { useContext, useCallback } from "react";
import { useForm } from "react-hook-form";
import { StepperContext } from "../context/StepperContext";
import { FormValues } from "../MatrizTransporte/types";
import {
	generateMatrix,
	getField,
	getResult,
} from "../MatrizTransporte/helpers";

export const useMatrizTransporte = () => {
	const { valuesForm, setValuesForm, inputsRefs } =
		useContext(StepperContext) ?? {};
	if (!valuesForm || !setValuesForm || !inputsRefs) {
		throw new Error("FormCreacionMatriz debe estar dentro de un AppProvider");
	}
	const formMethods = useForm<FormValues>({
		defaultValues: {
			matrix: generateMatrix(valuesForm.nroFuentes, valuesForm.nroDestinos),
		},
	});

	const onSubmit = useCallback(
		(
			data: FormValues,
			selectedAlgorithm: "costo_minimo" | "esquina_noroeste" | "vogel"
		) => {
			const { demandas, ofertas, depositosNombres, destinosNombres } =
				getField(inputsRefs);
			setValuesForm((prevValues) => ({
				...prevValues,
				result:
					getResult(
						selectedAlgorithm,
						data,
						demandas,
						ofertas,
						depositosNombres,
						destinosNombres
					) ?? [],
			}));
		},
		[inputsRefs, setValuesForm]
	);

	return {
		formMethods,
		onSubmit,
	};
};
