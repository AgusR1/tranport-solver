import { Button, message } from "antd";
import React from "react";
import { useStepper } from "../hooks/useStepper";
import { StepperSliderProps } from "./types";

const StepperSlider: React.FC<StepperSliderProps> = ({
	stepsLength,
	onComplete,
	onNext,
}) => {
	const { current, next, prev } = useStepper();

	const handleComplete = () => {
		message.success("Processing complete!");
		onComplete?.();
	};

	const handleNext = async () => {
		const canProceed = onNext ? await onNext() : true;
		if (!canProceed) return;

		next?.();
	};

	return (
		<>
			{current < stepsLength - 1 && (
				<Button type="primary" onClick={handleNext}>
					Siguiente
				</Button>
			)}
			{current === stepsLength - 1 && (
				<Button type="primary" onClick={handleComplete}>
					Hecho
				</Button>
			)}
			{current > 0 && (
				<Button style={{ margin: "0 8px" }} onClick={prev}>
					Anterior
				</Button>
			)}
		</>
	);
};

export default StepperSlider;
