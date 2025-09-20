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

    this.matriz = Array.from({length: f}, () =>
      Array.from({length: d}, () => 0)
    );
    this.ofertas = Array.from({length: f}, () => 0);
    this.demandas = Array.from({length: d}, () => 0);
    this.depositosNombres = Array.from(
      {length: f},
      (_, i) => `Depósito ${i + 1}`
    );
    this.destinosNombres = Array.from(
      {length: d},
      (_, i) => `Destino ${i + 1}`
    );
    this.logs = [];
    this.asignaciones = [];
    this.costoMinimo = 0;
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
