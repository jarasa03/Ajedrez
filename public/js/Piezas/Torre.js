import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Torre extends Pieza {
    /**
     * Crea una instancia de la pieza Torre con su color y posición.
     * 
     * @param {string} color - El color de la torre (blanca o negra).
     * @param {string} posicion - La posición inicial de la torre en el tablero.
     */
    constructor(color, posicion) {
        super(color, "Torre", posicion);
        this.primerMovimiento = "true"; // Indica si es el primer movimiento de la torre
        // Coloca la pieza en su casilla correspondiente en el tablero
        this.colocarEnTablero();
    }

    /**
     * Obtiene el símbolo correspondiente a la pieza Torre según su color.
     * 
     * @returns {string} El símbolo de la torre blanca (♖) o negra (♜).
     */
    obtenerSimboloPieza() {
        // Retorna el símbolo de la torre basado en su color
        if (this.constructor.name === "Torre") {
            return this.color === "blanca" ? "♖" : "♜"; // Torre blanca o negra
        }
        return "";
    }

    /**
     * Calcula los movimientos posibles de la torre desde su posición actual.
     * La torre se mueve en líneas rectas, horizontal o verticalmente, y captura piezas enemigas.
     * 
     * @returns {Array<string>} Lista de las posiciones a las que la torre puede moverse.
     */
    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Índice de la columna de la pieza
        const fila = parseInt(this.posicion[1]) - 1; // Convertir la fila a índice (0-7)
        const movimientosPosibles = [];

        // Verificar que la columna calculada es válida
        if (columna === -1) {
            return movimientosPosibles; // Si la columna es inválida, retornar lista vacía
        }

        // Direcciones de movimiento posibles: horizontal (izquierda-derecha) y vertical (arriba-abajo)
        const direcciones = [
            { x: 1, y: 0 }, // Movimiento hacia la derecha
            { x: -1, y: 0 }, // Movimiento hacia la izquierda
            { x: 0, y: 1 }, // Movimiento hacia arriba
            { x: 0, y: -1 } // Movimiento hacia abajo
        ];

        // Recorrer las posibles direcciones de movimiento
        for (const dir of direcciones) {
            let nuevaColumna = columna;
            let nuevaFila = fila;

            // Avanzar en la dirección correspondiente hasta llegar al límite del tablero o encontrar una pieza
            while (true) {
                nuevaColumna += dir.x;
                nuevaFila += dir.y;

                // Verificar que la nueva casilla esté dentro de los límites del tablero
                if (nuevaColumna < 0 || nuevaColumna >= 8 || nuevaFila < 0 || nuevaFila >= 8) {
                    break; // Si la casilla está fuera del tablero, salir del bucle
                }

                const nuevaPosicion = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase();
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía, la torre puede moverse allí
                if (!piezaEnDestino) {
                    movimientosPosibles.push(nuevaPosicion);
                }
                // Si hay una pieza enemiga en la casilla, la torre puede capturarla y detenerse
                else if (piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                    break; // Después de capturar, no puede seguir moviéndose en esa dirección
                }
                // Si hay una pieza aliada, la torre no puede moverse más en esa dirección
                else {
                    break;
                }
            }
        }

        return movimientosPosibles; // Retorna todas las posiciones posibles a las que puede moverse la torre
    }
}