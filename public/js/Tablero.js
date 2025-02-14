export class Tablero {
    constructor() {
        this.casillas = {}; // Un diccionario donde cada casilla tendrá una referencia a la pieza
    }

    // Obtener la pieza en una casilla o null si está vacía
    obtenerPieza(posicion) {
        return this.casillas[posicion.toUpperCase()] || null; // Devuelve null si la casilla está vacía
    }

    // Asignar una pieza a una posición del tablero
    colocarPieza(pieza) {
        this.casillas[pieza.posicion.toUpperCase()] = pieza; // Guarda la pieza en la posición
    }

    // Eliminar una pieza de una posición (cuando se mueve o es comida)
    eliminarPieza(posicion) {
        delete this.casillas[posicion.toUpperCase()]; // Borra la referencia de la pieza
    }
}

// Crear una instancia global del tablero
export const tablero = new Tablero();