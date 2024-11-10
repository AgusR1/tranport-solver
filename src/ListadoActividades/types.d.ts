export type Actividad = {
	id: number;
	descripcion: string;
	nroFuentes: number;
	nroDestinos: number;
};
interface StepperSliderProps {
	stepsLength: number;
	onComplete?: () => void;
}
