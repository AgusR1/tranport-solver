import { Col, Form, InputNumber, Row, Space } from "antd";
import { Controller, useForm } from "react-hook-form";
import { fontFamily } from "../general/constants";
import { EnvironmentOutlined, TruckOutlined } from "@ant-design/icons";
import React from "react";

interface Props {
	setValuesForm: React.Dispatch<
		React.SetStateAction<{
			nroDestinos: number;
			nroFuentes: number;
		}>
	>;
	valuesForm: {
		nroDestinos: number;
		nroFuentes: number;
	};
}

const FormCreacionMatriz: React.FC<Props> = ({
	setValuesForm,
	valuesForm: { nroDestinos, nroFuentes },
}) => {
	const { control, handleSubmit, getValues } = useForm<{
		nroDestinos: number;
		nroFuentes: number;
	}>({
		defaultValues: {
			nroDestinos: nroDestinos,
			nroFuentes: nroFuentes,
		},
	});

	const onFormChange = () => {
		const nroFuentes = getValues("nroFuentes");
		const nroDestinos = getValues("nroDestinos");
		setValuesForm({
			nroDestinos: nroDestinos,
			nroFuentes: nroFuentes,
		});
	};
	return (
		<form onSubmit={handleSubmit(onFormChange)}>
			<Space
				direction="vertical"
				size="middle"
				style={{ display: "flex", padding: "2em" }}
			>
				<Row
					style={{
						marginLeft: "auto",
						marginRight: "auto",
						width: "50%",
					}}
					gutter={[16, 16]}
				>
					<Col style={{ marginTop: "24px" }} className="gutter-row" span={24}>
						<Form.Item label="Nro. Destinos">
							<Controller
								name="nroDestinos"
								control={control}
								rules={{
									required: "Campo requerido",
								}}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<InputNumber
										onChange={onChange}
										style={{ fontFamily: fontFamily, width: "100%" }}
										placeholder="Destinos"
										value={value}
										addonAfter={<EnvironmentOutlined />}
										controls
										status={error ? "error" : undefined}
									/>
								)}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row
					style={{
						marginLeft: "auto",
						marginRight: "auto",
						width: "50%",
					}}
					gutter={[16, 16]}
				>
					<Col style={{ marginTop: "24px" }} className="gutter-row" span={24}>
						<Form.Item label="Nro. Depositos">
							<Controller
								name="nroFuentes"
								control={control}
								rules={{
									required: "Campo requerido",
								}}
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<InputNumber
										onChange={onChange}
										style={{ fontFamily: fontFamily, width: "100%" }}
										placeholder="Fuentes"
										value={value}
										addonAfter={<TruckOutlined />}
										controls
										status={error ? "error" : undefined}
									/>
								)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Space>
		</form>
	);
};

export default FormCreacionMatriz;
