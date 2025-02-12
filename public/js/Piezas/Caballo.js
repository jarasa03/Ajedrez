import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";

export class Caballo extends Pieza {
    constructor(color, posicion) {
        super(color, "Caballo", posicion);

        // Colocamos la pieza en su casilla
        this.colocarEnTablero();
    }

    colocarEnTablero() {
        const casilla = document.querySelector(`#${this.posicion.toUpperCase()}`);
        if (casilla) {
            const piezaDiv = document.createElement("span");
            piezaDiv.classList.add("pieza");
            piezaDiv.classList.add("caballo");
            piezaDiv.innerText = this.obtenerSimboloPieza();

            // Asignar ID y atributos de accesibilidad
            piezaDiv.setAttribute("id", this.posicion); // Asignar id de la casilla
            piezaDiv.setAttribute("role", "img"); // Especifica que es una imagen
            piezaDiv.setAttribute("aria-label", `${this.constructor.name} ${this.color}`); // Descripción de la pieza (ej. Caballo blanco)

            // Añadir clases para el color de la pieza
            piezaDiv.classList.add(this.color === "blanca" ? "pieza-blanca" : "pieza-negra");

            // Colocar la pieza en la casilla correspondiente
            casilla.appendChild(piezaDiv);
        }
    }

    obtenerSimboloPieza() {
        // Devolver el símbolo correspondiente del caballo
        if (this.constructor.name === "Caballo") {
            return this.color === "blanca" ? "♘" : "♞"; // Caballo blanco o negro
        }
        return "";
    }

    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Asegurarse que la columna esté en minúsculas
        const fila = parseInt(this.posicion[1]) - 1; // Conversión de la fila para que empiece desde 0
        const movimientosPosibles = [];

        // Verificar que la columna esté bien calculada
        console.log(`Posición inicial: Columna = ${columna} (Letra ${this.posicion[0]}), Fila = ${fila + 1}`);
        if (columna === -1) {
            console.log("Error: Columna inválida.");
            return movimientosPosibles;
        }

        const direcciones = [
            { x: 1, y: 2 }, { x: 2, y: 1 }, { x: -1, y: 2 }, { x: -2, y: 1 },
            { x: 1, y: -2 }, { x: 2, y: -1 }, { x: -1, y: -2 }, { x: -2, y: -1 }
        ];

        for (const dir of direcciones) {
            const nuevaColumna = columna + dir.x;
            const nuevaFila = fila + dir.y;

            // Verificar si la nueva posición está dentro de los límites del tablero (0-7)
            if (nuevaColumna >= 0 && nuevaColumna < 8 && nuevaFila >= 0 && nuevaFila < 8) {
                const nuevaPosicion = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase(); // Convertir la fila a 1-8

                console.log(`Comprobando: nuevaPosicion = ${nuevaPosicion}`);

                // Obtener la pieza en la nueva casilla
                const piezaEnDestino = tablero.obtenerPieza(nuevaPosicion);

                // Si la casilla está vacía o tiene una pieza enemiga, el caballo puede moverse allí
                if (!piezaEnDestino || piezaEnDestino.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicion);
                    console.log(`Movimiento válido: ${nuevaPosicion}`);
                } else {
                    console.log(`Movimiento bloqueado por pieza aliada en: ${nuevaPosicion}`);
                }
            } else {
                console.log(`Fuera de los límites: nuevaPosicion = ${arrayLetras[nuevaColumna]}${nuevaFila + 1}`);
            }
        }

        return movimientosPosibles;
    }
}