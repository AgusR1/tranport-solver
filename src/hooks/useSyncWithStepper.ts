import { useFormContext } from "react-hook-form";
import { useContext, useEffect, useCallback } from "react";
import { StepperContext } from "../context/StepperContext";

const useSyncWithStepper = () => {
	const formContext = useFormContext();
	const { setValuesForm } = useContext(StepperContext) ?? {};

	if (!formContext || !setValuesForm) {
		throw new Error("useSyncWithStepper debe estar dentro de un Form provider");
	}

	const { watch } = formContext;

	const handleWatch = useCallback(() => {
		const subscription = watch((values) => {
			setValuesForm((prevValues) => ({ ...prevValues, ...values }));
		});
		return () => subscription.unsubscribe();
	}, [watch, setValuesForm]); // Dependencias memoizadas para evitar actualizaciones infinitas

	// Ejecuta el efecto una vez, evitando dependencias que cambien constantemente.
	useEffect(() => {
		return handleWatch();
	}, [handleWatch]);
};

export default useSyncWithStepper;
