import TableBody from "./TableBody";
import { Table } from "./TableComponents";
import TableFoot from "./TableFoot";
import TableHead from "./TableHead";
import { TableMatrizProps } from "./types";

const TableMatriz: React.FC<TableMatrizProps> = ({ expanded, control }) => {
	return (
		<Table
			style={{
				maxWidth: expanded ? "100%" : "80%",
				marginLeft: expanded ? undefined : "auto",
				marginRight: expanded ? undefined : "auto",
			}}
		>
			<TableHead />
			<TableFoot />
			<TableBody control={control} />
		</Table>
	);
};

export default TableMatriz;
