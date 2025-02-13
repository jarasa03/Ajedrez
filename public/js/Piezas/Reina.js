import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Reina extends Pieza {
    constructor(color, posicion) {
        super(color, "Reina", posicion);
        // Colocamos la pieza en su casilla
        this.colocarEnTablero();
    }

    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♕" : "♛"; // Reina blanca o negra
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

        // Direcciones horizontales, verticales y diagonales para la Reina
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

                // Si la casilla está vacía, la Reina puede moverse allí
                if (!piezaEnDestino) {
                    movimientosPosibles.push(nuevaPosicion);
                }
                // Si tiene una pieza enemiga, la Reina puede capturarla y moverse allí
                else if (piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                    // Después de capturar, se detiene en esa casilla, no puede seguir moviéndose más en esa dirección
                    break;
                }
                // Si tiene una pieza aliada, la Reina no puede moverse más en esa dirección
                else {
                    break;
                }
            }
        }

        return movimientosPosibles;
    }
}