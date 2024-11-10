import { Input } from "antd";
import styled from "styled-components";

export const Table = styled.table`
	border-collapse: separate;
	border-spacing: 0;
	border: 1px solid #ddd;
	border-radius: 10px;
`;

export const UnstyledInput = styled(Input)`
	border-color: transparent;
	font-family: "Josefin Sans";
	background: transparent;
	color: #def202;
	text-align: center;
	&:focus {
		box-shadow: none;
		border-color: transparent;
		background: transparent;
	}
	&:hover {
		border-color: transparent;
		box-shadow: none;
		background: transparent;
	}
`;

export const UnstyledInputNumber = styled(Input)`
	border-color: transparent;
	font-family: "Josefin Sans";
	background: transparent;
	text-align: center;
	&:focus {
		box-shadow: none;
		border-color: transparent;
		background: transparent;
	}
	&:hover {
		border-color: transparent;
		box-shadow: none;
		background: transparent;
	}
`;

export const Th = styled.th`
	border: 1px solid rgb(0 0 0 / 15%);
	border-collapse: collapse;
	min-width: 30px;
	max-width: 165px;
`;

export const ThFD = styled(Th)`
	font-family: "Josefin Sans";
	font-weight: 600;
	background: #2f23b0;
	color: #def202;
	padding: 0.6em;
	text-align: center;
	width: fit-content;
`;

export const Sth = styled(Th)`
	font-family: "Josefin Sans";
	font-weight: 600;
	background: #746ae2;
	color: #def202;
	cursor: pointer;
	padding: 0.6em;
	text-align: center;
`;

export const Ith = styled(Th)`
	font-family: "Josefin Sans";
	padding: 0.6em;
	text-align: center;
	width: fit-content;
`;
