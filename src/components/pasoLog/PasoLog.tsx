import {List, Typography} from "antd";

interface Props {
  logs: string[];
}

export default function PasoLog({logs}: Props) {
  return (
    <List
      size="small"
      bordered
      dataSource={logs}
      renderItem={(item, index) => (
        <List.Item>
          <Typography.Text>{`Paso ${index + 1}: ${item}`}</Typography.Text>
        </List.Item>
      )}
    />
  );
}
