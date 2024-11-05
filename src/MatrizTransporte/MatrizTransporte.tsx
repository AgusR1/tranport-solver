import { Card, Input, InputRef, Select, Space } from "antd";
import React, { useRef, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
	convertToNumberMatrix,
	costoMin,
	esquinaNoroeste,
	generateMatrix,
	vogel,
} from "./helpers";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { fontFamily } from "../general/constants";

export type Cell = { value: string };
export type FormValues = {
	matrix: Cell[][];
};

interface Props {
	nroFuentes: number;
	nroDestinos: number;
	setResult: React.Dispatch<React.SetStateAction<string[]>>;
}

const Table = styled.table`
	border-collapse: separate;
	border-spacing: 0;
	border: 1px solid #ddd;
	border-radius: 10px;
`;

const UnstyledInput = styled(Input)`
	border-color: transparent;
	font-family: "Josefin Sans";
	background: transparent;
	color: #def202;
	text-align: center;
	&:focus {
		box-shadow: none;
		border-color: transparent;
		background: transparent;
	}
	&:hover {
		border-color: transparent;
		box-shadow: none;
		background: transparent;
	}
`;

const UnstyledInputNumber = styled(Input)`
	border-color: transparent;
	font-family: "Josefin Sans";
	background: transparent;
	text-align: center;
	&:focus {
		box-shadow: none;
		border-color: transparent;
		background: transparent;
	}
	&:hover {
		border-color: transparent;
		box-shadow: none;
		background: transparent;
	}
`;

const Th = styled.th`
	border: 1px solid rgb(0 0 0 / 15%);
	border-collapse: collapse;
	min-width: 30px;
	max-width: 165px;
`;

const ThFD = styled(Th)`
	font-family: "Josefin Sans";
	font-weight: 600;
	background: #2f23b0;
	color: #def202;
	padding: 0.6em;
	text-align: center;
	width: fit-content;
`;

const Sth = styled(Th)`
	font-family: "Josefin Sans";
	font-weight: 600;
	background: #746ae2;
	color: #def202;
	cursor: pointer;
	padding: 0.6em;
	text-align: center;
`;

const Ith = styled(Th)`
	font-family: "Josefin Sans";
	padding: 0.6em;
	text-align: center;
	width: fit-content;
`;

const MatrizTransporte: React.FC<Props> = ({
	nroFuentes,
	nroDestinos,
	setResult,
}) => {
	const inputsRefDemandas = useRef<(InputRef | null)[]>([]);
	const inputsRefOferta = useRef<(InputRef | null)[]>([]);
	const inputsRefDepositos = useRef<(InputRef | null)[]>([]);
	const inputsRefDestinos = useRef<(InputRef | null)[]>([]);
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<
		"costo_minimo" | "esquina_noroeste" | "vogel"
	>("costo_minimo");
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			matrix: generateMatrix(nroFuentes, nroDestinos),
		},
	});

	useFieldArray({
		control,
		name: "matrix",
	});

	const onSubmit = (data: FormValues) => {
		const demandas = inputsRefDemandas.current.map((input) =>
			parseInt(input?.input?.value || "0")
		);
		const ofertas = inputsRefOferta.current.map((input) =>
			parseInt(input?.input?.value || "0")
		);
		const depositosNombres = inputsRefDepositos.current.map(
			(input) => input?.input?.value || ""
		);
		const destinosNombres = inputsRefDestinos.current.map(
			(input) => input?.input?.value || ""
		);
		switch (selectedAlgorithm) {
			case "costo_minimo":
				setResult(
					costoMin(
						convertToNumberMatrix(data),
						demandas,
						ofertas,
						depositosNombres,
						destinosNombres
					)
				);
				return;
			case "esquina_noroeste":
				setResult(
					esquinaNoroeste(
						convertToNumberMatrix(data),
						demandas,
						ofertas,
						depositosNombres,
						destinosNombres
					)
				);
				return;
			case "vogel":
				vogel(
					convertToNumberMatrix(data),
					demandas,
					ofertas,
					depositosNombres,
					destinosNombres
				);
				return;
			default:
				setResult(
					costoMin(
						convertToNumberMatrix(data),
						demandas,
						ofertas,
						depositosNombres,
						destinosNombres
					)
				);
				return;
		}
	};

	return (
		<Card title="Matriz de transporte" size="small">
			<form
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Table
					style={{ maxWidth: "80%", marginLeft: "auto", marginRight: "auto" }}
				>
					<thead>
						<tr>
							<ThFD style={{ borderTopLeftRadius: "10px" }}>
								Fuentes/Destinos
							</ThFD>
							{[...Array(nroDestinos)].map((_, index) => (
								<Sth key={index}>
									<UnstyledInput
										defaultValue={`Destino ${index + 1}`}
										placeholder="Nombre del destino"
										ref={(el) => (inputsRefDestinos.current[index] = el)}
									/>
								</Sth>
							))}
							<ThFD style={{ borderTopRightRadius: "10px" }}>Oferta</ThFD>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<ThFD style={{ borderBottomLeftRadius: "10px" }}>Demanda</ThFD>
							{[...Array(nroDestinos)].map((_, index) => (
								<Sth key={index}>
									<UnstyledInput
										ref={(el) => (inputsRefDemandas.current[index] = el)}
										id={"Demanda" + index}
										defaultValue={`0`}
									/>
								</Sth>
							))}
							<ThFD style={{ borderBottomRightRadius: "10px" }}>-</ThFD>
						</tr>
					</tfoot>
					<tbody>
						{[...Array(nroFuentes)].map((_e, colIndex) => {
							return (
								<tr key={uuidv4()}>
									<Sth key={uuidv4()}>
										<UnstyledInput
											id={"Fuente" + colIndex}
											name={"Fuente" + colIndex}
											defaultValue={`Deposito ${colIndex + 1}`}
											placeholder="Deposito"
											ref={(el) => (inputsRefDepositos.current[colIndex] = el)}
										/>
									</Sth>
									{[...Array(nroDestinos)].map((_e, rowIndex) => {
										return (
											<Ith key={uuidv4()}>
												<Controller
													name={`matrix.${rowIndex}.${colIndex}.value`}
													control={control}
													render={({ field }) => (
														<UnstyledInputNumber size="large" {...field} />
													)}
												/>
											</Ith>
										);
									})}
									<Sth key={uuidv4()}>
										<UnstyledInput
											key={uuidv4()}
											id={"Oferta" + colIndex}
											ref={(el) => (inputsRefOferta.current[colIndex] = el)}
											name={"Oferta" + colIndex}
											defaultValue={"0"}
										/>
									</Sth>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<Space
					style={{ marginTop: "1em", marginLeft: "auto", marginRight: "auto" }}
				>
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
				</Space>
			</form>
		</Card>
	);
};

export default MatrizTransporte;
