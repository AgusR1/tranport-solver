import { Col, Row, Space } from "antd";
import useSyncWithStepper from "../hooks/useSyncWithStepper";
import FormItem from "../FormCreacionMatriz/FormItem";
import { EnvironmentOutlined, TruckOutlined } from "@ant-design/icons";
const rowStyle: React.CSSProperties = {
	marginLeft: "auto",
	marginRight: "auto",
	width: "50%",
};
const InnerFormComponent = () => {
	useSyncWithStepper(); // Aquí se llama al hook ya dentro de FormProvider

	return (
		<form>
			<Space
				direction="vertical"
				size="middle"
				style={{ display: "flex", padding: "2em" }}
			>
				<Row style={rowStyle} gutter={[16, 16]}>
					<Col style={{ marginTop: "24px" }} className="gutter-row" span={24}>
						<FormItem
							label="Nro. Destinos"
							name="nroDestinos"
							icon={<EnvironmentOutlined />}
						/>
					</Col>
				</Row>
				<Row style={rowStyle} gutter={[16, 16]}>
					<Col style={{ marginTop: "24px" }} className="gutter-row" span={24}>
						<FormItem
							label="Nro. Fuentes"
							name="nroFuentes"
							icon={<TruckOutlined />}
						/>
					</Col>
				</Row>
			</Space>
		</form>
	);
};

export default InnerFormComponent;
