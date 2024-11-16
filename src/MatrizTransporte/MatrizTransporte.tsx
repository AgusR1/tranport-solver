import { Button, Card, Space } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import TableMatriz from "./TableMatriz";
import SelectAlgorithm from "./SelectAlogirthm";
import { useMatrizTransporte } from "../hooks/useMatrizTransporte";
import { formStyle } from "./helpers";

const MatrizTransporte: React.FC = forwardRef((_, ref) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<
		"costo_minimo" | "esquina_noroeste" | "vogel"
	>("costo_minimo");
	const { formMethods, onSubmit } = useMatrizTransporte();

	useImperativeHandle(ref, () => ({
		handleSubmit: async () => {
			try {
				await formMethods.handleSubmit((data) =>
					onSubmit(data, selectedAlgorithm)
				)();
				return true;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				return false;
			}
		},
	}));

	return (
		<Card
			title="Matriz de transporte"
			extra={
				<Button onClick={() => setExpanded(!expanded)} type="link">
					{!expanded ? "Expandir" : "Comprimir"}
				</Button>
			}
			size="small"
		>
			<form
				style={formStyle}
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
});

export default MatrizTransporte;
