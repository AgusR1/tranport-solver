import { useContext } from "react";
import { StepperContext } from "../context/StepperContext";

export const useCurrentStep = () => {
	const { current } = useContext(StepperContext) ?? {};
	if (current === undefined) {
		throw new Error("StepperComponent debe estar dentro de un AppProvider");
	}
	return current;
};
