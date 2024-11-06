import React, { useState } from "react";
import { Breadcrumb, Button, message, Steps, theme } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import MainLayout from "../general/MainLayout";
import FormCreacionMatriz from "../FormCreacionMatriz/FormCreacionMatriz";
import MatrizTransporte from "../MatrizTransporte/MatrizTransporte";

const StepperActividad: React.FC = () => {
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(0);
	const [result, setResult] = useState<string[]>([]);
	const [valuesForm, setValuesForm] = useState({
		nroDestinos: 0,
		nroFuentes: 0,
	});

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};
	const steps = [
		{
			title: "Definir matriz",
			content: (
				<FormCreacionMatriz
					setValuesForm={setValuesForm}
					valuesForm={valuesForm}
				/>
			),
		},
		{
			title: "Ingresar valores",
			content: (
				<MatrizTransporte
					nroDestinos={valuesForm.nroFuentes}
					nroFuentes={valuesForm.nroDestinos}
					setResult={setResult}
				/>
			),
		},
		{
			title: "Resultados",
			content: "Last-content",
		},
	];
	const items = steps.map((item) => ({ key: item.title, title: item.title }));

	const contentStyle: React.CSSProperties = {
		lineHeight: "260px",
		textAlign: "center",
		color: token.colorTextTertiary,
		backgroundColor: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: `1px dashed ${token.colorBorder}`,
		marginTop: 16,
	};
	return (
		<MainLayout>
			<>
				<Breadcrumb
					style={{
						paddingTop: "0.5em",
						paddingBottom: "0.5em",
						fontFamily: "Josefin Sans",
					}}
					items={[
						{
							path: "/",
							title: (
								<>
									<HomeOutlined />
									<span>Menu principal</span>
								</>
							),
						},
					]}
				/>
				<Steps current={current} items={items} />
				<div style={contentStyle}>{steps[current].content}</div>
				<div style={{ marginTop: 24 }}>
					{current < steps.length - 1 && (
						<Button type="primary" onClick={() => next()}>
							Siguiente
						</Button>
					)}
					{current === steps.length - 1 && (
						<Button
							type="primary"
							onClick={() => message.success("Processing complete!")}
						>
							Hecho
						</Button>
					)}
					{current > 0 && (
						<Button style={{ margin: "0 8px" }} onClick={() => prev()}>
							Anterior
						</Button>
					)}
				</div>
			</>
		</MainLayout>
	);
};

export default StepperActividad;
