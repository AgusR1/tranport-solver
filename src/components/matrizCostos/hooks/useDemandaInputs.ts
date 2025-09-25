import React from "react";
import problemaStore from "../../../store/problema.store";

// Hook SRP: buffer editing of demandas and commit on blur
export function useDemandaInputs() {
  const { demandas, destinos, setDemanda } = problemaStore;
  const d = destinos ?? 0;

  const [demandaInputs, setDemandaInputs] = React.useState<(number | null)[]>(() => [...demandas]);

  React.useEffect(() => {
    setDemandaInputs([...demandas]);
  }, [d, demandas]);

  const commitDemanda = React.useCallback((j: number) => {
    const v = demandaInputs[j];
    setDemanda(j, (typeof v === 'number' && !Number.isNaN(v)) ? v : 0);
  }, [demandaInputs, setDemanda]);

  return { demandaInputs, setDemandaInputs, commitDemanda } as const;
}

export type UseDemandaInputs = ReturnType<typeof useDemandaInputs>;
