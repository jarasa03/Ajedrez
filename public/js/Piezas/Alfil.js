import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

/**
 * Clase que representa un Alfil en el juego de ajedrez.
 * @extends Pieza
 */
export class Alfil extends Pieza {
    /**
     * Crea una nueva instancia de Alfil.
     * @param {string} color - El color de la pieza (blanca o negra).
     * @param {string} posicion - La posición inicial de la pieza en el tablero (por ejemplo, "e4").
     */
    constructor(color, posicion) {
        super(color, "Alfil", posicion);

        // Coloca la pieza en su casilla correspondiente al instanciarla
        this.colocarEnTablero();
    }

    /**
     * Obtiene el símbolo que representa al Alfil.
     * @returns {string} El símbolo del Alfil, dependiendo del color (♗ para blanco, ♝ para negro).
     */
    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♗" : "♝"; // Símbolo para el Alfil blanco o negro
    }

    /**
     * Calcula los movimientos posibles para el Alfil, considerando las reglas del ajedrez.
     * El Alfil puede moverse diagonalmente en cualquier dirección hasta que se encuentre con el borde del tablero o una pieza.
     * @returns {string[]} Un arreglo con las posiciones posibles a las que el Alfil puede moverse.
     */
    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Determina la columna actual
        const fila = parseInt(this.posicion[1]) - 1; // Convierte la fila a un índice basado en 0
        const movimientosPosibles = [];

        // Si la columna es inválida, retornar un arreglo vacío
        if (columna === -1) {
            return movimientosPosibles;
        }

        // Definición de las direcciones diagonales posibles
        const direcciones = [
            { x: 1, y: 1 }, { x: 1, y: -1 },
            { x: -1, y: 1 }, { x: -1, y: -1 }
        ];

        // Iterar sobre las 4 direcciones diagonales
        for (const dir of direcciones) {
            let nuevaColumna = columna;
            let nuevaFila = fila;

            // Avanzar en la dirección indicada hasta que se salga del tablero o se encuentre una pieza
            while (true) {
                nuevaColumna += dir.x;
                nuevaFila += dir.y;

                // Verificar que la nueva casilla esté dentro de los límites del tablero
                if (nuevaColumna < 0 || nuevaColumna >= 8 || nuevaFila < 0 || nuevaFila >= 8) {
                    break; // Detenerse si se sale del tablero
                }

                const nuevaPosicion = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase();
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía, el Alfil puede moverse allí
                if (!piezaEnDestino) {
                    movimientosPosibles.push(nuevaPosicion);
                }

                // Si la casilla está ocupada por una pieza enemiga, el Alfil puede capturarla
                else if (piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                    // El Alfil se detiene después de capturar una pieza
                    break;
                }
                // Si la casilla está ocupada por una pieza aliada, el Alfil no puede moverse más en esa dirección
                else {
                    break;
                }
            }
        }

        return movimientosPosibles;
    }
}