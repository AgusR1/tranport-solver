import {useState} from "react";
import {Row, Col, Card} from "antd";
import {observer} from "mobx-react-lite";
import AlgoritmoSelector from "../../components/algoritmoSelector/AlgoritmoSelector.tsx";
import PasoLog from "../../components/pasoLog/PasoLog.tsx";
import problemaStore from "../../store/problema.store.ts";
import MatrizCostosModal from "../../components/matrizCostos/MatrizCostosModal.tsx";

const ResolverProblema = observer(() => {
  const {logs, algoritmo} = problemaStore;
  const [openMatriz, setOpenMatriz] = useState(false);

  return (
    <Card title="Resolver problema">
      <Row gutter={16} align="middle" justify="space-between">
        <Col flex="auto">
          <AlgoritmoSelector onResolverClick={() => { problemaStore.resolver(); setOpenMatriz(true); }} />
        </Col>
      </Row>

      {algoritmo && (
        <Row gutter={16} style={{marginTop: 24}}>
          <Col span={24}>
            <Card title="Log de pasos">
              <PasoLog logs={logs}/>
            </Card>
          </Col>
        </Row>
      )}

      <MatrizCostosModal
        open={openMatriz}
        onClose={() => setOpenMatriz(false)}
      />
    </Card>
  );
});

export default ResolverProblema;
