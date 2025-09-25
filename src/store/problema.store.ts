import {makeAutoObservable} from "mobx";
import {resolverCostoMinimo, resolverEsquinaNoroeste, resolverVogel} from "../utils/helpers.tsx";

class ProblemaStore {
  // --- Estado principal ---
  fuentes: number | null = 0;
  destinos: number | null = 0;
  matriz: number[][] = [];
  ofertas: number[] = [];
  demandas: number[] = [];
  depositosNombres: string[] = [];
  destinosNombres: string[] = [];

  algoritmo: "costo" | "vogel" | "noroeste" | null = null;
  asignaciones: { fuente: number; destino: number; cantidad: number }[] = [];
  costoMinimo: number = 0;
  logs: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // --- Setters básicos ---
  setFuentes = (value: number | null) => {
    this.fuentes = value ?? 0;
    this.generarMatriz();
  };

  setDestinos = (value: number | null) => {
    this.destinos = value ?? 0;
    this.generarMatriz();
  };


  setCosto = (f: number, d: number, value: number) => {
    this.matriz[f][d] = value;
  };

  setOferta = (f: number, value: number) => {
    this.ofertas[f] = value;
  };

  setDemanda = (d: number, value: number) => {
    this.demandas[d] = value;
  };

  setDepositoNombre = (index: number, nombre: string) => {
    this.depositosNombres[index] = nombre;
  };

  setDestinoNombre = (index: number, nombre: string) => {
    this.destinosNombres[index] = nombre;
  };

  setAlgoritmo = (alg: "costo" | "vogel" | "noroeste") => {
    this.algoritmo = alg;
  };

  // --- Generar matriz vacía ---
  generarMatriz = () => {
    const f = Math.max(0, this.fuentes ?? 0);
    const d = Math.max(0, this.destinos ?? 0);

    const oldF = this.matriz?.length ?? 0;
    const oldD = oldF > 0 ? this.matriz[0]?.length ?? 0 : 0;

    // Preservar valores existentes dentro de los nuevos límites
    const nuevaMatriz = Array.from({ length: f }, (_, i) =>
      Array.from({ length: d }, (_, j) => (this.matriz?.[i]?.[j] ?? 0))
    );
    const nuevasOfertas = Array.from({ length: f }, (_, i) => this.ofertas?.[i] ?? 0);
    const nuevasDemandas = Array.from({ length: d }, (_, j) => this.demandas?.[j] ?? 0);

    const nuevosDepositos = Array.from(
      { length: f },
      (_, i) => this.depositosNombres?.[i] ?? `Depósito ${i + 1}`
    );
    const nuevosDestinos = Array.from(
      { length: d },
      (_, i) => this.destinosNombres?.[i] ?? `Destino ${i + 1}`
    );

    this.matriz = nuevaMatriz;
    this.ofertas = nuevasOfertas;
    this.demandas = nuevasDemandas;
    this.depositosNombres = nuevosDepositos;
    this.destinosNombres = nuevosDestinos;

    // Reiniciar resultados solo si cambió la dimensión de la matriz
    if (oldF !== f || oldD !== d) {
      this.logs = [];
      this.asignaciones = [];
      this.costoMinimo = 0;
    }
  };


  // --- Resetear problema ---
  resetProblema = () => {
    this.fuentes = 0;
    this.destinos = 0;
    this.matriz = [];
    this.ofertas = [];
    this.demandas = [];
    this.depositosNombres = [];
    this.destinosNombres = [];
    this.algoritmo = null;
    this.logs = [];
    this.asignaciones = [];
    this.costoMinimo = 0;
  };

  // --- Resolver problema ---
  resolver = () => {
    if (!this.algoritmo) {
      this.logs.push("⚠️ Selecciona un algoritmo válido para continuar.");
      return;
    }

    // Clonamos arrays para no mutar el estado original
    const matriz = this.matriz.map(row => [...row]);
    const ofertas = [...this.ofertas];
    const demandas = [...this.demandas];
    const depositosNombres = [...this.depositosNombres];
    const destinosNombres = [...this.destinosNombres];

    switch (this.algoritmo) {
      case "costo":
        ({
          asignaciones: this.asignaciones,
          costoTotal: this.costoMinimo,
          logs: this.logs,
        } = resolverCostoMinimo(matriz, demandas, ofertas, depositosNombres, destinosNombres));
        break;

      case "vogel":
        ({
          asignaciones: this.asignaciones,
          costoTotal: this.costoMinimo,
          logs: this.logs,
        } = resolverVogel(matriz, demandas, ofertas, depositosNombres, destinosNombres));
        break;

      case "noroeste":
        ({
          asignaciones: this.asignaciones,
          costoTotal: this.costoMinimo,
          logs: this.logs,
        } = resolverEsquinaNoroeste(matriz, demandas, ofertas, depositosNombres, destinosNombres));
        break;
    }
  };
}

const problemaStore = new ProblemaStore();
export default problemaStore;
