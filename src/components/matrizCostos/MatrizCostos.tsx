import React from "react";
import {observer} from "mobx-react-lite";
import {Table, InputNumber, Input, Typography, Space} from "antd";
import type { ColumnsType } from "antd/es/table";
import problemaStore from "../../store/problema.store.ts";

const {Title} = Typography;

const MatrizCostos: React.FC = observer(() => {
  const {
    fuentes,
    destinos,
    matriz,
    ofertas,
    demandas,
    depositosNombres,
    destinosNombres,
    setCosto,
    setOferta,
    setDemanda,
    setDepositoNombre,
    setDestinoNombre,
  } = problemaStore;

  const f = fuentes ?? 0;
  const d = destinos ?? 0;

  if (f === 0 || d === 0) {
    return (
      <Title level={5} style={{textAlign: "center", marginTop: 16}}>
        Configura primero la cantidad de fuentes y destinos.
      </Title>
    );
  }

  type RowData = {
    key: number;
    deposito: string;
    oferta: number;
    [key: `destino_${number}`]: number;
  };

  // --- Construir columnas dinámicamente ---
  const destinoColumns: ColumnsType<RowData> = Array.from({ length: d }, (_, j) => ({
    title: (
      <Input
        value={destinosNombres[j]}
        onChange={(e) => setDestinoNombre(j, e.target.value)}
      />
    ),
    dataIndex: `destino_${j}` as const,
    key: `destino_${j}`,
    align: "center" as const,
    width: 120,
    render: (_value: number | undefined, _record: RowData, i: number) => (
      <InputNumber
        min={0}
        value={matriz[i!][j]}
        onChange={(value) => setCosto(i!, j, value || 0)}
      />
    ),
  }));

  const columns: ColumnsType<RowData> = [
    {
      title: "Depósitos / Destinos",
      dataIndex: "deposito",
      key: "deposito",
      width: 180,
      render: (_, __, rowIndex: number) => (
        <Input
          value={depositosNombres[rowIndex!]}
          onChange={(e) => setDepositoNombre(rowIndex!, e.target.value)}
        />
      ),
    },
    ...destinoColumns,
    {
      title: "Oferta",
      dataIndex: "oferta",
      key: "oferta",
      align: "center" as const,
      width: 120,
      render: (_, __, i: number) => (
        <InputNumber
          min={0}
          value={ofertas[i!]}
          onChange={(value) => setOferta(i!, value || 0)}
        />
      ),
    },
  ];

  // --- Construir filas dinámicamente ---
  const dataSource: RowData[] = Array.from({length: f}, (_, i) => {
    const row = {
      key: i,
      deposito: depositosNombres[i],
      oferta: ofertas[i],
    } as RowData;

    for (let j = 0; j < d; j++) {
      (row as { [k: `destino_${number}`]: number })[`destino_${j}`] = matriz[i][j];
    }

    return row;
  });

  return (
    <div style={{padding: 16, background: "#fff", borderRadius: 12}}>
      <Title level={4} style={{marginBottom: 16}}>
        Matriz de Costos
      </Title>

      <Table<RowData>
        bordered
        pagination={false}
        size="small"
        dataSource={dataSource}
        columns={columns}
        scroll={{x: "max-content"}}
      />

      <Space
        style={{
          marginTop: 16,
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Title level={5}>Demandas:</Title>
        {Array.from({length: d}, (_, j) => (
          <InputNumber
            key={j}
            min={0}
            value={demandas[j]}
            onChange={(value) => setDemanda(j, value || 0)}
          />
        ))}
      </Space>
    </div>
  );
});

export default MatrizCostos;
