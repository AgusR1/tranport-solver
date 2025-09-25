import React from "react";
import problemaStore from "../../../store/problema.store";

// Hook SRP: build a quick lookup map for assigned quantities per (i,j)
export function useAsignacionesMap() {
  const { asignaciones } = problemaStore;
  return React.useMemo(() => {
    const m = new Map<string, number>();
    asignaciones.forEach(a => {
      const k = `${a.fuente}-${a.destino}`;
      m.set(k, (m.get(k) || 0) + a.cantidad);
    });
    return m;
  }, [asignaciones]);
}

export type AsigMap = ReturnType<typeof useAsignacionesMap>;
