import { useContext } from "react";
import { Sth, ThFD, UnstyledInput } from "./TableComponents";
import { StepperContext } from "../context/StepperContext";

const TableFoot: React.FC = () => {
	const { valuesForm, inputsRefs } = useContext(StepperContext) ?? {};
	if (valuesForm === undefined || !inputsRefs) {
		throw new Error("TableHead debe estar dentro de un AppProvider");
	}
	return (
		<tfoot>
			<tr>
				<ThFD style={{ borderBottomLeftRadius: "10px" }}>Demanda</ThFD>
				{[...Array(valuesForm.nroDestinos)].map((_, index) => (
					<Sth key={index}>
						<UnstyledInput
							ref={(el) => (inputsRefs.demandas.current[index] = el)}
							id={"Demanda" + index}
							defaultValue={`0`}
						/>
					</Sth>
				))}
				<ThFD style={{ borderBottomRightRadius: "10px" }}>-</ThFD>
			</tr>
		</tfoot>
	);
};

export default TableFoot;
