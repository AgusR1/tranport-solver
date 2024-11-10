import { useContext } from "react";
import { StepperContext } from "../context/StepperContext";

export const useStepper = () => {
	const { current, next, prev } = useContext(StepperContext) ?? {};
	if (current === undefined) {
		throw new Error("Debe usarse dentro de un AppProvider");
	}
	return { current, next, prev };
};
