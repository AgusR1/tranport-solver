import {Card, Radio, Button, type RadioChangeEvent} from "antd";
import {observer} from "mobx-react-lite";
import problemaStore from "../../store/problema.store";
import type { PropsWithChildren } from "react";

type Props = {
  onResolverClick?: () => void;
};

const AlgoritmoSelector = observer((props: PropsWithChildren<Props>) => {
  const {onResolverClick} = props;
  const {algoritmo, setAlgoritmo, matriz} = problemaStore;

  const handleChange = (e: RadioChangeEvent) => {
    // Solo actualizamos el algoritmo seleccionado.
    // La resolución debe ejecutarse explícitamente desde otra acción para evitar bucles.
    setAlgoritmo(e.target.value);
  };

  const canResolve = matriz.length > 0 && !!algoritmo;

  return (
    <Card title="Seleccionar algoritmo">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Radio.Group value={algoritmo} onChange={handleChange}>
          <Radio value="vogel">Método Vogel</Radio>
          <Radio value="noroeste">Esquina Noroeste</Radio>
          <Radio value="costo">Costo mínimo</Radio>
        </Radio.Group>
        <Button
          type="primary"
          onClick={onResolverClick}
          disabled={!canResolve}
        >
          Resolver ahora
        </Button>
      </div>
    </Card>
  );
});

export default AlgoritmoSelector;
