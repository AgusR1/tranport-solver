import { Button, Card, Space } from "antd";
import React, { useContext, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { generateMatrix, getField, getResult } from "./helpers";
import { FormValues } from "./types";
import SelectAlgorithm from "./SelectAlogirthm";
import { StepperContext } from "../context/StepperContext";
import TableMatriz from "./TableMatriz";

const MatrizTransporte: React.FC = () => {
	const { valuesForm, setValuesForm, inputsRefs } =
		useContext(StepperContext) ?? {};
	if (
		valuesForm === undefined ||
		setValuesForm === undefined ||
		inputsRefs === undefined
	) {
		throw new Error("TableHead debe estar dentro de un AppProvider");
	}

	const [expanded, setExpanded] = useState<boolean>(false);
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<
		"costo_minimo" | "esquina_noroeste" | "vogel"
	>("costo_minimo");
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			matrix: generateMatrix(valuesForm.nroFuentes, valuesForm.nroDestinos),
		},
	});

	useFieldArray({
		control,
		name: "matrix",
	});

	const onSubmit = (data: FormValues) => {
		const { demandas, ofertas, depositosNombres, destinosNombres } =
			getField(inputsRefs);
		setValuesForm((prevValues) => ({
			...prevValues,
			result:
				getResult(
					selectedAlgorithm,
					data,
					demandas,
					ofertas,
					depositosNombres,
					destinosNombres
				) ?? [],
		}));
	};

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
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<TableMatriz expanded={expanded} control={control} />
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
