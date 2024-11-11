import { Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
	Ith,
	Sth,
	UnstyledInput,
	UnstyledInputNumber,
} from "./TableComponents";
import { PropsBody } from "./types";
import { useContext } from "react";
import { StepperContext } from "../context/StepperContext";

const TableBody: React.FC<PropsBody> = ({ control }) => {
	const { valuesForm, inputsRefs } = useContext(StepperContext) ?? {};
	if (valuesForm === undefined || !inputsRefs) {
		throw new Error("TableHead debe estar dentro de un AppProvider");
	}
	return (
		<tbody>
			{[...Array(valuesForm.nroFuentes)].map((_e, colIndex) => {
				return (
					<tr key={uuidv4()}>
						<Sth key={uuidv4()}>
							<UnstyledInput
								id={"Fuente" + colIndex}
								name={"Fuente" + colIndex}
								defaultValue={`Deposito ${colIndex + 1}`}
								placeholder="Deposito"
								ref={(el) => (inputsRefs.depositos.current[colIndex] = el)}
							/>
						</Sth>
						{[...Array(valuesForm.nroDestinos)].map((_e, rowIndex) => {
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
								ref={(el) => (inputsRefs.ofertas.current[colIndex] = el)}
								name={"Oferta" + colIndex}
								defaultValue={"0"}
							/>
						</Sth>
					</tr>
				);
			})}
		</tbody>
	);
};

export default TableBody;
