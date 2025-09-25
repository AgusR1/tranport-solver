import { useState } from "react";
import {List, Typography} from "antd";

interface Props {
  logs: string[];
  onItemHover?: (index: number) => void;
  onItemLeave?: () => void;
  activeIndex?: number;
  visibleCount?: number;
}

export default function PasoLog({logs, onItemHover, onItemLeave, activeIndex, visibleCount}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverBg = "#e6f7ff"; // antd blue light
  const activeBg = "#fffbe6"; // light yellow

  const items = typeof visibleCount === "number" && visibleCount >= 0 ? logs.slice(0, Math.min(visibleCount, logs.length)) : logs;

  return (
    <List
      size="small"
      bordered
      dataSource={items}
      renderItem={(item, index) => {
        const isHovered = hoveredIndex === index;
        const isActive = activeIndex === index;
        return (
          <List.Item
            key={index}
            onMouseEnter={() => { setHoveredIndex(index); onItemHover?.(index); }}
            onMouseLeave={() => { setHoveredIndex(null); onItemLeave?.(); }}
            style={{
              cursor: onItemHover ? "pointer" : "default",
              background: isHovered ? hoverBg : isActive ? activeBg : undefined,
              transition: "background-color 0.2s ease",
            }}
          >
            <Typography.Text>{`Paso ${index + 1}: ${item}`}</Typography.Text>
          </List.Item>
        );
      }}
    />
  );
}
