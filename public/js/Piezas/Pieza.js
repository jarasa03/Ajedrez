export class Pieza {
    constructor(color, tipo, posicion) {

        if (new.target === Pieza) {
            throw new Error("No se puede instanciar la clase Pieza directamente");
        }

        this.color = color;
        this.tipo = tipo;
        this.posicion = posicion;
    }

    mover() {
        throw new Error("Método 'mover' debe ser implementado por la subclase")
    }
}