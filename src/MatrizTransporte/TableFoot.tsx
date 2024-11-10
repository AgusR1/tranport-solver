import { useContext } from "react";
import { Sth, ThFD, UnstyledInput } from "./TableComponents";
import { StepperContext } from "../context/StepperContext";
import { PropsFooter } from "./types";

const TableFoot: React.FC<PropsFooter> = ({ inputsRefDemandas }) => {
	const { valuesForm } = useContext(StepperContext) ?? {};
	if (valuesForm === undefined) {
		throw new Error("TableHead debe estar dentro de un AppProvider");
	}
	return (
		<tfoot>
			<tr>
				<ThFD style={{ borderBottomLeftRadius: "10px" }}>Demanda</ThFD>
				{[...Array(valuesForm.nroDestinos)].map((_, index) => (
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
	);
};

export default TableFoot;
