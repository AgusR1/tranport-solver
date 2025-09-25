import React from "react";
import {Modal, Typography, Space, Button} from "antd";
import {observer} from "mobx-react-lite";
import MatrizCostos from "./MatrizCostos.tsx";
import PasoLog from "../pasoLog/PasoLog.tsx";
import problemaStore from "../../store/problema.store.ts";
import { useMatrizCostosModal } from "./useMatrizCostosModal.ts";

const {Title} = Typography;

export type MatrizCostosModalProps = {
    open: boolean;
    onClose: () => void;
};

const MatrizCostosModal: React.FC<MatrizCostosModalProps> = observer(({open, onClose}) => {
    const width = Math.min(1200, typeof window !== "undefined" ? window.innerWidth - 80 : 1200);

    const {logs, asignaciones} = problemaStore;

    const { visibleCount, activeIndex, highlight, onItemHover, onItemLeave, skipToEnd } = useMatrizCostosModal(
        open,
        logs,
        asignaciones
    );

    return (
        <Modal
            title="Matriz de costos (solo lectura)"
            open={open}
            onCancel={onClose}
            footer={null}
            width={width}
            destroyOnHidden={true}
        >
            <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                <MatrizCostos readOnly highlight={highlight}/>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    {visibleCount < logs.length && (
                        <Space>
                            <Button onClick={skipToEnd}>Saltar al resultado</Button>
                        </Space>
                    )}
                </div>
                <div>
                    <Title level={5} style={{margin: "8px 0"}}>Log de solución</Title>
                    <PasoLog
                        logs={logs}
                        onItemHover={onItemHover}
                        onItemLeave={onItemLeave}
                        activeIndex={activeIndex ?? undefined}
                        visibleCount={visibleCount}
                    />
                </div>
            </div>
        </Modal>
    );
});

export default MatrizCostosModal;
