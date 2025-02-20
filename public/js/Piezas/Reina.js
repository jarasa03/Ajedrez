import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Reina extends Pieza {
    /**
     * Crea una instancia de la Reina en el tablero con su color y posición.
     * @param {string} color - El color de la Reina (blanca o negra).
     * @param {string} posicion - La posición inicial de la Reina en el tablero (por ejemplo, 'd1').
     */
    constructor(color, posicion) {
        super(color, "Reina", posicion);
        // Coloca la Reina en su casilla inicial en el tablero.
        this.colocarEnTablero();
    }

    /**
     * Obtiene el símbolo de la Reina dependiendo de su color.
     * @returns {string} El símbolo de la Reina (♕ para blanca, ♛ para negra).
     */
    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♕" : "♛"; // Reina blanca o negra
    }

    /**
     * Calcula todos los movimientos posibles de la Reina.
     * La Reina se puede mover horizontal, vertical o diagonalmente.
     * @returns {string[]} Un array con todas las posiciones posibles donde la Reina puede moverse.
     */
    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Asegura que la columna esté en minúsculas
        const fila = parseInt(this.posicion[1]) - 1; // Conversión de la fila para que empiece desde 0
        const movimientosPosibles = [];

        // Verificación de la columna para detectar cualquier error en la posición
        console.log(`Posición inicial: Columna = ${columna} (Letra ${this.posicion[0]}), Fila = ${fila + 1}`);
        if (columna === -1) {
            console.log("Error: Columna inválida.");
            return movimientosPosibles;
        }

        // Direcciones posibles de movimiento para la Reina
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

        // Recorrido de todas las direcciones para determinar los movimientos válidos
        for (const dir of direcciones) {
            let nuevaColumna = columna;
            let nuevaFila = fila;

            // Avance en la dirección seleccionada hasta que se salga del tablero o se encuentre una pieza
            while (true) {
                nuevaColumna += dir.x;
                nuevaFila += dir.y;

                // Verificación si la nueva casilla está fuera del tablero
                if (nuevaColumna < 0 || nuevaColumna >= 8 || nuevaFila < 0 || nuevaFila >= 8) {
                    break; // Detiene el movimiento si la casilla está fuera del tablero
                }

                const nuevaPosicion = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase();
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía, la Reina puede moverse allí
                if (!piezaEnDestino) {
                    movimientosPosibles.push(nuevaPosicion);
                }
                // Si hay una pieza enemiga, la Reina puede capturarla y moverse allí
                else if (piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                    // Después de capturar, se detiene el movimiento en esa dirección
                    break;
                }
                // Si hay una pieza aliada, la Reina no puede moverse más en esa dirección
                else {
                    break;
                }
            }
        }

        // Devuelve la lista completa de movimientos posibles
        return movimientosPosibles;
    }
}