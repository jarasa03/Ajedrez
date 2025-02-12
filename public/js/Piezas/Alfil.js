import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Alfil extends Pieza {
    constructor(color, posicion) {
        super(color, "Alfil", posicion);
        
        // Colocamos la pieza en su casilla al instanciarla
        this.colocarEnTablero();
    }

    colocarEnTablero() {
        const casilla = document.querySelector(`#${this.posicion.toUpperCase()}`);
        console.log(casilla)
        if (casilla) {
            const piezaDiv = document.createElement("span");
            piezaDiv.classList.add("pieza");
            piezaDiv.classList.add("alfil");
            piezaDiv.innerText = this.obtenerSimboloPieza();

            // Asignamos el id de la casilla a la pieza
            piezaDiv.setAttribute("id", this.posicion);
            console.log(piezaDiv);

            // Añadiendo atributos de accesibilidad directamente al span de la pieza
            piezaDiv.setAttribute("role", "img");  // Especifica que este es un objeto de imagen
            piezaDiv.setAttribute("aria-label", `${this.constructor.name} ${this.color}`); // Descripción de la pieza (ej. Alfil blanco)

            // Añadimos clases específicas para el color de la pieza
            piezaDiv.classList.add(this.color === "blanca" ? "pieza-blanca" : "pieza-negra");

            // Añadimos la pieza a la casilla correspondiente
            casilla.appendChild(piezaDiv);
        }
    }

    obtenerSimboloPieza() {
        // Dependiendo del color, asignamos el símbolo adecuado
        return this.color === "blanca" ? "♗" : "♝"; // Alfil blanco o negro
    }

    mover(nuevaPosicion) {
        // TODO: Implementar el movimiento del alfil
    }

    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Asegurarse de que la columna esté en minúsculas
        const fila = parseInt(this.posicion[1]) - 1; // Conversión de la fila para que empiece desde 0
        const movimientosPosibles = [];

        // Verificar que la columna esté bien calculada
        console.log(`Posición inicial: Columna = ${columna} (Letra ${this.posicion[0]}), Fila = ${fila + 1}`);
        if (columna === -1) {
            console.log("Error: Columna inválida.");
            return movimientosPosibles;
        }

        // Direcciones diagonales: arriba-derecha, arriba-izquierda, abajo-derecha, abajo-izquierda
        const direcciones = [
            { x: 1, y: 1 }, { x: 1, y: -1 },
            { x: -1, y: 1 }, { x: -1, y: -1 }
        ];

        // Recorrer las 4 direcciones posibles
        for (const dir of direcciones) {
            let nuevaColumna = columna;
            let nuevaFila = fila;

            // Avanzar en la dirección hasta que se salga del tablero o se encuentre una pieza
            while (true) {
                nuevaColumna += dir.x;
                nuevaFila += dir.y;

                // Verificar que la nueva casilla esté dentro del tablero (0-7)
                if (nuevaColumna < 0 || nuevaColumna >= 8 || nuevaFila < 0 || nuevaFila >= 8) {
                    break; // Si se sale del tablero, detenerse
                }

                const nuevaPosicion = arrayLetras[nuevaColumna] + (nuevaFila + 1);
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía, el alfil puede moverse allí
                if (!piezaEnDestino) {
                    movimientosPosibles.push(nuevaPosicion);
                }
                // Si tiene una pieza enemiga, el alfil puede capturarla y moverse allí
                else if (piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                    // Después de capturar, puede seguir moviéndose, pero se detiene en esa casilla.
                    break; // No seguimos más en esa dirección tras capturar una pieza
                }
                // Si tiene una pieza aliada, el alfil no puede moverse más en esa dirección
                else {
                    break;
                }
            }
        }

        return movimientosPosibles;
    }
}
