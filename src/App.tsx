import {useState} from "react";
import {Layout, Steps, Card, Button} from "antd";
import ConfigurarProblema from "./pages/configurarProblema/ConfigurarProblema.tsx";
import ResolverProblema from "./pages/resolverProblema/ResolverProblema.tsx";
import problemaStore from "./store/problema.store.ts";
import {observer} from "mobx-react-lite";
import Navbar from "./components/layout/Navbar.tsx";

const { Content } = Layout;
const { Step } = Steps;

const App = observer(() => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: 16 }}>
        <Card>
          <Steps current={currentStep} style={{ marginBottom: 16 }}>
            <Step title="Configurar" description="Definir problema" />
            <Step title="Resolver" description="Seleccionar algoritmo y ver log" />
          </Steps>

          {currentStep === 0 && <ConfigurarProblema />}
          {currentStep === 1 && <ResolverProblema />}

          <div style={{ marginTop: 16, textAlign: "right" }}>
            {currentStep > 0 && (
              <Button style={{ marginRight: 8 }} onClick={prev}>
                Anterior
              </Button>
            )}
            {currentStep < 1 && (
              <Button
                type="primary"
                onClick={next}
                disabled={currentStep === 0 && problemaStore.matriz.length === 0}
              >
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
