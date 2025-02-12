import { Pieza } from "./Pieza.js"

export class Torre extends Pieza {
    constructor(color, posicion) {
        super(color, "Torre", posicion)
    }

    mover(nuevaPosicion) {
        // TODO: Hacer que se mueva
    }

    calcularMovimientos() {
        // TODO: Calculo de movimientos posibles
    }
}