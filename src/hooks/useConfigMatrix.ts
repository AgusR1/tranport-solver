import { useState } from "react";

export const useConfigMatrix = () => {
	const [valuesForm, setValuesForm] = useState({
		nroDestinos: 0,
		nroFuentes: 0,
		result: [] as string[],
	});
	return {
		valuesForm,
		setValuesForm,
	};
};
