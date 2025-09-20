import {Card, Radio, type RadioChangeEvent} from "antd";
import {observer} from "mobx-react-lite";
import problemaStore from "../../store/problema.store";

const AlgoritmoSelector = observer(() => {
  const {algoritmo, setAlgoritmo, resolver} = problemaStore;

  const handleChange = (e: RadioChangeEvent) => {
    setAlgoritmo(e.target.value);
    resolver();
  };

  return (
    <Card title="Seleccionar algoritmo">
      <Radio.Group value={algoritmo} onChange={handleChange}>
        <Radio value="vogel">Método Vogel</Radio>
        <Radio value="noroeste">Esquina Noroeste</Radio>
        <Radio value="costo">Costo mínimo</Radio>
      </Radio.Group>
    </Card>
  );
});

export default AlgoritmoSelector;
