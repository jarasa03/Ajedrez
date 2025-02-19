import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Rey extends Pieza {
    constructor(color, posicion) {
        super(color, "Rey", posicion);
        // Colocamos la pieza en su casilla
        this.colocarEnTablero();
        this.primerMovimiento = true;
    }

    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♔" : "♚"; // Rey blanco o negro
    }

    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase());
        const fila = parseInt(this.posicion[1]) - 1;
        const movimientosPosibles = [];

        // Movimientos normales (1 casilla en cualquier dirección)
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

        for (const dir of direcciones) {
            let nuevaColumna = columna + dir.x;
            let nuevaFila = fila + dir.y;
            if (nuevaColumna >= 0 && nuevaColumna < 8 && nuevaFila >= 0 && nuevaFila < 8) {
                const nuevaPosicion = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase();
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);
                if (!piezaEnDestino || piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                }
            }
        }

        // --- ENROQUE ---
        // Solo se considera si el Rey no se ha movido aún
        if (this.primerMovimiento) {
            // Dependiendo del color, definimos la fila base y las posiciones de las torres
            let filaEnroque = this.color === "blanca" ? "1" : "8";
            let posInicialRey = "E" + filaEnroque;
            // Solo evaluamos enroque si el Rey está en su posición inicial
            if (this.posicion.toUpperCase() === posInicialRey) {

                // Enroque corto (torre en H1/H8)
                const posTorreCorta = "H" + filaEnroque;
                const torreCorta = tablero.obtenerPieza(posTorreCorta);
                if (torreCorta && torreCorta.constructor.name === "Torre" && torreCorta.primerMovimiento) {
                    // Las casillas entre Rey y Torre deben estar vacías: F1 y G1 (o F8 y G8)
                    const posIntermedia1 = "F" + filaEnroque;
                    const posIntermedia2 = "G" + filaEnroque;
                    if (!tablero.obtenerPieza(posIntermedia1) && !tablero.obtenerPieza(posIntermedia2)) {
                        // Agregamos la casilla destino del Rey en el enroque corto: G1 o G8
                        movimientosPosibles.push("G" + filaEnroque);
                    }
                }

                // Enroque largo (torre en A1/A8)
                const posTorreLarga = "A" + filaEnroque;
                const torreLarga = tablero.obtenerPieza(posTorreLarga);
                if (torreLarga && torreLarga.constructor.name === "Torre" && torreLarga.primerMovimiento) {
                    // Las casillas entre Rey y Torre deben estar vacías: D1, C1 y B1 (o D8, C8 y B8)
                    const posIntermedia1 = "D" + filaEnroque;
                    const posIntermedia2 = "C" + filaEnroque;
                    const posIntermedia3 = "B" + filaEnroque; // En algunas reglas es necesario también comprobar esta
                    if (!tablero.obtenerPieza(posIntermedia1) && !tablero.obtenerPieza(posIntermedia2) && !tablero.obtenerPieza(posIntermedia3)) {
                        // Agregamos la casilla destino del Rey en el enroque largo: C1 o C8
                        movimientosPosibles.push("C" + filaEnroque);
                    }
                }
            }
        }

        return movimientosPosibles;
    }
}