import React, { useRef, useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import {
	EditOutlined,
	LockOutlined,
	ReadOutlined,
	ReloadOutlined,
	SearchOutlined,
	UnlockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fontFamily, secondaryColor } from "../general/constants";
import { Actividad } from "./types";

type OnChange = NonNullable<TableProps<Actividad>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ListadoActividades: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const añadirItemRef = useRef<HTMLButtonElement>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [actividad, setActividad] = useState<Partial<Actividad> | null>(null);
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

	const handleOpenModalCreaActividad = () => {
		setOpen(true);
		setIsEdit(false);
		setActividad(null);
	};

	const columns: TableColumnsType<Actividad> = [
		{
			title: "Nombre",
			dataIndex: "nombre",
			key: "nombre",
			filteredValue: filteredInfo.name || null,
			sorter: (a, b) => {
				const displayNameA = a?.nombre ?? ""; // Si a.user o a.user.displayName son null o undefined, se asigna una cadena vacía
				const displayNameB = b?.nombre ?? ""; // Lo mismo para b.user.displayName
				return displayNameA.length - displayNameB.length;
			},
			sortOrder: sortedInfo.columnKey === "nombre" ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: "Tipo de actividad",
			dataIndex: "tipoActividad",
			key: "tipoActividad",
			filteredValue: filteredInfo.name || null,
			sorter: (a, b) => {
				const displayNameA = a?.tipoActividad ?? ""; // Si a.user o a.user.displayName son null o undefined, se asigna una cadena vacía
				const displayNameB = b?.tipoActividad ?? ""; // Lo mismo para b.user.displayName
				return displayNameA.length - displayNameB.length;
			},
			sortOrder:
				sortedInfo.columnKey === "tipoActividad" ? sortedInfo.order : null,
			ellipsis: true,
			render: (_, { tipoActividad }) => {
				return getTipoActividadNombre(tipoActividad);
			},
		},
		{
			title: "Estado",
			dataIndex: "abierta",
			key: "abierta",
			filteredValue: filteredInfo.name || null,
			ellipsis: true,
			render: (_, { abierta }) => {
				return abierta ? (
					<Tag
						style={{
							fontFamily: fontFamily,
							fontSize: "1em",
							padding: "4px",
						}}
						icon={<UnlockOutlined />}
						color="#4cd411"
					>
						Abierta
					</Tag>
				) : (
					<Tag
						style={{
							fontFamily: fontFamily,
							fontSize: "1em",
							padding: "4px",
						}}
						icon={<LockOutlined />}
						color="#ee4452"
					>
						Cerrada
					</Tag>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			render: (
				_: any,
				{
					id,
					abierta,
					nombre,
					tipoActividad,
					problemaTransporteInfo,
					salaId,
				}: Actividad
			) => {
				return (
					<Space size="middle">
						<Tooltip title="Ver actividad">
							<Button
								onClick={() => {
									navigate(`/salas/${salaId}/actividad/${id}`);
								}}
								shape="circle"
								icon={<SearchOutlined />}
							/>
						</Tooltip>
						<Tooltip title="Renombrar actividad">
							<Button
								onClick={() => {}}
								shape="circle"
								icon={<EditOutlined />}
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
		<>
			<Space style={{ marginBottom: 16 }}>
				<Search
					placeholder="input search text"
					onSearch={onSearch}
					enterButton
					style={{ fontFamily: fontFamily }}
				/>
				{sala?.ownerId === user?.uid && (
					<Button
						style={{ fontFamily: fontFamily, color: secondaryColor }}
						type="primary"
						ref={añadirItemRef}
						icon={<ReadOutlined />}
						onClick={handleOpenModalCreaActividad}
					>
						{`Crear una actividad`}
					</Button>
				)}

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
			{open && (
				<ModalActividad
					setOpen={setOpen}
					open={open}
					isEdit={isEdit}
					actividad={actividad}
					fetchData={fetchData}
				/>
			)}
		</>
	);
};

export default ListadoActividades;
