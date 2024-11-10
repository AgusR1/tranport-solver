import React from "react";
import { Steps } from "antd";
import MainLayout from "../general/MainLayout";
import StepperSlider from "./StepperSlider";
import ListadoActividadesBreadcrumb from "./ListadoActividadesBreadcrumb";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { steps } from "./stepsConfig";

const StepperActividad: React.FC = () => {
	const current = useCurrentStep();
	const items = steps.map((step) => ({ key: step.title, title: step.title }));

	return (
		<MainLayout>
			<ListadoActividadesBreadcrumb />
			<Steps current={current} items={items} />
			<div>{steps[current].content}</div>
			<div style={{ marginTop: 24 }}>
				<StepperSlider stepsLength={steps.length} />
			</div>
		</MainLayout>
	);
};

export default StepperActividad;
