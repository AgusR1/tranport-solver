import { Button, Card, Space } from "antd";
import React, { useState } from "react";
import TableMatriz from "./TableMatriz";
import SelectAlgorithm from "./SelectAlogirthm";
import { useMatrizTransporte } from "../hooks/useMatrizTransporte";

const MatrizTransporte: React.FC = () => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<
		"costo_minimo" | "esquina_noroeste" | "vogel"
	>("costo_minimo");
	const { formMethods, onSubmit } = useMatrizTransporte();

	return (
		<Card
			title="Matriz de transporte"
			extra={
				<Button onClick={() => setExpanded(!expanded)} type="link">
					Expandir
				</Button>
			}
			size="small"
		>
			<form
				onSubmit={formMethods.handleSubmit((data) =>
					onSubmit(data, selectedAlgorithm)
				)}
			>
				<TableMatriz expanded={expanded} control={formMethods.control} />
				<Space
					style={{ marginTop: "1em", marginLeft: "auto", marginRight: "auto" }}
				>
					<SelectAlgorithm setSelectedAlgorithm={setSelectedAlgorithm} />
				</Space>
			</form>
		</Card>
	);
};

export default MatrizTransporte;
