import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Input, InputNumber } from "antd";
import type { Highlight } from "../components/DemandaSummary";
import type {AsigMap} from "./useAsignacionesMap.ts";

export type RowData = {
  key: number;
  deposito: string;
  oferta: number;
  [key: `destino_${number}`]: number;
};

interface UseMatrizColumnsParams {
  readOnly: boolean;
  highlight: Highlight;
  d: number;
  matriz: number[][];
  depositosNombres: string[];
  destinosNombres: string[];
  ofertas: number[];
  setCosto: (i: number, j: number, value: number) => void;
  setDepositoNombre: (i: number, value: string) => void;
  setDestinoNombre: (j: number, value: string) => void;
  setOferta: (i: number, value: number) => void;
  asigMap: AsigMap;
}

export function useMatrizColumns(params: UseMatrizColumnsParams) {
  const {
    readOnly,
    highlight,
    d,
    matriz,
    depositosNombres,
    destinosNombres,
    ofertas,
    setCosto,
    setDepositoNombre,
    setDestinoNombre,
    setOferta,
    asigMap,
  } = params;

  const isMain = React.useCallback((i: number, j: number) => highlight && highlight.row === i && highlight.col === j, [highlight]);
  const isRowCol = React.useCallback((i: number, j: number) => highlight && (highlight.row === i || highlight.col === j), [highlight]);

  const destinoColumns: ColumnsType<RowData> = React.useMemo(() => (
    Array.from({ length: d }, (_, j) => ({
      title: readOnly
        ? React.createElement('span', null, destinosNombres[j])
        : React.createElement(Input as any, {
            value: destinosNombres[j],
            onChange: (e: any) => setDestinoNombre(j, e.target.value),
          }),
      dataIndex: `destino_${j}` as const,
      key: `destino_${j}`,
      align: "center" as const,
      width: 140,
      onCell: (_record, rowIndex) => {
        const i = rowIndex ?? -1;
        const main = isMain(i, j);
        const rowcol = isRowCol(i, j);
        return readOnly
          ? {
              style: {
                background: main ? "#ffe58f" : rowcol ? "#fff7e6" : undefined,
              },
            }
          : {} as any;
      },
      render: (_value: number | undefined, _record: RowData, i: number) => (
        readOnly
          ? React.createElement(
              'div',
              {
                style: {
                  padding: 4,
                  borderRadius: 6,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                },
              },
              React.createElement('span', { style: { fontWeight: 600 } }, matriz[i!][j]),
              asigMap.get(`${i}-${j}`)
                ? React.createElement(
                    'span',
                    {
                      style: {
                        fontSize: 12,
                        color: "#1677ff",
                        whiteSpace: "nowrap",
                      },
                    },
                    `${asigMap.get(`${i}-${j}`)} u`
                  )
                : null
            )
          : React.createElement(InputNumber as any, {
              min: 0,
              value: matriz[i!][j],
              onChange: (value: number | null) => setCosto(i!, j, (value ?? 0) as number),
            })
      ),
    }))
  ), [asigMap, d, destinosNombres, isMain, isRowCol, matriz, readOnly, setCosto, setDestinoNombre]);

  const columns: ColumnsType<RowData> = React.useMemo(() => ([
    {
      title: "Depósitos / Destinos",
      dataIndex: "deposito",
      key: "deposito",
      width: 200,
      onCell: (_record, rowIndex) => (
        readOnly
          ? {
              style: {
                background: highlight && highlight.row === rowIndex ? "#fff7e6" : undefined,
              },
            }
          : {} as any
      ),
      render: (_: unknown, __: RowData, rowIndex: number) => (
        readOnly
          ? React.createElement(
              'span',
              {
                style: {
                  display: "inline-block",
                  padding: "2px 4px",
                  borderRadius: 6,
                },
              },
              depositosNombres[rowIndex!]
            )
          : React.createElement(Input as any, {
              value: depositosNombres[rowIndex!],
              onChange: (e: any) => setDepositoNombre(rowIndex!, e.target.value),
            })
      ),
    },
    ...destinoColumns,
    {
      title: "Oferta",
      dataIndex: "oferta",
      key: "oferta",
      align: "center" as const,
      width: 120,
      onCell: (_record, rowIndex) => (
        readOnly
          ? {
              style: {
                background: highlight && highlight.row === rowIndex ? "#fff7e6" : undefined,
              },
            }
          : {} as any
      ),
      render: (_: unknown, __: RowData, i: number) => (
        readOnly
          ? React.createElement(
              'span',
              {
                style: {
                  display: "inline-block",
                  padding: "2px 4px",
                  borderRadius: 6,
                },
              },
              ofertas[i!]
            )
          : React.createElement(InputNumber as any, {
              min: 0,
              value: ofertas[i!],
              onChange: (value: number | null) => setOferta(i!, (value ?? 0) as number),
            })
      ),
    },
  ]), [depositosNombres, destinoColumns, highlight, ofertas, readOnly, setDepositoNombre, setOferta]);

  return columns;
}

export type UseMatrizColumns = ReturnType<typeof useMatrizColumns>;
