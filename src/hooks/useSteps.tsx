import { useState } from "react";

export const useSteps = () => {
	const [current, setCurrent] = useState(0);
	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};
	const goTo = (step: number) => {
		setCurrent(step);
	};
	return { current, next, prev, goTo };
};
