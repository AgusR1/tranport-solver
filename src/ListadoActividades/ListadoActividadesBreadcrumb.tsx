import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const ListadoActividadesBreadcrumb = () => {
	return (
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
	);
};

export default ListadoActividadesBreadcrumb;
