import { Button, message } from "antd";
import React from "react";
import { useSteps } from "../hooks/useSteps";

interface Props {
	stepsLength: number;
}

const StepperSlider: React.FC<Props> = ({ stepsLength }) => {
	const { current, prev, next } = useSteps();
	return (
		<>
			{current < stepsLength - 1 && (
				<Button type="primary" onClick={() => next()}>
					Siguiente
				</Button>
			)}
			{current === stepsLength - 1 && (
				<Button
					type="primary"
					onClick={() => message.success("Processing complete!")}
				>
					Hecho
				</Button>
			)}
			{current > 0 && (
				<Button style={{ margin: "0 8px" }} onClick={() => prev()}>
					Anterior
				</Button>
			)}
		</>
	);
};

export default StepperSlider;
