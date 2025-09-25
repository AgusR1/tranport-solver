import React from "react";
import {observer} from "mobx-react-lite";
import {Table, Typography} from "antd";
import type {ColumnsType} from "antd/es/table";
import problemaStore from "../../store/problema.store.ts";
import "./MatrizCostos.css";
import {useAsignacionesMap} from "./hooks/useAsignacionesMap";
import {useDemandaInputs} from "./hooks/useDemandaInputs";
import DemandaSummary from "./components/DemandaSummary";
import {type RowData, useMatrizColumns} from "./hooks/useMatrizColumns";

const {Title} = Typography;

type Highlight = { row: number | null; col: number | null } | undefined;

type MatrizCostosProps = { readOnly?: boolean; highlight?: Highlight };

const MatrizCostos: React.FC<MatrizCostosProps> = observer(({readOnly = false, highlight}) => {
    const {
        fuentes,
        destinos,
        matriz,
        ofertas,
        demandas,
        depositosNombres,
        destinosNombres,
        setCosto,
        setDepositoNombre,
        setDestinoNombre,
    } = problemaStore;

    const f = fuentes ?? 0;
    const d = destinos ?? 0;

    // SRP hooks
    const asigMap = useAsignacionesMap();
    const {demandaInputs, setDemandaInputs, commitDemanda} = useDemandaInputs();

    // --- Columnas extraídas via hook ---
    const columns: ColumnsType<RowData> = useMatrizColumns({
        readOnly,
        highlight,
        d,
        matriz,
        depositosNombres,
        destinosNombres,
        ofertas,
        setCosto,
        setDepositoNombre,
        setDestinoNombre,
        setOferta: (i, value) => problemaStore.setOferta(i, value),
        asigMap,
    });

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
        <div style={{padding: readOnly ? 0 : 8, background: "#fff", borderRadius: 12}}>
            {!readOnly && <Title level={4} style={{marginBottom: 16}}>
                Matriz de Costos
            </Title>}

            {f === 0 || d === 0 ? (
                <Title level={5} style={{textAlign: "center", marginTop: 16}}>
                    Configura primero la cantidad de fuentes y destinos.
                </Title>
            ) : (
                <Table<RowData>
                    bordered
                    pagination={false}
                    size="small"
                    dataSource={dataSource}
                    columns={columns}
                    style={{width: "100%"}}
                    tableLayout="fixed"
                    scroll={{x: true}}
                    summary={() => (
                        <DemandaSummary
                            d={d}
                            readOnly={readOnly}
                            highlight={highlight}
                            demandas={demandas}
                            demandaInputs={demandaInputs}
                            onInputChange={(j, value) =>
                                setDemandaInputs(prev => {
                                    const next = [...prev];
                                    next[j] = value;
                                    return next;
                                })
                            }
                            onBlurCommit={commitDemanda}
                        />
                    )}
                />
            )}

        </div>
    );
});

export default MatrizCostos;
