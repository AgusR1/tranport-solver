# Transport Solver (React + TypeScript + Vite)

Aplicación web para modelar y resolver el Problema de Transporte (Optimización) de forma interactiva. Permite:
- Definir orígenes (depósitos) y destinos, con sus ofertas y demandas.
- Ingresar la matriz de costos.
- Seleccionar el algoritmo de resolución.
- Ver las asignaciones óptimas y el costo mínimo total, junto con el detalle de los pasos.

Esta app está construida con React, TypeScript, Vite, Ant Design y gestión de estado con MobX.

## Demo local rápida

1) Requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+

2) Instalación y ejecución
- Instalar dependencias: `npm install`
- Levantar en desarrollo: `npm run dev`
- Abrir el enlace que imprime Vite (por defecto: http://localhost:5173)

3) Build y preview
- Build producción: `npm run build`
- Servir build: `npm run preview`

4) Linter (opcional)
- `npm run lint`

## Uso básico

1. Define el número de depósitos y destinos, así como sus nombres (opcional), ofertas y demandas.
2. Completa la matriz de costos unitarios de transporte.
3. Selecciona el algoritmo en el selector disponible.
4. Ejecuta y visualiza:
   - Asignaciones finales (depósito → destino → cantidad).
   - Costo total mínimo.
   - Pasos/bitácora del algoritmo (para entender cómo se llegó a la solución).

## Estructura del proyecto (resumen)

- `src/`
  - `components/`
    - `matrizCostos/`
      - `MatrizCostos.tsx` y subcomponentes/hooks para definir la matriz de costos, ofertas y demandas.
      - `hooks/useMatrizColumns.ts`
      - `components/DemandaSummary.tsx`
    - `algoritmoSelector/AlgoritmoSelector.tsx` para elegir el método de resolución.
    - `ResultadoFinal/ResultadoFinal.tsx` muestra asignaciones, costo mínimo y logs.
  - `App.tsx` punto de composición de la UI.
  - `store/` (por ejemplo `problema.store.ts`) con el estado del problema (ofertas, demandas, costos, resultados, logs, etc.).

## Tecnologías

- React 19 + TypeScript
- Vite 7
- Ant Design 5
- MobX (mobx-react-lite)

## Scripts disponibles

- `npm run dev`: Compila TypeScript y levanta Vite en modo desarrollo.
- `npm run build`: Compila el proyecto (TypeScript + Vite) para producción en `dist/`.
- `npm run preview`: Sirve el build de producción localmente.
- `npm run lint`: Ejecuta ESLint (configuración base incluida).

## Convenciones y notas

- Tipado estricto en TS recomendado (ver tsconfig).*  
- La UI utiliza componentes de Ant Design.
- La gestión de estado se realiza con MobX; los componentes observables usan `observer`.
- Si cambias nombres de depósitos/destinos, la tabla de resultados los reflejará automáticamente.

## Roadmap (ideas)

- Soporte para múltiples algoritmos (p. ej., método de la esquina noroeste, Voguel, MODI). 
- Exportación de resultados (CSV/Excel) y reporte de pasos.
- Tests unitarios y de integración.
- Validaciones avanzadas (casos balanceados/no balanceados).

## Contribución

Las contribuciones son bienvenidas. Sugerido:
- Abrir un issue describiendo la mejora/bug.
- Crear un branch desde `main` y enviar un Pull Request con cambios pequeños y bien descritos.

## Licencia

Este proyecto no especifica licencia. Si deseas abrir el código, agrega una licencia (por ejemplo, MIT) en la raíz del repo.

---

¿Sugerencias o dudas? Abre un issue y con gusto se revisa.
