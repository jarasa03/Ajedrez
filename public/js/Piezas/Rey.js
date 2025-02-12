import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Rey extends Pieza {
    constructor(color, posicion) {
        super(color, "Rey", posicion);
    }

    mover(nuevaPosicion) {
        // TODO: Hacer que se mueva
    }

    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Asegurarse de que la columna esté en minúsculas
        const fila = parseInt(this.posicion[1]) - 1; // Conversión de la fila para que empiece desde 0
        const movimientosPosibles = [];

        // Verificar que la columna esté bien calculada
        console.log(`Posición inicial: Columna = ${columna} (Letra ${this.posicion[0]}), Fila = ${fila + 1}`);
        if (columna === -1) {
            console.log("Error: Columna inválida.");
            return movimientosPosibles;
        }

        // Direcciones alrededor del Rey (horizontal, vertical y diagonal)
        const direcciones = [
            { x: 1, y: 0 }, // Derecha
            { x: -1, y: 0 }, // Izquierda
            { x: 0, y: 1 }, // Arriba
            { x: 0, y: -1 }, // Abajo
            { x: 1, y: 1 }, // Diagonal derecha arriba
            { x: -1, y: 1 }, // Diagonal izquierda arriba
            { x: 1, y: -1 }, // Diagonal derecha abajo
            { x: -1, y: -1 } // Diagonal izquierda abajo
        ];

        // Recorrer todas las direcciones posibles
        for (const dir of direcciones) {
            let nuevaColumna = columna + dir.x;
            let nuevaFila = fila + dir.y;

            // Verificar que la nueva casilla esté dentro del tablero
            if (nuevaColumna >= 0 && nuevaColumna < 8 && nuevaFila >= 0 && nuevaFila < 8) {
                const nuevaPosicion = arrayLetras[nuevaColumna] + (nuevaFila + 1);
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía o tiene una pieza enemiga, el Rey puede moverse allí
                if (!piezaEnDestino || piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                }
            }
        }

        return movimientosPosibles;
    }
}