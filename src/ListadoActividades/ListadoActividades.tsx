import React from "react";
import { Steps } from "antd";
import MainLayout from "../general/MainLayout";
import ListadoActividadesBreadcrumb from "./ListadoActividadesBreadcrumb";
import StepperSlider from "./StepperSlider";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { steps } from "./stepsConfig";
import StepperContent from "./StepperContent";

const StepperActividad: React.FC = () => {
	const current = useCurrentStep();

	return (
		<MainLayout>
			<ListadoActividadesBreadcrumb />
			<Steps
				current={current}
				items={steps.map((step) => ({ key: step.title, title: step.title }))}
			/>
			<div>
				<StepperContent currentStep={current} />
			</div>
			<div style={{ marginTop: 24 }}>
				<StepperSlider stepsLength={steps.length} />
			</div>
		</MainLayout>
	);
};

export default StepperActividad;
