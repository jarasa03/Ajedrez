import { Pieza } from "./Pieza.js"

export class Peon extends Pieza {
    constructor(color, posicion) {
        super(color, "Peon", posicion)
    }

    mover(nuevaPosicion) {
        // TODO: Hacer que se mueva
    }

    calcularMovimientos() {
        // TODO: Calculo de movimientos posibles
    }
}