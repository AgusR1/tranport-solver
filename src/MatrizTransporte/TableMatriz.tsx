import { useContext } from "react";
import TableBody from "./TableBody";
import { Table } from "./TableComponents";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";
import { TableMatrizProps } from "./types";
import { StepperContext } from "../context/StepperContext";

const TableMatriz: React.FC<TableMatrizProps> = ({ expanded, control }) => {
	const { inputsRefs } = useContext(StepperContext) ?? {};
	if (inputsRefs === undefined) {
		throw new Error("TableHead debe estar dentro de un AppProvider");
	}
	return (
		<Table
			style={{
				maxWidth: expanded ? "100%" : "80%",
				marginLeft: expanded ? undefined : "auto",
				marginRight: expanded ? undefined : "auto",
			}}
		>
			<TableHead inputsRefDestinos={inputsRefs.destinos} />
			<TableFoot inputsRefDemandas={inputsRefs.demandas} />
			<TableBody
				inputsRefOferta={inputsRefs.ofertas}
				inputsRefDepositos={inputsRefs.depositos}
				control={control}
			/>
		</Table>
	);
};

export default TableMatriz;
