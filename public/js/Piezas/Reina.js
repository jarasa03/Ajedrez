import { Pieza } from "./Pieza.js"

export class Reina extends Pieza {
    constructor(color, posicion) {
        super(color, "Reina", posicion)
    }

    mover(nuevaPosicion) {
        // TODO: Hacer que se mueva
    }

    calcularMovimientos() {
        // TODO: Calculo de movimientos posibles
    }
}