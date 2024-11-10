import { Form, InputNumber } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { fontFamily } from "../general/constants";
import React from "react";
import { FormItemProps } from "./types";

const FormItem: React.FC<Omit<FormItemProps, "control">> = ({
	name,
	label,
	icon,
}) => {
	const formContext = useFormContext();

	if (!formContext) {
		throw new Error("FormItem debe usarse dentro de un FormProvider.");
	}

	const { control } = formContext;

	return (
		<Form.Item label={label}>
			<Controller
				name={name}
				control={control}
				rules={{
					required: "Campo requerido",
				}}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<InputNumber
						onChange={onChange}
						style={{ fontFamily: fontFamily, width: "100%" }}
						placeholder="Fuentes"
						value={value}
						addonAfter={icon}
						controls
						status={error ? "error" : undefined}
					/>
				)}
			/>
		</Form.Item>
	);
};

export default FormItem;
