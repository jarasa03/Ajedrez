import { tablero } from "../Tablero.js";

export class Pieza {
    constructor(color, tipo, posicion) {

        if (new.target === Pieza) {
            throw new Error("No se puede instanciar la clase Pieza directamente");
        }

        this.color = color;
        this.tipo = tipo;
        this.posicion = posicion;

        // Marcar la posición de la pieza en el tablero
        tablero.ocuparCasilla(this.posicion, this);
    }

    mover() {
        throw new Error("Método 'mover' debe ser implementado por la subclase");
    }

    calcularMovimientos() {
        throw new Error("Método 'calcularMovimientos' debe ser implementado por la subclase");
    }

    colocarEnTablero() {
        throw new Error("Método 'colocarEnTablero' debe ser implementado por la subclase");
    }
}