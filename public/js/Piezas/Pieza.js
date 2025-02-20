import { tablero } from "../Tablero.js";

// Variable que indica el turno actual, comenzando con las piezas blancas
let turno = "blanca";

// Temporizadores en segundos (15 minutos por jugador)
let tiempoBlancas = 15 * 60;
let tiempoNegras = 15 * 60;

// Variables para los intervalos de los cronómetros de cada jugador
let intervaloBlancas;
let intervaloNegras;

// Indicadores de si el cronómetro de cada jugador está en funcionamiento
let cronometroActivoBlancas = false;
let cronometroActivoNegras = false;

// Elementos del DOM que muestran el tiempo restante para cada jugador
const cronoBlancas = document.getElementById("crono-blancas");
const cronoNegras = document.getElementById("crono-negras");

// Variables auxiliares para la gestión de movimientos y efectos visuales
let ultimaCasillaMovida = null; // Almacena la última casilla desde la que se movió una pieza
let ultimaCasillaResaltada = null; // Última casilla resaltada visualmente tras un movimiento

// Variables relacionadas con la captura al paso (en passant)
let casillaComidaEnPassant = null; // Casilla donde se ha producido una captura al paso
let colorOriginalCasillaEnPassant = null; // Color original de la casilla afectada

// Variables relacionadas con el enroque
let colorOriginalCasillaEnroque = null; // Color original de la casilla afectada por el enroque
let casillaTorreEnroque = null; // Casilla donde se encuentra la torre involucrada en el enroque

export class Pieza {
    /**
     * Clase base para representar una pieza de ajedrez.
     * No debe instanciarse directamente, ya que es una clase abstracta.
     * 
     * @param {string} color - Color de la pieza ("blanca" o "negra").
     * @param {string} tipo - Tipo de la pieza (peón, torre, caballo, etc.).
     * @param {string} posicion - Posición en el tablero en notación algebraica (ej. "e4").
     * @throws {Error} Si se intenta instanciar directamente esta clase.
     */
    constructor(color, tipo, posicion) {
        if (new.target === Pieza) {
            throw new Error("No se puede instanciar la clase Pieza directamente");
        }

        this.color = color;
        this.tipo = tipo;
        this.posicion = posicion;
    }

    /**
     * Restaura el color original de una casilla del tablero.
     * Verifica si la casilla es blanca o negra y le asigna su color correspondiente.
     * 
     * @param {HTMLElement} casilla - Elemento HTML de la casilla a restaurar.
     */
    restaurarColorCasilla(casilla) {
        if (casilla) { // Verifica que la casilla no sea null
            if (casilla.classList.contains('casilla-blanca')) {
                casilla.style.backgroundColor = "var(--color-casilla-blanca)";
            } else if (casilla.classList.contains('casilla-negra')) {
                casilla.style.backgroundColor = "var(--color-casilla-negra)";
            }
        }
    }

    /**
     * Mueve la pieza a una nueva posición en el tablero.
     * Se realizan comprobaciones de validez para el movimiento, incluyendo enroque y captura al paso.
     * @param {string} nuevaPosicion - La nueva casilla a la que la pieza debe moverse (por ejemplo, 'E5').
     * @returns {boolean} - Devuelve `false` si el movimiento no es válido, de lo contrario, realiza el movimiento y devuelve `true`.
     */
    mover(nuevaPosicion) {
            // Verificar si es el turno de la pieza
            if (this.color === turno) {
                // Obtener los movimientos válidos de la pieza
                const movimientosValidos = this.calcularMovimientos();

                // Verificar si la nueva posición es un movimiento válido
                if (!movimientosValidos.includes(nuevaPosicion)) {
                    return false;
                }

                // Obtener la casilla actual y la nueva casilla
                const casillaActual = document.querySelector(`#${this.posicion.toUpperCase()}`);
                const casillaNueva = document.querySelector(`#${nuevaPosicion.toUpperCase()}`);

                // Si la nueva casilla no existe, el movimiento no es válido
                if (!casillaNueva) {
                    return false;
                }

                // Restaurar el color de la última casilla resaltada (si existe)
                if (ultimaCasillaResaltada && ultimaCasillaResaltada !== casillaNueva) {
                    this.restaurarColorCasilla(ultimaCasillaResaltada);
                }

                // Obtener la pieza en la nueva casilla (si existe)
                let piezaEnNuevaCasilla = tablero.obtenerPieza(nuevaPosicion);

                // --- Detectar captura al paso ---
                const arrayLetras = ["A", "B", "C", "D", "E", "F", "G", "H"];
                const currentCol = arrayLetras.indexOf(this.posicion[0]);
                const currentRow = parseInt(this.posicion[1]) - 1;
                const newCol = arrayLetras.indexOf(nuevaPosicion[0]);
                const newRow = parseInt(nuevaPosicion[1]) - 1;
                const direccion = this.color === "blanca" ? 1 : -1;

                // Considerar captura al paso si el movimiento es diagonal y no hay pieza en la casilla destino
                let enPassant = false;
                if (Math.abs(newCol - currentCol) === 1 && (newRow - currentRow) === direccion && !piezaEnNuevaCasilla) {
                    enPassant = true;
                }

                // Resaltar la casilla de destino (rojo si captura, naranja si está vacía)
                if (piezaEnNuevaCasilla && piezaEnNuevaCasilla.color !== this.color) {
                    casillaNueva.style.backgroundColor = "#ff3232";
                } else {
                    casillaNueva.style.backgroundColor = "orange";
                }

                // Guardar la casilla resaltada
                ultimaCasillaResaltada = casillaNueva;

                // Si hay una pieza enemiga en la casilla destino, eliminarla
                if (piezaEnNuevaCasilla && piezaEnNuevaCasilla.color !== this.color) {
                    const piezaElemento = casillaNueva.querySelector(".pieza");
                    if (piezaElemento) {
                        piezaElemento.remove();
                    }
                    tablero.eliminarPieza(nuevaPosicion);
                }

                if (casillaComidaEnPassant) {
                    casillaComidaEnPassant.style.backgroundColor = colorOriginalCasillaEnPassant;
                }

                // Procesar la captura al paso
                if (enPassant) {
                    const posPiezaCapturada = arrayLetras[newCol] + (currentRow + 1); // Convertir a formato de 1-indexado
                    const casillaPiezaCapturada = document.querySelector(`#${posPiezaCapturada.toUpperCase()}`);
                    if (casillaPiezaCapturada) {
                        const piezaElementoCapturada = casillaPiezaCapturada.querySelector(".pieza");
                        if (piezaElementoCapturada) {
                            piezaElementoCapturada.remove();
                        }
                    }
                    tablero.eliminarPieza(posPiezaCapturada);
                    casillaComidaEnPassant = document.querySelector(`#${posPiezaCapturada.toUpperCase()}`);
                    colorOriginalCasillaEnPassant = casillaComidaEnPassant.style.backgroundColor;
                    casillaComidaEnPassant.style.backgroundColor = "#ff3232";
                }
                // ----------------------------------

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

                if (casillaTorreEnroque) {
                    casillaTorreEnroque.style.backgroundColor = colorOriginalCasillaEnroque;
                }

                // --- Lógica de enroque para el Rey ---
                // Solo se ejecuta si la pieza es un Rey y se mueve desde su posición inicial
                if (this.constructor.name === "Rey") {
                    const posInicialRey = this.color === "blanca" ? "E1" : "E8";
                    if (this.posicion.toUpperCase() !== posInicialRey) {
                        const arrayLetras = ["A", "B", "C", "D", "E", "F", "G", "H"];
                        const colInicial = arrayLetras.indexOf(posInicialRey[0]);
                        const colActual = arrayLetras.indexOf(this.posicion[0]);
                        const diff = colActual - colInicial;

                        // Si el Rey se mueve dos columnas, es un enroque
                        if (Math.abs(diff) === 2) {
                            const fila = posInicialRey[1]; // '1' o '8'
                            if (diff > 0) {
                                // Enroque corto: la torre de H se mueve a F
                                const posTorreInicial = "H" + fila;
                                const posTorreDestino = "F" + fila;
                                const torre = tablero.obtenerPieza(posTorreInicial);
                                if (torre && torre.constructor.name === "Torre" && torre.primerMovimiento) {
                                    const casillaTorreInicial = document.querySelector(`#${posTorreInicial.toUpperCase()}`);
                                    if (casillaTorreInicial) {
                                        const piezaTorre = casillaTorreInicial.querySelector(".pieza");
                                        if (piezaTorre) {
                                            piezaTorre.remove();
                                        }
                                    }
                                    tablero.eliminarPieza(posTorreInicial);
                                    torre.posicion = posTorreDestino;
                                    tablero.colocarPieza(torre);
                                    torre.colocarEnTablero();
                                    torre.primerMovimiento = false;
                                    casillaTorreEnroque = document.getElementById(posTorreDestino);
                                    colorOriginalCasillaEnroque = document.getElementById(posTorreDestino).style.backgroundColor;
                                    document.getElementById(posTorreDestino).style.backgroundColor = "orange";
                                }
                            } else {
                                // Enroque largo: la torre de A se mueve a D
                                const posTorreInicial = "A" + fila;
                                const posTorreDestino = "D" + fila;
                                const torre = tablero.obtenerPieza(posTorreInicial);
                                if (torre && torre.constructor.name === "Torre" && torre.primerMovimiento) {
                                    const casillaTorreInicial = document.querySelector(`#${posTorreInicial.toUpperCase()}`);
                                    if (casillaTorreInicial) {
                                        const piezaTorre = casillaTorreInicial.querySelector(".pieza");
                                        if (piezaTorre) {
                                            piezaTorre.remove();
                                        }
                                    }
                                    tablero.eliminarPieza(posTorreInicial);
                                    torre.posicion = posTorreDestino;
                                    tablero.colocarPieza(torre);
                                    torre.colocarEnTablero();
                                    torre.primerMovimiento = false;
                                    casillaTorreEnroque = document.getElementById(posTorreDestino);
                                    colorOriginalCasillaEnroque = document.getElementById(posTorreDestino).style.backgroundColor;
                                    document.getElementById(posTorreDestino).style.backgroundColor = "orange";
                                }
                            }
                        }
                    }
                }

                // Actualización de flags del peón: primer movimiento y vulnerabilidad en passant
                if (this.primerMovimiento) {
                    // Si el peón se mueve dos casillas, se marca la vulnerabilidad en passant.
                    // El estado de vulnerabilidad se debe desactivar si el movimiento no fue de dos casillas.
                    this.vulnerableEnPassant = (Math.abs(newRow - currentRow) === 2);
                } else {
                    // Desactivar vulnerabilidad en passant si no es el primer movimiento
                    this.vulnerableEnPassant = false;
                }
                // Marcar que el peón ya no está en su primer movimiento
                this.primerMovimiento = false;

                // Verificación de promoción del peón al llegar a la fila correspondiente
                const filaPromocion = this.color === "blanca" ? 8 : 1;
                const filaPeon = parseInt(this.posicion[1]);

                if (filaPeon === filaPromocion && this.constructor.name === "Peon") {
                    // Eliminar el peón del tablero lógico antes de la promoción
                    tablero.eliminarPieza(this.posicion);
                    // Realizar la promoción del peón
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
                    // Verificar si queda un solo rey en el tablero
                    let reyes = document.querySelectorAll(".rey");
                    if (reyes.length === 1) {
                        // Si el único rey restante es blanco, las blancas ganan
                        if (reyes[0].classList.contains("pieza-blanca")) {
                            window.location.href = "../ganadores/gananBlancas.html";
                        } else if (reyes[0].classList.contains("pieza-negra")) {
                            window.location.href = "../ganadores/gananNegras.html";
                        }
                    }
                    return true;
                }

                // Cambio de turno
                if (turno === "blanca") {
                    iniciarCronometroNegro();
                    detenerCronometroBlancas();
                    turno = "negra";
                } else {
                    iniciarCronometroBlanco();
                    detenerCronometroNegras();
                    turno = "blanca";
                }

                // Reiniciar vulnerabilidad al en passant después de cambiar el turno
                resetEnPassantVulnerability(turno);

                // Verificar si queda un solo rey en el tablero
                let reyes = document.querySelectorAll(".rey");
                if (reyes.length === 1) {
                    // Si el único rey restante es blanco, las blancas ganan
                    if (reyes[0].classList.contains("pieza-blanca")) {
                        window.location.href = "../ganadores/gananBlancas.html";
                    } else if (reyes[0].classList.contains("pieza-negra")) {
                        window.location.href = "../ganadores/gananNegras.html";
                    }
                }

                return true;
            }
        }
        /**
         * Calcula los movimientos posibles de la pieza.
         * Este método debe ser implementado por las subclases.
         * @throws {Error} Si no está implementado en la subclase.
         */
    calcularMovimientos() {
        throw new Error("Método 'calcularMovimientos' debe ser implementado por la subclase");
    }

    /**
     * Coloca la pieza en el tablero, creando el elemento HTML correspondiente y gestionando los eventos de movimiento.
     */
    colocarEnTablero() {
        const casilla = document.querySelector(`#${this.posicion.toUpperCase()}`);
        if (casilla) {
            const piezaDiv = document.createElement("span");
            piezaDiv.classList.add("pieza", this.tipo.toLowerCase(), this.color === "blanca" ? "pieza-blanca" : "pieza-negra");
            piezaDiv.innerText = this.obtenerSimboloPieza();
            piezaDiv.setAttribute("data-color", this.color); // Establecer el color de la pieza en el atributo data-color
            piezaDiv.setAttribute("id", this.posicion); // Asignar la ID correspondiente a la pieza
            piezaDiv.setAttribute("role", "img"); // Definir el role para accesibilidad
            piezaDiv.setAttribute("aria-label", `${this.constructor.name} ${this.color}`); // Descripción accesible de la pieza

            let piezaClicada = null; // Variable que almacena la pieza seleccionada por el jugador
            let casillasPosibles = []; // Arreglo que almacena las casillas posibles para el movimiento
            let coloresOriginales = {}; // Objeto para almacenar los colores originales de las casillas

            piezaDiv.addEventListener("mousedown", (event) => {
                piezaClicada = event.target; // Asignar la pieza seleccionada
                casillasPosibles = tablero.obtenerPieza(piezaClicada.id).calcularMovimientos() || []; // Obtener movimientos posibles

                // Resaltar las casillas donde la pieza puede moverse
                casillasPosibles.forEach(id => {
                    let casilla = document.getElementById(id);
                    if (casilla) {
                        coloresOriginales[id] = casilla.style.backgroundColor; // Guardar el color original de la casilla
                        casilla.style.backgroundColor = "#d22e80"; // Resaltar la casilla
                    }
                });
            });

            document.addEventListener("mouseup", (event) => {
                // Restaurar los colores originales de las casillas de movimiento
                casillasPosibles.forEach(id => {
                    let casilla = document.getElementById(id);
                    if (casilla) {
                        casilla.style.backgroundColor = coloresOriginales[id] || ""; // Restaurar color original
                    }
                });

                // Comprobar si se ha soltado la pieza sobre una casilla válida
                if (piezaClicada) {
                    const casillaClicada = event.target;

                    // Verificar si la casilla clicada es una de las posibles
                    if (casillaClicada && casillasPosibles.includes(casillaClicada.id.toUpperCase())) {

                        // Restaurar el color de la casilla del último movimiento si es necesario
                        if (ultimaCasillaMovida && ultimaCasillaMovida !== casillaClicada.id) {
                            let casillaAnterior = document.getElementById(ultimaCasillaMovida);
                            if (casillaAnterior) {
                                if (coloresOriginales[ultimaCasillaMovida]) {
                                    casillaAnterior.style.backgroundColor = coloresOriginales[ultimaCasillaMovida]; // Restaurar color anterior
                                }
                            }
                        }

                        // Mover la pieza a la nueva casilla
                        tablero.obtenerPieza(piezaClicada.id).mover(casillaClicada.id.toUpperCase());
                        ultimaCasillaMovida = casillaClicada.id; // Registrar la última casilla movida
                    }
                    piezaClicada = null; // Limpiar la selección de la pieza
                }

                casillasPosibles = []; // Limpiar el arreglo de casillas posibles
            });

            // Colocar la pieza en el tablero visualmente
            tablero.colocarPieza(this);
            casilla.appendChild(piezaDiv);
        }
    }
}
/**
 * Desactiva la vulnerabilidad al en passant para las piezas del jugador cuyo turno ha terminado.
 * 
 * @param {string} turno - El turno actual ("blanca" o "negra").
 */
function resetEnPassantVulnerability(turno) {
    // Iterar por todas las casillas del tablero
    for (const casilla in tablero.casillas) {
        const pieza = tablero.casillas[casilla];

        // Si la pieza es un Peón, pertenece al equipo cuyo turno es y es vulnerable, se desactiva la vulnerabilidad
        if (pieza && pieza.constructor.name === "Peon" && pieza.vulnerableEnPassant) {
            if ((turno === "blanca" && pieza.esBlanca) || (turno === "negra" && !pieza.esBlanca)) {
                pieza.vulnerableEnPassant = false;
            }
        }
    }
}

/**
 * Actualiza el cronómetro de las piezas blancas.
 */
function actualizarCronometroBlanco() {
    // Calcular minutos y segundos
    const minutos = Math.floor(tiempoBlancas / 60).toString().padStart(2, '0');
    const segundos = (tiempoBlancas % 60).toString().padStart(2, '0');

    // Actualizar el texto del cronómetro
    cronoBlancas.textContent = `${minutos}:${segundos}`;
}

/**
 * Actualiza el cronómetro de las piezas negras.
 */
function actualizarCronometroNegro() {
    // Calcular minutos y segundos
    const minutos = Math.floor(tiempoNegras / 60).toString().padStart(2, '0');
    const segundos = (tiempoNegras % 60).toString().padStart(2, '0');

    // Actualizar el texto del cronómetro
    cronoNegras.textContent = `${minutos}:${segundos}`;
}

/**
 * Inicia el cronómetro para las piezas blancas.
 * Si el tiempo llega a cero, termina el cronómetro y declara ganador al jugador negro.
 */
function iniciarCronometroBlanco() {
    intervaloBlancas = setInterval(() => {
        // Si quedan segundos en el cronómetro, disminuir el tiempo y actualizar la visualización
        if (tiempoBlancas > 0) {
            tiempoBlancas--;
            actualizarCronometroBlanco();
        } else {
            // Detener el cronómetro y declarar ganador al jugador negro
            clearInterval(intervaloBlancas);
            window.location.href = "../ganadores/gananNegras.html";
            cronometroActivoBlancas = false;
        }
    }, 1000);

    cronometroActivoBlancas = true;
}

/**
 * Inicia el cronómetro para las piezas negras.
 * Si el tiempo llega a cero, termina el cronómetro y declara ganador al jugador blanco.
 */
function iniciarCronometroNegro() {
    intervaloNegras = setInterval(() => {
        // Si quedan segundos en el cronómetro, disminuir el tiempo y actualizar la visualización
        if (tiempoNegras > 0) {
            tiempoNegras--;
            actualizarCronometroNegro();
        } else {
            // Detener el cronómetro y declarar ganador al jugador blanco
            clearInterval(intervaloNegras);
            window.location.href = "../ganadores/gananBlancas.html";
            cronometroActivoNegras = false;
        }
    }, 1000);

    cronometroActivoNegras = true;
}

/**
 * Detiene el cronómetro para las piezas blancas.
 */
function detenerCronometroBlancas() {
    clearInterval(intervaloBlancas);
    cronometroActivoBlancas = false;
}

/**
 * Detiene el cronómetro para las piezas negras.
 */
function detenerCronometroNegras() {
    clearInterval(intervaloNegras);
    cronometroActivoNegras = false;
}