import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Rey extends Pieza {
    constructor(color, posicion) {
        super(color, "Rey", posicion);
        // Colocación de la pieza en el tablero
        this.colocarEnTablero();
        this.primerMovimiento = true; // Se marca si es el primer movimiento del Rey
    }

    /**
     * Obtiene el símbolo que representa la pieza Rey en el tablero.
     * @returns {string} El símbolo correspondiente a la pieza (♔ o ♚).
     */
    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♔" : "♚"; // Retorna el símbolo del Rey blanco o negro
    }

    /**
     * Calcula los movimientos posibles del Rey. Incluye movimientos normales y enroque.
     * @returns {string[]} Un arreglo con las posiciones posibles del Rey.
     */
    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Calcula la columna basada en la letra
        const fila = parseInt(this.posicion[1]) - 1; // Calcula la fila, ajustando para que empiece desde 0
        const movimientosPosibles = [];

        // Definición de las direcciones de movimiento del Rey (1 casilla en cualquier dirección)
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

        // Iteración sobre las direcciones posibles para el Rey
        for (const dir of direcciones) {
            let nuevaColumna = columna + dir.x;
            let nuevaFila = fila + dir.y;
            // Verificación si el movimiento está dentro de los límites del tablero
            if (nuevaColumna >= 0 && nuevaColumna < 8 && nuevaFila >= 0 && nuevaFila < 8) {
                const nuevaPosicion = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase(); // Nueva posición a comprobar
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion); // Obtener pieza en la casilla destino
                // Si la casilla está vacía o contiene una pieza enemiga, se puede mover
                if (!piezaEnDestino || piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion); // Agregar la nueva posición como posible movimiento
                }
            }
        }

        // --- ENROQUE ---
        // Se verifica el enroque solo si el Rey no se ha movido previamente
        if (this.primerMovimiento) {
            let filaEnroque = this.color === "blanca" ? "1" : "8"; // Definición de la fila de enroque según el color
            let posInicialRey = "E" + filaEnroque; // Posición inicial del Rey

            // Evaluación si el Rey está en su posición inicial
            if (this.posicion.toUpperCase() === posInicialRey) {

                // Enroque corto (torre en H1/H8)
                const posTorreCorta = "H" + filaEnroque;
                const torreCorta = tablero.obtenerPieza(posTorreCorta);
                // Verificación si la Torre está presente y no se ha movido
                if (torreCorta && torreCorta.constructor.name === "Torre" && torreCorta.primerMovimiento) {
                    // Comprobación de que las casillas intermedias entre el Rey y la Torre estén vacías
                    const posIntermedia1 = "F" + filaEnroque;
                    const posIntermedia2 = "G" + filaEnroque;
                    if (!tablero.obtenerPieza(posIntermedia1) && !tablero.obtenerPieza(posIntermedia2)) {
                        // Agregar la casilla de destino del Rey en el enroque corto: G1 o G8
                        movimientosPosibles.push("G" + filaEnroque);
                    }
                }

                // Enroque largo (torre en A1/A8)
                const posTorreLarga = "A" + filaEnroque;
                const torreLarga = tablero.obtenerPieza(posTorreLarga);
                // Verificación si la Torre está presente y no se ha movido
                if (torreLarga && torreLarga.constructor.name === "Torre" && torreLarga.primerMovimiento) {
                    // Comprobación de que las casillas intermedias entre el Rey y la Torre estén vacías
                    const posIntermedia1 = "D" + filaEnroque;
                    const posIntermedia2 = "C" + filaEnroque;
                    const posIntermedia3 = "B" + filaEnroque; // Algunas reglas requieren verificar esta casilla también
                    if (!tablero.obtenerPieza(posIntermedia1) && !tablero.obtenerPieza(posIntermedia2) && !tablero.obtenerPieza(posIntermedia3)) {
                        // Agregar la casilla de destino del Rey en el enroque largo: C1 o C8
                        movimientosPosibles.push("C" + filaEnroque);
                    }
                }
            }
        }

        return movimientosPosibles; // Retorna las posiciones posibles para el movimiento del Rey
    }
}