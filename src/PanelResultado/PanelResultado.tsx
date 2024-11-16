import { Card } from "antd";
import React, { useContext } from "react";
import { StepperContext } from "../context/StepperContext";

const PanelResultado: React.FC = () => {
	const { valuesForm } = useContext(StepperContext) ?? {};
	if (valuesForm === undefined) {
		throw new Error("PanelResultado debe estar dentro de un AppProvider");
	}
	return (
		<Card title="Card title" bordered={false} style={{ width: 300 }}>
			{valuesForm.result}
		</Card>
	);
};

export default PanelResultado;
