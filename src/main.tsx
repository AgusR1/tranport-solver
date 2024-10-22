import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ToastContainer />
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#2f23b0",
					colorInfo: "#2f23b0",
					colorSuccess: "#3a7e42",
					colorWarning: "#ed811d",
					colorError: "#e7363c",
					borderRadius: 16,
					wireframe: false,
					fontSize: 18,
				},
				components: {
					Button: {
						defaultHoverBorderColor: "rgb(176, 170, 238)",
						defaultHoverColor: "rgb(176, 170, 238)",
						groupBorderColor: "rgb(176, 170, 238)",
					},
					Breadcrumb: {
						fontSize: 16,
						iconFontSize: 16,
						paddingXXS: 10,
					},
					Layout: {
						headerHeight: 80,
					},
					Table: {
						headerColor: "rgb(222, 242, 2)",
						headerBg: "#2f23b0",
						headerSortActiveBg: "rgba(47, 35, 176, 0.85)",
						headerSortHoverBg: "rgba(47, 35, 176, 0.85)",
						fontFamily: "Josefin Sans",
					},
					InputNumber: {
						fontFamily: "Josefin Sans",
					},
					Descriptions: {
						labelBg: "rgb(47, 35, 176)",
						colorText: "rgb(0, 0, 0)",
						colorTextSecondary: "rgb(222, 242, 2)",
						fontFamily: "Josefin Sans",
						colorSplit: "rgb(47, 35, 176)",
					},
				},
			}}
		>
			<App />
		</ConfigProvider>
	</React.StrictMode>
);
