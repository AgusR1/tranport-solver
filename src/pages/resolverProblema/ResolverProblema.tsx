import {Row, Col, Card} from "antd";
import {observer} from "mobx-react-lite";
import AlgoritmoSelector from "../../components/algoritmoSelector/AlgoritmoSelector.tsx";
import PasoLog from "../../components/pasoLog/PasoLog.tsx";
import problemaStore from "../../store/problema.store.ts";
import MatrizCostos from "../../components/matrizCostos/MatrizCostos.tsx";

const ResolverProblema = observer(() => {
  const {logs, algoritmo} = problemaStore;

  return (
    <Card title="Resolver problema">
      <Row gutter={16}>
        <Col span={8}>
          <AlgoritmoSelector/>
        </Col>
        <Col span={16}>
          <MatrizCostos/>
        </Col>
      </Row>

      {algoritmo && (
        <Row gutter={16} style={{marginTop: 24}}>
          <Col span={24}>
            <PasoLog logs={logs}/>
          </Col>
        </Row>
      )}
    </Card>
  );
});

export default ResolverProblema;
