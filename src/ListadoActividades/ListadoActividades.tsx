import React, { useRef, useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Breadcrumb, Button, Space, Table, Tooltip } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import {
	HomeOutlined,
	ReadOutlined,
	ReloadOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fontFamily, secondaryColor } from "../general/constants";
import { Actividad } from "./types";
import MainLayout from "../general/MainLayout";

type OnChange = NonNullable<TableProps<Actividad>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ListadoActividades: React.FC = () => {
	const añadirItemRef = useRef<HTMLButtonElement>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	const [filteredInfo, setFilteredInfo] = useState<Filters>({});
	const [sortedInfo, setSortedInfo] = useState<Sorts>({});

	const [data, setData] = useState<Actividad[]>([]);

	const fetchData = async () => {};

	const handleChange: OnChange = (pagination, filters, sorter) => {
		console.log("Various parameters", pagination, filters, sorter);
		setFilteredInfo(filters);
		setSortedInfo(sorter as Sorts);
	};

	const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
		console.log(info?.source, value);

	const columns: TableColumnsType<Actividad> = [
		{
			title: "Descripcion",
			dataIndex: "descripcion",
			key: "descripcion",
			filteredValue: filteredInfo.name || null,
			sorter: (a, b) => {
				const displayNameA = a?.descripcion ?? ""; // Si a.user o a.user.displayName son null o undefined, se asigna una cadena vacía
				const displayNameB = b?.descripcion ?? ""; // Lo mismo para b.user.displayName
				return displayNameA.length - displayNameB.length;
			},
			sortOrder:
				sortedInfo.columnKey === "descripcion" ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: "Nro. Depositos",
			dataIndex: "nroFuentes",
			key: "nroFuentes",
			filteredValue: filteredInfo.name || null,
			ellipsis: true,
		},
		{
			title: "Action",
			key: "action",
			render: () => {
				return (
					<Space size="middle">
						<Tooltip title="Ver actividad">
							<Button
								onClick={() => {
									navigate("");
								}}
								shape="circle"
								icon={<SearchOutlined />}
							/>
						</Tooltip>
					</Space>
				);
			},
		},
	];

	const handleRefresh = () => {
		setData([]);
		setLoading(true);
		fetchData();
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
				<Space style={{ marginBottom: 16 }}>
					<Search
						placeholder="input search text"
						onSearch={onSearch}
						enterButton
						style={{ fontFamily: fontFamily }}
					/>
					<Button
						style={{ fontFamily: fontFamily, color: secondaryColor }}
						type="primary"
						ref={añadirItemRef}
						icon={<ReadOutlined />}
						onClick={() => {}}
					>
						{`Crear una actividad`}
					</Button>

					<Button
						onClick={() => {
							handleRefresh();
						}}
						shape="round"
						icon={<ReloadOutlined />}
					/>
				</Space>
				<Table
					loading={loading}
					columns={columns}
					dataSource={data}
					onChange={handleChange}
				/>
			</>
		</MainLayout>
	);
};

export default ListadoActividades;
