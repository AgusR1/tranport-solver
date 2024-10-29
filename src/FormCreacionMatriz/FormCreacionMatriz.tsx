import { Form, Input } from "antd";

const FormCreacionMatriz = () => {
	const [form] = Form.useForm();

	const onFormChange = () => {
		console.log(form.getFieldsValue());
	};
	return (
		<Form
			style={{ padding: "1em", maxWidth: "600px", margin: "auto" }}
			layout="vertical"
			form={form}
			onValuesChange={onFormChange}
		>
			<Form.Item label="Nro. Destinos">
				<Input placeholder="Nro. Destinos" type="number" />
			</Form.Item>
			<Form.Item label="Nro. Depositos">
				<Input placeholder="Nro. Depositos" type="number" />
			</Form.Item>
		</Form>
	);
};

export default FormCreacionMatriz;
