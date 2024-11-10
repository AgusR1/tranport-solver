import { Select } from "antd";
import { fontFamily } from "../general/constants";
import React from "react";
import { SelectAlgorithmProps } from "./types";

const SelectAlgorithm: React.FC<SelectAlgorithmProps> = ({
	setSelectedAlgorithm,
}) => {
	return (
		<Select
			defaultValue="costo_minimo"
			style={{
				width: "200px",
				fontFamily: fontFamily,
			}}
			onChange={(e: "costo_minimo" | "esquina_noroeste" | "vogel") => {
				setSelectedAlgorithm(e);
			}}
			options={[
				{ value: "costo_minimo", label: "Costo minimo" },
				{ value: "esquina_noroeste", label: "Esquina noroeste" },
				{ value: "vogel", label: "Vogel" },
			]}
		/>
	);
};

export default SelectAlgorithm;
