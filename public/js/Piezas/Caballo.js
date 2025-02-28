import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

/**
 * Clase que representa un Caballo en el tablero de ajedrez.
 * Extiende la clase Pieza.
 */
export class Caballo extends Pieza {
    /**
     * Crea una instancia de la clase Caballo.
     * @param {string} color - El color de la pieza (blanca o negra).
     * @param {string} posicion - La posición inicial de la pieza en el tablero (por ejemplo, 'e4').
     */
    constructor(color, posicion) {
        super(color, "Caballo", posicion);

        // Coloca la pieza en su casilla inicial
        this.colocarEnTablero();
    }

    /**
     * Obtiene el símbolo del Caballo dependiendo de su color.
     * @returns {string} El símbolo del Caballo (♘ para blanco, ♞ para negro).
     */
    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♘" : "♞"; // Caballo blanco o negro
    }

    /**
     * Calcula los movimientos posibles para el Caballo en el tablero.
     * @returns {string[]} Un array con las posiciones posibles a las que el Caballo puede moverse.
     */
    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Asegurarse que la columna esté en minúsculas
        const fila = parseInt(this.posicion[1]) - 1; // Conversión de la fila para que empiece desde 0
        const movimientosPosibles = [];

        // Verificar si la columna está correctamente calculada
        if (columna === -1) {
            return movimientosPosibles;
        }

        // Definir las posibles direcciones del movimiento del Caballo
        const direcciones = [
            { x: 1, y: 2 }, { x: 2, y: 1 }, { x: -1, y: 2 }, { x: -2, y: 1 },
            { x: 1, y: -2 }, { x: 2, y: -1 }, { x: -1, y: -2 }, { x: -2, y: -1 }
        ];

        // Evaluar todas las direcciones posibles
        for (const dir of direcciones) {
            const nuevaColumna = columna + dir.x;
            const nuevaFila = fila + dir.y;

            // Verificar que la nueva posición esté dentro de los límites del tablero (0-7)
            if (nuevaColumna >= 0 && nuevaColumna < 8 && nuevaFila >= 0 && nuevaFila < 8) {
                const nuevaPosicion = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase(); // Convertir la fila a 1-8

                // Obtener la pieza en la nueva casilla
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía o tiene una pieza enemiga, el Caballo puede moverse allí
                if (!piezaEnDestino || piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                }
            }
        }

        return movimientosPosibles;
    }
}