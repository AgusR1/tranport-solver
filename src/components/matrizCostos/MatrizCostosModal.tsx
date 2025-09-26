import React, { useCallback, useRef, useState } from "react";
import {Modal, Typography, Space, Button} from "antd";
import {observer} from "mobx-react-lite";
import MatrizCostos from "./MatrizCostos.tsx";
import PasoLog from "../pasoLog/PasoLog.tsx";
import problemaStore from "../../store/problema.store.ts";
import { useMatrizCostosModal } from "./useMatrizCostosModal.ts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const {Title} = Typography;

export type MatrizCostosModalProps = {
    open: boolean;
    onClose: () => void;
};

const MatrizCostosModal: React.FC<MatrizCostosModalProps> = observer(({open, onClose}) => {
    const width = Math.min(1200, typeof window !== "undefined" ? window.innerWidth - 80 : 1200);

    const {logs, asignaciones} = problemaStore;

    const { visibleCount, activeIndex, highlight, onItemHover, onItemLeave, skipToEnd, replay, speed, setSpeed } = useMatrizCostosModal(
        open,
        logs,
        asignaciones
    );

    const matrizRef = useRef<HTMLDivElement | null>(null);
    const logRef = useRef<HTMLDivElement | null>(null);
    const [exporting, setExporting] = useState(false);

    const pxToMm = (px: number) => px * 0.264583; // 96 DPI

    const handleExportPdf = useCallback(async () => {
        if (!matrizRef.current || !logRef.current) return;
        try {
            setExporting(true);
            // Capture both sections
            const [matCanvas, logCanvas] = await Promise.all([
                html2canvas(matrizRef.current, { backgroundColor: "#ffffff", scale: 2, useCORS: true }),
                html2canvas(logRef.current, { backgroundColor: "#ffffff", scale: 2, useCORS: true })
            ]);

            // Stitch vertically with padding
            const padding = 24; // px
            const combinedWidth = Math.max(matCanvas.width, logCanvas.width);
            const combinedHeight = matCanvas.height + padding + logCanvas.height;
            const comboCanvas = document.createElement("canvas");
            comboCanvas.width = combinedWidth;
            comboCanvas.height = combinedHeight;
            const ctx = comboCanvas.getContext("2d");
            if (!ctx) throw new Error("No se pudo crear el contexto del canvas");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, combinedWidth, combinedHeight);

            // Center each image horizontally
            const matX = (combinedWidth - matCanvas.width) / 2;
            ctx.drawImage(matCanvas, matX, 0);
            const logX = (combinedWidth - logCanvas.width) / 2;
            ctx.drawImage(logCanvas, logX, matCanvas.height + padding);

            // Prepare PDF (landscape to better fit wide tables)
            const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10; // mm

            const comboWidthMm = pxToMm(combinedWidth);
            const comboHeightMm = pxToMm(combinedHeight);
            const scale = Math.min((pageWidth - margin * 2) / comboWidthMm, (pageHeight - margin * 2) / comboHeightMm);
            const renderWidthMm = comboWidthMm * scale;
            const renderHeightMm = comboHeightMm * scale;
            const x = (pageWidth - renderWidthMm) / 2;
            const y = (pageHeight - renderHeightMm) / 2;

            const imgData = comboCanvas.toDataURL("image/png");
            pdf.addImage(imgData, "PNG", x, y, renderWidthMm, renderHeightMm, undefined, "FAST");
            pdf.save("solucion.pdf");
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        } finally {
            setExporting(false);
        }
    }, []);

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
                <div ref={matrizRef}>
                    <MatrizCostos readOnly highlight={highlight}/>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Space>
                        <Button onClick={replay} disabled={logs.length === 0}>Reproducir</Button>
                        <Space>
                            <Button type={speed === 1400 ? "primary" : "default"} onClick={() => setSpeed(1400)}>0.5x</Button>
                            <Button type={speed === 900 ? "primary" : "default"} onClick={() => setSpeed(900)}>1x</Button>
                            <Button type={speed === 450 ? "primary" : "default"} onClick={() => setSpeed(450)}>2x</Button>
                        </Space>
                        <Button onClick={skipToEnd} disabled={visibleCount >= logs.length}>Saltar al resultado</Button>
                    </Space>
                    <Space>
                        <Button type="primary" onClick={handleExportPdf} loading={exporting} disabled={!open}>Exportar PDF</Button>
                    </Space>
                </div>
                <div ref={logRef}>
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
