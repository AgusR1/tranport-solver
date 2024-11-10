import { Button, message } from "antd";
import React from "react";
import { useStepper } from "../hooks/useStepper";
import { StepperSliderProps } from "./types";

const StepperSlider: React.FC<StepperSliderProps> = ({
	stepsLength,
	onComplete,
}) => {
	const { current, next, prev } = useStepper();

	const handleComplete = () => {
		message.success("Processing complete!");
		onComplete?.();
	};

	return (
		<>
			{current < stepsLength - 1 && (
				<Button type="primary" onClick={next}>
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
