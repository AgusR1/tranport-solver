import React from "react";
import {Table, InputNumber} from "antd";

export type Highlight = { row: number | null; col: number | null } | undefined;

interface DemandaSummaryProps {
    d: number;
    readOnly: boolean;
    highlight: Highlight;
    demandas: number[];
    demandaInputs: (number | null)[];
    onInputChange: (j: number, value: number | null) => void;
    onBlurCommit: (j: number) => void;
}

export const DemandaSummary: React.FC<DemandaSummaryProps> = ({
                                                                  d,
                                                                  readOnly,
                                                                  highlight,
                                                                  demandas,
                                                                  demandaInputs,
                                                                  onInputChange,
                                                                  onBlurCommit,
                                                              }) => {
    return (
        <Table.Summary fixed>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                    <strong>Demanda</strong>
                </Table.Summary.Cell>
                {Array.from({length: d}, (_, j) => (
                    <Table.Summary.Cell
                        align={"center"}
                        key={`demanda-${j}`}
                        index={j + 1}
                        className={readOnly && highlight && highlight.col === j ? "demanda-highlight" : undefined}
                    >
                        {readOnly ? (
                            <span
                                style={{
                                    display: "inline-block",
                                    padding: "2px 4px",
                                    borderRadius: 6,
                                }}
                            >
                {demandas[j]}
              </span>
                        ) : (
                            <InputNumber
                                min={0}
                                value={demandaInputs[j] ?? null}
                                onChange={(value) => onInputChange(j, typeof value === 'number' && !Number.isNaN(value) ? value : null)}
                                onBlur={() => onBlurCommit(j)}
                            />
                        )}
                    </Table.Summary.Cell>
                ))}
                <Table.Summary.Cell index={d + 1}/>
            </Table.Summary.Row>
        </Table.Summary>
    );
};

export default DemandaSummary;
