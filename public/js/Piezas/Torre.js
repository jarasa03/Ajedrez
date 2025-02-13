import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Torre extends Pieza {
    constructor(color, posicion) {
        super(color, "Torre", posicion);

        // Colocamos la pieza en su casilla
        this.colocarEnTablero();
    }

    obtenerSimboloPieza() {
        // Retorna el símbolo según el color de la pieza
        if (this.constructor.name === "Torre") {
            return this.color === "blanca" ? "♖" : "♜"; // Torre blanca o negra
        }
        return "";
    }

    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase());
        const fila = parseInt(this.posicion[1]) - 1; // Convertir la fila para que empiece desde 0
        const movimientosPosibles = [];

        if (columna === -1) {
            return movimientosPosibles;
        }

        // Direcciones de movimiento: horizontal (izquierda-derecha) y vertical (arriba-abajo)
        const direcciones = [
            { x: 1, y: 0 }, // Derecha
            { x: -1, y: 0 }, // Izquierda
            { x: 0, y: 1 }, // Arriba
            { x: 0, y: -1 } // Abajo
        ];

        // Recorrer todas las direcciones posibles
        for (const dir of direcciones) {
            let nuevaColumna = columna;
            let nuevaFila = fila;

            // Avanzar en la dirección hasta que se salga del tablero o se encuentre una pieza
            while (true) {
                nuevaColumna += dir.x;
                nuevaFila += dir.y;

                // Verificar que la nueva casilla esté dentro del tablero
                if (nuevaColumna < 0 || nuevaColumna >= 8 || nuevaFila < 0 || nuevaFila >= 8) {
                    break; // Si se sale del tablero, detenerse
                }

                const nuevaPosicion = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase();
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía, la Torre puede moverse allí
                if (!piezaEnDestino) {
                    movimientosPosibles.push(nuevaPosicion);
                }
                // Si tiene una pieza enemiga, la Torre puede capturarla y moverse allí
                else if (piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                    break; // Después de capturar, no puede seguir moviéndose en esta dirección
                }
                // Si tiene una pieza aliada, la Torre no puede moverse más en esa dirección
                else {
                    break;
                }
            }
        }

        return movimientosPosibles;
    }
}