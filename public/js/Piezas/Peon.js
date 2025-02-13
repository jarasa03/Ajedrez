import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Peon extends Pieza {
    constructor(color, posicion) {
        super(color, "Peon", posicion);
        this.primerMovimiento = true; // Flag para verificar si es el primer movimiento
        // Colocamos la pieza en su casilla
        this.colocarEnTablero();
    }

    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♙" : "♟"; // Peón blanco o negro
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

        // Dirección del movimiento del peón dependiendo de su color
        const direccion = this.color === "blanca" ? 1 : -1;

        // Movimiento hacia adelante (una casilla)
        const nuevaFilaAdelante = fila + direccion;
        if (nuevaFilaAdelante >= 0 && nuevaFilaAdelante < 8) {
            const nuevaPosicionAdelante = (arrayLetras[columna] + (nuevaFilaAdelante + 1)).toUpperCase();
            const piezaEnDestinoAdelante = tablero.obtenerPieza(nuevaPosicionAdelante);

            // Si la casilla está vacía, el peón puede moverse allí
            if (!piezaEnDestinoAdelante) {
                movimientosPosibles.push(nuevaPosicionAdelante);
            }
        }

        // Movimiento hacia adelante (dos casillas), solo en el primer movimiento
        if (this.primerMovimiento) {
            const nuevaFilaDobleAdelante = fila + 2 * direccion;
            if (nuevaFilaDobleAdelante >= 0 && nuevaFilaDobleAdelante < 8) {
                const nuevaPosicionDobleAdelante = (arrayLetras[columna] + (nuevaFilaDobleAdelante + 1)).toUpperCase();
                const piezaEnDestinoDobleAdelante = tablero.obtenerPieza(nuevaPosicionDobleAdelante);

                // Si la casilla está vacía, el peón puede moverse allí
                if (!piezaEnDestinoDobleAdelante) {
                    movimientosPosibles.push(nuevaPosicionDobleAdelante);
                }
            }
        }

        // Comer en diagonal (si hay piezas enemigas)
        const direccionesComer = [
            { x: 1, y: direccion }, // Comida en diagonal derecha
            { x: -1, y: direccion } // Comida en diagonal izquierda
        ];

        for (const dir of direccionesComer) {
            const nuevaColumna = columna + dir.x;
            const nuevaFila = fila + dir.y;

            // Verificar que la nueva casilla esté dentro del tablero
            if (nuevaColumna >= 0 && nuevaColumna < 8 && nuevaFila >= 0 && nuevaFila < 8) {
                const nuevaPosicionComer = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase();
                const piezaEnDestinoComer = tablero.obtenerPieza(nuevaPosicionComer);

                // Si la casilla tiene una pieza enemiga, el peón puede comerla
                if (piezaEnDestinoComer && piezaEnDestinoComer.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicionComer);
                }
            }
        }

        return movimientosPosibles;
    }
}