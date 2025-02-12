export class Tablero {

    constructor() {
        this.casillas = {};
    }

    // Obtener la pieza en una casilla o null si está vacía
    obtenerPieza(posicion) {
        return this.casillas[posicion] || null; // Devuelve null si la casilla está vacía
    }
}

// Crear una instancia global del tablero
export const tablero = new Tablero();