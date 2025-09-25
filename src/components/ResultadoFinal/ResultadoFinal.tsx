import React from "react";
import { observer } from "mobx-react-lite";
import { Card, Table, Collapse, Typography } from "antd";
import problemaStore from "../../store/problema.store.ts";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ResultadoFinal: React.FC = observer(() => {
  const { asignaciones, costoMinimo, logs, depositosNombres, destinosNombres } = problemaStore;

  const columns = [
    {
      title: "Depósito",
      dataIndex: "fuente",
      key: "fuente",
      render: (index: number) => depositosNombres[index] || `Depósito ${index + 1}`,
    },
    {
      title: "Destino",
      dataIndex: "destino",
      key: "destino",
      render: (index: number) => destinosNombres[index] || `Destino ${index + 1}`,
    },
    {
      title: "Cantidad asignada",
      dataIndex: "cantidad",
      key: "cantidad",
    },
  ];

  return (
    <div style={{ marginTop: 4 }}>
      <Card size="small"styles={{body:{padding:8}}}>
        <Title level={4} style={{ marginBottom: 4 }}>Resultados del Problema</Title>
        <Text strong>Costo total: </Text>
        <Text type="success">{costoMinimo}</Text>

        <Table
          dataSource={asignaciones.map((a, i) => ({ ...a, key: i }))}
          columns={columns}
          pagination={false}
          size="small"
          style={{ marginTop: 8 }}
        />

        <Collapse accordion size="small" style={{ marginTop: 8 }}>
          <Panel header="Ver pasos del algoritmo" key="1">
            {logs.map((log, i) => (
              <p key={i} style={{ marginBottom: 2 }}>
                {log}
              </p>
            ))}
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
});

export default ResultadoFinal;
