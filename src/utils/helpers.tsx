interface ResultadoAlgoritmo {
    asignaciones: { fuente: number; destino: number; cantidad: number }[];
    costoTotal: number;
    logs: string[];
}

const findMinCoordinates = (matrix: number[][]): [number, number] => {
    let min = Infinity;
    let coordinates: [number, number] = [-1, -1];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const value = matrix[i][j];
            if (value < min) {
                min = value;
                coordinates = [i, j];
            }
        }
    }
    return coordinates;
};

export const resolverCostoMinimo = (
    matrizCostos: number[][],
    demandas: number[],
    ofertas: number[],
    depositosNombres: string[],
    destinosNombres: string[]
): ResultadoAlgoritmo => {
    const logs: string[] = [];
    const asignaciones: { fuente: number; destino: number; cantidad: number }[] = [];
    let costoTotal = 0;

    const sumaOfertas = ofertas.reduce((acc, curr) => acc + curr, 0);
    const sumaDemandas = demandas.reduce((acc, curr) => acc + curr, 0);

    if (sumaDemandas !== sumaOfertas) {
        logs.push("⚠️ La oferta y la demanda deben ser iguales para resolver el problema.");
        return {asignaciones: [], costoTotal: 0, logs};
    }

    let [i, j] = findMinCoordinates(matrizCostos);

    while (i !== -1 && j !== -1) {
        const costoUnitario = matrizCostos[i][j];
        const oferta = ofertas[i];
        const demanda = demandas[j];
        const deposito = depositosNombres[i];
        const destino = destinosNombres[j];

        logs.push(
            `📌 Seleccionamos la celda con costo mínimo ${costoUnitario} en "${deposito}" → "${destino}" (Demanda: ${demanda}, Oferta: ${oferta}).`
        );

        matrizCostos[i][j] = Infinity;
        const cantidadAsignada = Math.min(oferta, demanda);

        asignaciones.push({fuente: i, destino: j, cantidad: cantidadAsignada});
        costoTotal += cantidadAsignada * costoUnitario;

        if (demanda > oferta) {
            // Se agota la oferta de la fila i (depósito)
            demandas[j] -= oferta;
            ofertas[i] = 0;
            // Inhabilitar la fila i
            for (let col = 0; col < matrizCostos[i].length; col++) {
                matrizCostos[i][col] = Infinity;
            }
        } else if (demanda < oferta) {
            // Se satisface la demanda de la columna j (destino)
            ofertas[i] -= demanda;
            demandas[j] = 0;
            // Inhabilitar la columna j
            for (let row = 0; row < matrizCostos.length; row++) {
                matrizCostos[row][j] = Infinity;
            }
        } else {
            // Se agotan ambos simultáneamente
            ofertas[i] = 0;
            demandas[j] = 0;
            // Inhabilitar tanto la fila como la columna
            for (let col = 0; col < matrizCostos[i].length; col++) {
                matrizCostos[i][col] = Infinity;
            }
            for (let row = 0; row < matrizCostos.length; row++) {
                matrizCostos[row][j] = Infinity;
            }
        }

        [i, j] = findMinCoordinates(matrizCostos);
    }

    logs.push(`✅ Costo total final = ${costoTotal}`);
    return {asignaciones, costoTotal, logs};
};

export function resolverEsquinaNoroeste(
    matriz: number[][],
    demandas: number[],
    ofertas: number[],
    depositosNombres: string[],
    destinosNombres: string[]
) {
    const logs: string[] = [];
    const asignaciones: { fuente: number; destino: number; cantidad: number }[] = [];

    const costos = matriz.map(row => [...row]);
    const d = [...demandas];
    const o = [...ofertas];

    logs.push("🔹 Iniciando método de Esquina Noroeste...");

    let i = 0;
    let j = 0;

    while (i < o.length && j < d.length) {
        if (o[i] === 0) {
            i++;
            continue;
        }
        if (d[j] === 0) {
            j++;
            continue;
        }

        const cantidad = Math.min(o[i], d[j]);
        asignaciones.push({fuente: i, destino: j, cantidad});

        logs.push(
            `📌 Se asignan ${cantidad} unidades desde "${depositosNombres[i]}" hacia "${destinosNombres[j]}" con costo ${costos[i][j]}`
        );

        o[i] -= cantidad;
        d[j] -= cantidad;

        if (o[i] === 0) {
            i++; // Pasamos a la siguiente fila
        } else {
            j++; // Pasamos a la siguiente columna
        }
    }

    const costoTotal = asignaciones.reduce(
        (acc, a) => acc + matriz[a.fuente][a.destino] * a.cantidad,
        0
    );

    logs.push(`✅ Costo total mínimo calculado con Esquina Noroeste: ${costoTotal}`);

    return {
        asignaciones,
        costoTotal,
        logs,
    };
}


export function resolverVogel(
    matriz: number[][],
    demandas: number[],
    ofertas: number[],
    depositosNombres: string[],
    destinosNombres: string[]
) {
    const logs: string[] = [];
    const asignaciones: { fuente: number; destino: number; cantidad: number }[] = [];

    // Copias locales para no mutar
    const costos = matriz.map(row => [...row]);
    const d = [...demandas];
    const o = [...ofertas];

    logs.push("🔹 Iniciando método de Aproximación de Vogel...");

    while (o.some(val => val > 0) && d.some(val => val > 0)) {
        // Calcular penalizaciones por fila
        const penalizacionesFilas = costos.map((row, i) => {
            // Si la oferta de la fila está agotada, no debe ser elegida
            if (o[i] <= 0) return Number.NEGATIVE_INFINITY;
            const fila = row.filter((_, j) => d[j] > 0); // solo destinos activos
            if (fila.length === 0) return Number.NEGATIVE_INFINITY;
            if (fila.length === 1) return fila[0];
            const sorted = [...fila].sort((a, b) => a - b);
            return sorted[1] - sorted[0];
        });

        // Calcular penalizaciones por columna
        const penalizacionesColumnas = costos[0].map((_, j) => {
            // Si la demanda de la columna está satisfecha, no debe ser elegida
            if (d[j] <= 0) return Number.NEGATIVE_INFINITY;
            const columna = costos.map(row => row[j]).filter((_, i) => o[i] > 0); // solo fuentes activas
            if (columna.length === 0) return Number.NEGATIVE_INFINITY;
            if (columna.length === 1) return columna[0];
            const sorted = [...columna].sort((a, b) => a - b);
            return sorted[1] - sorted[0];
        });

        // Encontrar la máxima penalización
        const maxFila = Math.max(...penalizacionesFilas);
        const maxColumna = Math.max(...penalizacionesColumnas);

        let fila = -1;
        let columna = -1;

        if (maxFila >= maxColumna) {
            fila = penalizacionesFilas.indexOf(maxFila);
            // Elegir la columna de menor costo entre las con demanda activa y costo finito
            const candidatosCols = costos[fila]
                .map((c, j) => ({c, j}))
                .filter(({j, c}) => d[j] > 0 && Number.isFinite(c));
            if (candidatosCols.length > 0) {
                columna = candidatosCols.sort((a, b) => a.c - b.c)[0].j;
            } else {
                // Fallback a estrategia por columnas si no hay columnas válidas en la fila seleccionada
                columna = penalizacionesColumnas.indexOf(maxColumna);
                const candidatosFilas = costos
                    .map((row, i) => ({c: row[columna], i}))
                    .filter(({i, c}) => o[i] > 0 && Number.isFinite(c));
                if (candidatosFilas.length > 0) {
                    fila = candidatosFilas.sort((a, b) => a.c - b.c)[0].i;
                }
            }
        } else {
            columna = penalizacionesColumnas.indexOf(maxColumna);
            // Elegir la fila de menor costo entre las con oferta activa y costo finito
            const candidatosFilas = costos
                .map((row, i) => ({c: row[columna], i}))
                .filter(({i, c}) => o[i] > 0 && Number.isFinite(c));
            if (candidatosFilas.length > 0) {
                fila = candidatosFilas.sort((a, b) => a.c - b.c)[0].i;
            } else {
                // Fallback a estrategia por filas
                fila = penalizacionesFilas.indexOf(maxFila);
                const candidatosCols = costos[fila]
                    .map((c, j) => ({c, j}))
                    .filter(({j, c}) => d[j] > 0 && Number.isFinite(c));
                if (candidatosCols.length > 0) {
                    columna = candidatosCols.sort((a, b) => a.c - b.c)[0].j;
                }
            }
        }

        // Determinar cantidad a asignar
        if (fila < 0 || columna < 0) {
            // No hay selección válida; salimos para evitar bucle
            break;
        }
        const cantidad = Math.min(o[fila], d[columna]);
        if (!Number.isFinite(cantidad) || cantidad <= 0) {
            // No hay progreso posible; salimos para evitar bucle
            break;
        }

        asignaciones.push({fuente: fila, destino: columna, cantidad});

        logs.push(
            `📌 Se asignan ${cantidad} unidades desde "${depositosNombres[fila]}" hacia "${destinosNombres[columna]}" con costo ${costos[fila][columna]}`
        );

        o[fila] -= cantidad;
        d[columna] -= cantidad;

        // Si ya no hay demanda en la columna, anular sus costos
        if (d[columna] === 0) {
            for (let i = 0; i < costos.length; i++) costos[i][columna] = Infinity;
        }
        // Si ya no hay oferta en la fila, anular sus costos
        if (o[fila] === 0) {
            for (let j = 0; j < costos[fila].length; j++) costos[fila][j] = Infinity;
        }
    }

    const costoTotal = asignaciones.reduce(
        (acc, a) => acc + matriz[a.fuente][a.destino] * a.cantidad,
        0
    );

    logs.push(`✅ Costo total mínimo calculado con Vogel: ${costoTotal}`);

    return {
        asignaciones,
        costoTotal,
        logs,
    };
}
