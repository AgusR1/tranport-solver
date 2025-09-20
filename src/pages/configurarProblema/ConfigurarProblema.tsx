import {Button, Card, Form, InputNumber} from "antd";
import {observer} from "mobx-react-lite";
import MatrizCostos from "../../components/matrizCostos/MatrizCostos.tsx";
import problemaStore from "../../store/problema.store.ts";

const ConfigurarProblema = observer(() => {
  const {fuentes, destinos, setFuentes, setDestinos, generarMatriz} = problemaStore;

  return (
    <Card title="Configurar problema">
      <Form layout="inline" style={{marginBottom: 16}}>
        <Form.Item label="Fuentes">
          <InputNumber min={1} value={fuentes} onChange={setFuentes}/>
        </Form.Item>
        <Form.Item label="Destinos">
          <InputNumber min={1} value={destinos} onChange={setDestinos}/>
        </Form.Item>
        <Button type="primary" onClick={generarMatriz}>
          Generar Matriz
        </Button>
      </Form>

      {problemaStore.matriz.length > 0 && <MatrizCostos/>}
    </Card>
  );
});

export default ConfigurarProblema;
