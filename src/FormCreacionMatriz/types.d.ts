import { ReactNode } from "react";

export interface FormItemProps {
	name: string;
	label: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<FormValues, any>;
	icon: ReactNode;
}
