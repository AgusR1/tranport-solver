import { TeamOutlined } from "@ant-design/icons";
import { Flex, Layout, Space, theme } from "antd";
import React from "react";
import Title from "antd/es/typography/Title";
import { fontFamily, secondaryColor } from "./constants";

const { Header, Content, Footer } = Layout;
const boxStyle: React.CSSProperties = {
	width: "100%",
};
interface Props {
	children?: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
	const {
		token: { colorPrimary },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header style={{ padding: 0, background: colorPrimary }}>
				<Flex style={boxStyle} align="center" justify="space-evenly">
					<Space.Compact style={{ paddingLeft: "20px" }} direction="vertical">
						<TeamOutlined
							style={{
								fontSize: "40px",
								color: secondaryColor,
								display: "flex",
								justifyContent: "center",
							}}
						/>
						<Title
							style={{
								marginBlockEnd: 0,
								marginBlockStart: 0,
								color: secondaryColor,
								fontFamily: fontFamily,
							}}
							level={5}
						>
							Transport-Solver
						</Title>
					</Space.Compact>
				</Flex>
			</Header>
			<Content style={{ padding: "0 48px" }}>{children}</Content>
			<Footer style={{ textAlign: "center", fontFamily: fontFamily }}>
				Transport-Solver ©{new Date().getFullYear()}
			</Footer>
		</Layout>
	);
};

export default MainLayout;
