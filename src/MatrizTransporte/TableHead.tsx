import { useContext } from "react";
import { Sth, ThFD, UnstyledInput } from "./TableComponents";
import { StepperContext } from "../context/StepperContext";
import { Props } from "./types";

const TableHead: React.FC<Props> = ({ inputsRefDestinos }) => {
	const { valuesForm } = useContext(StepperContext) ?? {};
	if (valuesForm === undefined) {
		throw new Error("TableHead debe estar dentro de un AppProvider");
	}
	return (
		<thead>
			<tr>
				<ThFD style={{ borderTopLeftRadius: "10px" }}>Fuentes/Destinos</ThFD>
				{[...Array(valuesForm.nroDestinos)].map((_, index) => (
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
	);
};

export default TableHead;
