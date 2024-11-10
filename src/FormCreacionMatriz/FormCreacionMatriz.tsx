import { useForm, FormProvider } from "react-hook-form";
import React, { useContext } from "react";
import { StepperContext } from "../context/StepperContext";
import InnerFormComponent from "../MatrizTransporte/InnerFormComponent";

const FormCreacionMatriz: React.FC = () => {
	const { valuesForm } = useContext(StepperContext) ?? {};

	if (valuesForm === undefined) {
		throw new Error("FormCreacionMatriz debe estar dentro de un AppProvider");
	}

	const methods = useForm({
		defaultValues: {
			nroDestinos: valuesForm.nroDestinos,
			nroFuentes: valuesForm.nroFuentes,
		},
	});

	return (
		<FormProvider {...methods}>
			<InnerFormComponent />
		</FormProvider>
	);
};
export default FormCreacionMatriz;
