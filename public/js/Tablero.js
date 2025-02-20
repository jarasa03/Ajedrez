export class Tablero {
    constructor() {
        /**
         * Almacena las piezas en el tablero.
         * La clave es la posición (ej. "A1"), y el valor es la pieza en esa casilla.
         */
        this.casillas = {};
    }

    /**
     * Obtiene la pieza ubicada en una casilla específica.
     * 
     * @param {string} posicion - Coordenadas de la casilla en notación de ajedrez (ej. "A2").
     * @returns {Pieza|null} La pieza en la casilla o null si está vacía.
     */
    obtenerPieza(posicion) {
        return this.casillas[posicion.toUpperCase()] || null;
    }

    /**
     * Coloca una pieza en el tablero en su posición correspondiente.
     * 
     * @param {Pieza} pieza - La pieza que se colocará en el tablero.
     */
    colocarPieza(pieza) {
        this.casillas[pieza.posicion.toUpperCase()] = pieza;
    }

    /**
     * Elimina una pieza de una casilla del tablero.
     * 
     * @param {string} posicion - Coordenadas de la casilla de la que se eliminará la pieza.
     */
    eliminarPieza(posicion) {
        delete this.casillas[posicion.toUpperCase()];
    }
}

// Instancia única del tablero utilizada globalmente
export const tablero = new Tablero();