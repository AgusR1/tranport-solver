import React from "react";

export type Asignacion = { fuente: number; destino: number };

export type UseMatrizCostosModalResult = {
    visibleCount: number;
    activeIndex: number | null;
    highlight: { row: number | null; col: number | null } | undefined;
    onItemHover: (logIndex: number) => void;
    onItemLeave: () => void;
    skipToEnd: () => void;
    replay: () => void;
    speed: number; // interval in ms
    setSpeed: (ms: number) => void;
};

export function useMatrizCostosModal(
    open: boolean,
    logs: string[],
    asignaciones: Asignacion[]
): UseMatrizCostosModalResult {
    const [visibleCount, setVisibleCount] = React.useState(0);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [autoHighlight, setAutoHighlight] = React.useState<{
        row: number | null;
        col: number | null;
    } | undefined>();
    const [manualHighlight, setManualHighlight] = React.useState<{
        row: number | null;
        col: number | null;
    } | undefined>();
    const timerRef = React.useRef<number | null>(null);
    const [speed, setSpeed] = React.useState<number>(900); // ms per step

    const isAssignmentLog = React.useCallback((s: string) => {
        return s.includes("Se asignan") || s.includes("Seleccionamos la celda");
    }, []);

    const mapLogToAssignment = React.useCallback(
        (logIndex: number) => {
            let assignIdx = -1;
            for (let k = 0, seen = 0; k <= logIndex && k < logs.length; k++) {
                if (isAssignmentLog(logs[k])) {
                    assignIdx = seen;
                    seen++;
                }
            }
            if (assignIdx >= 0 && assignIdx < asignaciones.length) {
                const a = asignaciones[assignIdx];
                return {row: a.fuente, col: a.destino} as {
                    row: number | null;
                    col: number | null;
                };
            }
            return undefined;
        },
        [logs, asignaciones, isAssignmentLog]
    );

    const onItemHover = React.useCallback(
        (logIndex: number) => {
            // Si se hace hover sobre el último item, no mostramos highlight
            if (logIndex === logs.length - 1) {
                setManualHighlight(undefined);
            } else {
                setManualHighlight(mapLogToAssignment(logIndex));
            }
        },
        [mapLogToAssignment, logs.length]
    );

    const onItemLeave = React.useCallback(() => setManualHighlight(undefined), []);

    React.useEffect(() => {
        if (open) {
            setVisibleCount(0);
            setActiveIndex(null);
            setAutoHighlight(undefined);
            setManualHighlight(undefined);

            const step = () => {
                setVisibleCount((prev) => {
                    const next = Math.min(prev + 1, logs.length);
                    if (next > 0) {
                        const currentIndex = next - 1;
                        setActiveIndex(currentIndex);
                        setAutoHighlight(mapLogToAssignment(currentIndex));
                    }
                    if (next === logs.length) {
                        // Al llegar al último paso, detenemos el timer y limpiamos el autoHighlight
                        if (timerRef.current) {
                            window.clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                        setAutoHighlight(undefined);
                    }
                    return next;
                });
            };

            timerRef.current = window.setInterval(step, speed);
            setTimeout(step, 200);
        } else {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setVisibleCount(0);
            setActiveIndex(null);
            setAutoHighlight(undefined);
            setManualHighlight(undefined);
        }

        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [open, logs.length, mapLogToAssignment, speed]);

    const skipToEnd = React.useCallback(() => {
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setVisibleCount(logs.length);
        setActiveIndex(logs.length > 0 ? logs.length - 1 : null);
        setAutoHighlight(undefined);
    }, [logs.length]);

    const replay = React.useCallback(() => {
        // Reinicia la animación desde el principio
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setVisibleCount(0);
        setActiveIndex(null);
        setAutoHighlight(undefined);
        setManualHighlight(undefined);

        const step = () => {
            setVisibleCount((prev) => {
                const next = Math.min(prev + 1, logs.length);
                if (next > 0) {
                    const currentIndex = next - 1;
                    setActiveIndex(currentIndex);
                    setAutoHighlight(mapLogToAssignment(currentIndex));
                }
                if (next === logs.length) {
                    if (timerRef.current) {
                        window.clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                    setAutoHighlight(undefined);
                }
                return next;
            });
        };

        timerRef.current = window.setInterval(step, speed);
        setTimeout(step, 200);
    }, [logs.length, mapLogToAssignment, speed]);

    const highlight = manualHighlight ?? autoHighlight;

    return {
        visibleCount,
        activeIndex,
        highlight,
        onItemHover,
        onItemLeave,
        skipToEnd,
        replay,
        speed,
        setSpeed,
    };
}
