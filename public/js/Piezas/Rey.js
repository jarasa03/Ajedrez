import { Pieza } from "./Pieza.js"

export class Rey extends Pieza {
    constructor(color, posicion) {
        super(color, "Rey", posicion)
    }

    mover(nuevaPosicion) {
        // TODO: Hacer que se mueva
    }

    calcularMovimientos() {
        // TODO: Calculo de movimientos posibles
    }
}