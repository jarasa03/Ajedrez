import { tablero } from "../Tablero.js";

let turno = "blanca";
let tiempoBlancas = 15 * 60;
let tiempoNegras = 15 * 60;
let intervaloBlancas;
let intervaloNegras;
let cronometroActivoBlancas = false;
let cronometroActivoNegras = false;
const cronoBlancas = document.getElementById("crono-blancas");
const cronoNegras = document.getElementById("crono-negras");
let ultimaCasillaMovida = null;
let ultimaCasillaResaltada = null; // Variable global para almacenar la última casilla resaltada

export class Pieza {
    constructor(color, tipo, posicion) {

        if (new.target === Pieza) {
            throw new Error("No se puede instanciar la clase Pieza directamente");
        }

        this.color = color;
        this.tipo = tipo;
        this.posicion = posicion;

    }

    // Función para restaurar el color de la casilla
    restaurarColorCasilla(casilla) {
        if (casilla) { // Verificar que la casilla no sea null
            if (casilla.classList.contains('casilla-blanca')) {
                casilla.style.backgroundColor = "var(--color-casilla-blanca)";
            } else if (casilla.classList.contains('casilla-negra')) {
                casilla.style.backgroundColor = "var(--color-casilla-negra)";
            }
        }
    }

    mover(nuevaPosicion) {
        if (this.color === turno) {
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

            // Restaurar el color de la última casilla resaltada (si existe)
            if (ultimaCasillaResaltada && ultimaCasillaResaltada !== casillaNueva) {
                this.restaurarColorCasilla(ultimaCasillaResaltada);
            }

            // Verificar si hay una pieza enemiga en la nueva casilla
            const piezaEnNuevaCasilla = tablero.obtenerPieza(nuevaPosicion);

            // Resaltar la nueva casilla: rojo si se come una pieza, naranja si está vacía
            if (piezaEnNuevaCasilla && piezaEnNuevaCasilla.color !== this.color) {
                casillaNueva.style.backgroundColor = "#ff3232";
            } else {
                casillaNueva.style.backgroundColor = "orange";
            }

            // Guardar la nueva casilla como la última casilla resaltada
            ultimaCasillaResaltada = casillaNueva;

            // Si hay una pieza enemiga, la eliminamos
            if (piezaEnNuevaCasilla && piezaEnNuevaCasilla.color !== this.color) {
                const piezaElemento = casillaNueva.querySelector(".pieza");
                if (piezaElemento) {
                    piezaElemento.remove();
                }
                tablero.eliminarPieza(nuevaPosicion);
            }

            // Eliminar la pieza visualmente de la casilla actual
            const piezaElementoActual = casillaActual.querySelector(".pieza");
            if (piezaElementoActual) {
                piezaElementoActual.remove();
            }

            // Actualizar la lógica del tablero
            tablero.eliminarPieza(this.posicion);
            this.posicion = nuevaPosicion;
            tablero.colocarPieza(this);

            // Colocar la pieza visualmente en la nueva casilla
            this.colocarEnTablero();

            // Si es el primer movimiento del peón, actualizar el flag
            if (this.primerMovimiento) {
                this.vulnerableEnPassant = true;
            } else {
                this.vulnerableEnPassant = false;
            }
            this.primerMovimiento = false;

            // Verificar si el peón ha llegado a la fila de promoción
            const filaPromocion = this.color === "blanca" ? 8 : 1;
            const filaPeon = parseInt(this.posicion[1]);

            if (filaPeon === filaPromocion && this.constructor.name === "Peon") {

                // Eliminar el peón antes de la promoción
                tablero.eliminarPieza(this.posicion);

                // Ahora promovemos al peón
                this.promocionar();

                // Cambiar el turno después de la promoción
                if (turno === "blanca") {
                    turno = "negra";
                    iniciarCronometroNegro();
                    detenerCronometroBlancas();
                } else {
                    turno = "blanca";
                    iniciarCronometroBlanco();
                    detenerCronometroNegras();
                }

                return true;
            }

            // Cambiar el turno
            if (turno === "blanca") {
                iniciarCronometroNegro();
                detenerCronometroBlancas();
                turno = "negra";
            } else {
                iniciarCronometroBlanco();
                detenerCronometroNegras();
                turno = "blanca";
            }

            // Comprobar si queda un solo rey en el tablero
            let reyes = document.querySelectorAll(".rey");
            if (reyes.length === 1) {
                if (reyes[0].classList.contains("pieza-blanca")) {
                    window.location.href = "../ganadores/gananBlancas.html";
                } else if (reyes[0].classList.contains("pieza-negra")) {
                    window.location.href = "../ganadores/gananNegras.html";
                }
            }

            return true;
        }
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

            let piezaClicada = null; // Variable global para almacenar la pieza seleccionada

            let casillasPosibles = []; // Para almacenar las casillas posibles de movimiento
            let coloresOriginales = {}; // Para almacenar los colores originales de las casillas

            piezaDiv.addEventListener("mousedown", (event) => {
                piezaClicada = event.target; // Guardar la pieza seleccionada
                casillasPosibles = tablero.obtenerPieza(piezaClicada.id).calcularMovimientos() || []; // Asegurarse que no sea null

                casillasPosibles.forEach(id => {
                    let casilla = document.getElementById(id);
                    if (casilla) {
                        // Guardar el color original de la casilla
                        coloresOriginales[id] = casilla.style.backgroundColor;
                        // Cambiar el color de la casilla seleccionable
                        casilla.style.backgroundColor = "#d22e80";
                    }
                });
            });

            document.addEventListener("mouseup", (event) => {
                // Restaurar los colores de las casillas de movimiento (el resaltado temporal)
                casillasPosibles.forEach(id => {
                    let casilla = document.getElementById(id);
                    if (casilla) {
                        casilla.style.backgroundColor = coloresOriginales[id] || "";
                    }
                });

                // Proceder con el movimiento de la pieza si se suelta sobre una casilla válida
                if (piezaClicada) {
                    const casillaClicada = event.target;

                    // Verificar que la casilla destino sea una de las válidas
                    if (casillaClicada && casillasPosibles.includes(casillaClicada.id.toUpperCase())) {

                        // Restaurar el color de la casilla del último movimiento si es diferente
                        if (ultimaCasillaMovida && ultimaCasillaMovida !== casillaClicada.id) {
                            let casillaAnterior = document.getElementById(ultimaCasillaMovida);
                            if (casillaAnterior) {
                                if (coloresOriginales[ultimaCasillaMovida]) {
                                    casillaAnterior.style.backgroundColor = coloresOriginales[ultimaCasillaMovida];
                                }
                            }
                        }

                        // Mover la pieza
                        tablero.obtenerPieza(piezaClicada.id).mover(casillaClicada.id.toUpperCase());

                        ultimaCasillaMovida = casillaClicada.id;
                    }
                    piezaClicada = null; // Limpiar la selección de la pieza
                }

                casillasPosibles = []; // Resetear las casillas posibles
            });

            tablero.colocarPieza(this);
            casilla.appendChild(piezaDiv);
        }

    }

}

function actualizarCronometroBlanco() {
    const minutos = Math.floor(tiempoBlancas / 60).toString().padStart(2, '0');
    const segundos = (tiempoBlancas % 60).toString().padStart(2, '0');
    cronoBlancas.textContent = `${minutos}:${segundos}`;
}

function actualizarCronometroNegro() {
    const minutos = Math.floor(tiempoNegras / 60).toString().padStart(2, '0');
    const segundos = (tiempoNegras % 60).toString().padStart(2, '0');
    cronoNegras.textContent = `${minutos}:${segundos}`;
}

function iniciarCronometroBlanco() {
    intervaloBlancas = setInterval(() => {
        if (tiempoBlancas > 0) {
            tiempoBlancas--;
            actualizarCronometroBlanco();
        } else {
            clearInterval(intervaloBlancas); // Detener cuando llega a 0
            window.location.href = "../ganadores/gananNegras.html";
            cronometroActivoBlancas = false;
        }
    }, 1000);

    cronometroActivoBlancas = true;
}

function iniciarCronometroNegro() {
    intervaloNegras = setInterval(() => {
        if (tiempoNegras > 0) {
            tiempoNegras--;
            actualizarCronometroNegro();
        } else {
            clearInterval(intervaloNegras); // Detener cuando llega a 0
            window.location.href = "../ganadores/gananBlancas.html";
            cronometroActivoNegras = false;
        }
    }, 1000);

    cronometroActivoNegras = true;
}

function detenerCronometroBlancas() {
    clearInterval(intervaloBlancas);
    cronometroActivoBlancas = false;
}

function detenerCronometroNegras() {
    clearInterval(intervaloNegras);
    cronometroActivoNegras = false;
}