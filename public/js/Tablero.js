export class Tablero {
    constructor() {
        this.casillas = {}; // Clave = posición (ej: "a2"), Valor = { color: "blanco" | "negro", tipo: "caballo" | "torre" | ... } o null

        // Inicializar todas las casillas como vacías
        const columnas = ["a", "b", "c", "d", "e", "f", "g", "h"];
        for (let fila = 1; fila <= 8; fila++) {
            for (let col of columnas) {
                this.casillas[`${col}${fila}`] = null; // null significa que está vacía
            }
        }
    }

    // Marcar una casilla como ocupada por una pieza
    ocuparCasilla(posicion, pieza) {
        if (!pieza || !pieza.color || !pieza.tipo) {
            console.error(`Error: No se ha pasado una pieza válida para ocupar la posición ${posicion}`, pieza);
            return;
        }

        // Guardar tanto el color como el tipo de la pieza en la casilla
        this.casillas[posicion] = { color: pieza.color, tipo: pieza.tipo };
    }

    // Marcar una casilla como vacía
    liberarCasilla(posicion) {
        this.casillas[posicion] = null;
    }

    // Obtener la pieza en una casilla o null si está vacía
    obtenerPieza(posicion) {
        return this.casillas[posicion] || null; // Devuelve null si la casilla está vacía
    }
}

// Crear una instancia global del tablero
export const tablero = new Tablero();
