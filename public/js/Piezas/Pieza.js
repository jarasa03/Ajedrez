import { tablero } from "../Tablero.js";

export class Pieza {
    constructor(color, tipo, posicion) {

        if (new.target === Pieza) {
            throw new Error("No se puede instanciar la clase Pieza directamente");
        }

        this.color = color;
        this.tipo = tipo;
        this.posicion = posicion;

    }

    mover(nuevaPosicion) {
        const movimientosValidos = this.calcularMovimientos();

        if (!movimientosValidos.includes(nuevaPosicion)) {
            return false;
        }

        // Obtener la casilla actual y la nueva casilla
        const casillaActual = document.querySelector(`#${this.posicion.toUpperCase()}`);
        const casillaNueva = document.querySelector(`#${nuevaPosicion.toUpperCase()}`);

        if (!casillaNueva) {
            return false;
        }

        // Verificar si hay una pieza enemiga en la nueva casilla
        const piezaEnNuevaCasilla = tablero.obtenerPieza(nuevaPosicion);
        if (piezaEnNuevaCasilla && piezaEnNuevaCasilla.color !== this.color) {
            // Eliminar visualmente la pieza enemiga
            const piezaElemento = casillaNueva.querySelector(".pieza");
            if (piezaElemento) {
                piezaElemento.remove();
            }
            // Eliminar la pieza enemiga del tablero lógico
            tablero.eliminarPieza(nuevaPosicion);
        }

        // Eliminar la pieza visualmente de la casilla actual
        const piezaElementoActual = casillaActual.querySelector(".pieza");
        if (piezaElementoActual) {
            piezaElementoActual.remove();
        }

        // Actualizar la lógica del tablero
        tablero.eliminarPieza(this.posicion); // Borrar la referencia de la posición anterior
        this.posicion = nuevaPosicion; // Actualizar la posición
        tablero.colocarPieza(this); // Registrar la nueva posición en el tablero

        // Colocar la pieza visualmente en la nueva casilla
        this.colocarEnTablero();

        // Si es el primer movimiento del peón, actualizar el flag
        if (this.primerMovimiento) {
            this.primerMovimiento = false;
        }

        return true;
    }

    calcularMovimientos() {
        throw new Error("Método 'calcularMovimientos' debe ser implementado por la subclase");
    }

    colocarEnTablero() {

        const casilla = document.querySelector(`#${this.posicion.toUpperCase()}`);
        if (casilla) {
            const piezaDiv = document.createElement("span");
            piezaDiv.classList.add("pieza", this.tipo.toLowerCase(), this.color === "blanca" ? "pieza-blanca" : "pieza-negra");
            piezaDiv.innerText = this.obtenerSimboloPieza();
            piezaDiv.setAttribute("data-color", this.color); // Establecer el color de la pieza en el data-color

            piezaDiv.setAttribute("id", this.posicion); // ID de la casilla
            piezaDiv.setAttribute("role", "img");
            piezaDiv.setAttribute("aria-label", `${this.constructor.name} ${this.color}`);

            tablero.colocarPieza(this);
            casilla.appendChild(piezaDiv);
        }

    }
}