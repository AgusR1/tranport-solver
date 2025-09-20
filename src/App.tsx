import {useState} from "react";
import {Layout, Steps, Card, Button} from "antd";
import ConfigurarProblema from "./pages/configurarProblema/ConfigurarProblema.tsx";
import ResolverProblema from "./pages/resolverProblema/ResolverProblema.tsx";
import problemaStore from "./store/problema.store.ts";
import {observer} from "mobx-react-lite";
import ResultadoFinal from "./components/ResultadoFinal/ResultadoFinal.tsx";

const {Header, Content} = Layout;
const {Step} = Steps;

const App = observer(() => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

  return (
    <Layout style={{minHeight: "100vh"}}>
      <Header style={{background: "#1677ff", color: "#fff", fontSize: 20, padding: "0 24px"}}>
        Solver de Problemas de Transporte
      </Header>
      <Content style={{padding: 24}}>
        <Card>
          <Steps current={currentStep} style={{marginBottom: 24}}>
            <Step title="Configurar" description="Definir problema"/>
            <Step title="Resolver" description="Seleccionar algoritmo y calcular"/>
            <Step title="Resumen" description="Ver resultado final"/>
          </Steps>

          {currentStep === 0 && <ConfigurarProblema/>}
          {currentStep === 1 && <ResolverProblema/>}
          {currentStep === 2 && <ResultadoFinal/>}

          <div style={{marginTop: 24, textAlign: "right"}}>
            {currentStep > 0 && (
              <Button style={{marginRight: 8}} onClick={prev}>
                Anterior
              </Button>
            )}
            {currentStep < 2 && (
              <Button type="primary" onClick={next} disabled={currentStep === 0 && problemaStore.matriz.length === 0}>
                Siguiente
              </Button>
            )}
          </div>
        </Card>
      </Content>
    </Layout>
  );
});

export default App;
