import { createContext } from "react";
import { useSteps } from "../hooks/useSteps";
import { useConfigMatrix } from "../hooks/useConfigMatrix";
import { StepperContextType, StepperProviderProps } from "./types";
import { useInputRefs } from "../hooks/useInputRef";

// Crea el contexto con un valor predeterminado (inicialmente undefined)
export const StepperContext = createContext<StepperContextType | undefined>(
	undefined
);

// Crea el proveedor del contexto
export const StepperProvider = ({ children }: StepperProviderProps) => {
	const { current, prev, next } = useSteps();
	const { valuesForm, setValuesForm } = useConfigMatrix();
	const { inputsRefs, getInputValues } = useInputRefs();
	return (
		<StepperContext.Provider
			value={{
				current,
				prev,
				next,
				valuesForm,
				setValuesForm,
				inputsRefs,
				getInputValues,
			}}
		>
			{children}
		</StepperContext.Provider>
	);
};
