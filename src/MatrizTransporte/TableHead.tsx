import { useContext } from "react";
import { Sth, ThFD, UnstyledInput } from "./TableComponents";
import { StepperContext } from "../context/StepperContext";

const TableHead: React.FC = () => {
	const { valuesForm, inputsRefs } = useContext(StepperContext) ?? {};
	if (valuesForm === undefined || !inputsRefs) {
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
							ref={(el) => (inputsRefs.destinos.current[index] = el)}
						/>
					</Sth>
				))}
				<ThFD style={{ borderTopRightRadius: "10px" }}>Oferta</ThFD>
			</tr>
		</thead>
	);
};

export default TableHead;
