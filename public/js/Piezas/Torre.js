import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Torre extends Pieza {
    constructor(color, posicion) {
        super(color, "Torre", posicion);

        // Colocamos la pieza en su casilla
        this.colocarEnTablero();
    }

    colocarEnTablero() {
        // Asegurarse de que el id coincida con la posición de la pieza
        const casilla = document.querySelector(`#${this.posicion.toUpperCase()}`);
        if (casilla) {
            const piezaDiv = document.createElement("span");
            piezaDiv.classList.add("pieza");
            piezaDiv.classList.add("torre");
            piezaDiv.innerText = this.obtenerSimboloPieza(); // Aseguramos que el símbolo sea correcto
            
            piezaDiv.setAttribute("id", this.posicion);  // Asignar id de la casilla
            piezaDiv.setAttribute("role", "img");  // Especifica que es una imagen
            piezaDiv.setAttribute("aria-label", `${this.constructor.name} ${this.color}`); // Descripción de la pieza (ej. Torre blanca)
            
            piezaDiv.classList.add(this.color === "blanca" ? "pieza-blanca" : "pieza-negra");

            casilla.appendChild(piezaDiv); // Colocamos la pieza en la casilla
        }
    }

    obtenerSimboloPieza() {
        // Retorna el símbolo según el color de la pieza
        if (this.constructor.name === "Torre") {
            return this.color === "blanca" ? "♖" : "♜"; // Torre blanca o negra
        }
        return "";
    }

    mover(nuevaPosicion) {
        // TODO: Implementar movimiento de la torre
    }

    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase());
        const fila = parseInt(this.posicion[1]) - 1; // Convertir la fila para que empiece desde 0
        const movimientosPosibles = [];

        // Verificar que la columna esté bien calculada
        console.log(`Posición inicial: Columna = ${columna} (Letra ${this.posicion[0]}), Fila = ${fila + 1}`);
        if (columna === -1) {
            console.log("Error: Columna inválida.");
            return movimientosPosibles;
        }

        // Direcciones de movimiento: horizontal (izquierda-derecha) y vertical (arriba-abajo)
        const direcciones = [
            { x: 1, y: 0 }, // Derecha
            { x: -1, y: 0 }, // Izquierda
            { x: 0, y: 1 }, // Arriba
            { x: 0, y: -1 } // Abajo
        ];

        // Recorrer todas las direcciones posibles
        for (const dir of direcciones) {
            let nuevaColumna = columna;
            let nuevaFila = fila;

            // Avanzar en la dirección hasta que se salga del tablero o se encuentre una pieza
            while (true) {
                nuevaColumna += dir.x;
                nuevaFila += dir.y;

                // Verificar que la nueva casilla esté dentro del tablero
                if (nuevaColumna < 0 || nuevaColumna >= 8 || nuevaFila < 0 || nuevaFila >= 8) {
                    break; // Si se sale del tablero, detenerse
                }

                const nuevaPosicion = arrayLetras[nuevaColumna] + (nuevaFila + 1);
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía, la Torre puede moverse allí
                if (!piezaEnDestino) {
                    movimientosPosibles.push(nuevaPosicion);
                }
                // Si tiene una pieza enemiga, la Torre puede capturarla y moverse allí
                else if (piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                    break; // Después de capturar, no puede seguir moviéndose en esta dirección
                }
                // Si tiene una pieza aliada, la Torre no puede moverse más en esa dirección
                else {
                    break;
                }
            }
        }

        return movimientosPosibles;
    }
}
