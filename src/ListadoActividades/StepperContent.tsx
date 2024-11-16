import React, { useRef } from "react";
import { useStepper } from "../hooks/useStepper";
import { steps } from "./stepsConfig";

interface StepperContentProps {
	currentStep: number;
}

const StepperContent: React.FC<StepperContentProps> = ({ currentStep }) => {
	const { next } = useStepper();
	const formRef = useRef<{ handleSubmit: () => Promise<boolean> } | null>(null);

	// Lógica de validación del formulario
	const handleNext = async () => {
		if (formRef.current) {
			const isValid = await formRef.current.handleSubmit();
			if (!isValid) return false;
		}
		next?.(); // Mueve al siguiente paso si es válido
		return true;
	};

	// Pasa formRef al contenido del paso actual
	return React.cloneElement(steps[currentStep].content, {
		formRef,
		onNext: handleNext,
	});
};

export default StepperContent;
