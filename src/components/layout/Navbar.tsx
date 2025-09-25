import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

interface NavbarProps {
  title?: string;
}

/**
 * Navbar simple y compacto para reducir significativamente la altura del header.
 * Separa la responsabilidad del layout principal.
 */
const Navbar: React.FC<NavbarProps> = ({ title = "Solver de Problemas de Transporte" }) => {
  return (
    <Header
      style={{
        background: "#1677ff",
        color: "#fff",
        height: 40,
        lineHeight: "40px",
        padding: "0 16px",
        fontSize: 16,
        display: "flex",
        alignItems: "center",
      }}
    >
      {title}
    </Header>
  );
};

export default Navbar;
