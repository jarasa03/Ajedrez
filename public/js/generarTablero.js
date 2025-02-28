import { Torre } from "./Piezas/Torre.js";
import { Caballo } from "./Piezas/Caballo.js";
import { Alfil } from "./Piezas/Alfil.js";
import { Reina } from "./Piezas/Reina.js";
import { Rey } from "./Piezas/Rey.js";
import { Peon } from "./Piezas/Peon.js";

/**
 * Letras que representan las columnas del tablero de ajedrez.
 */
const columnas = ["A", "B", "C", "D", "E", "F", "G", "H"];

/**
 * Objeto que almacena las piezas en sus posiciones iniciales.
 * Las claves representan las coordenadas en notación de ajedrez.
 */
const piezasIniciales = {
    "A8": new Torre("negra", "a8"),
    "B8": new Caballo("negra", "b8"),
    "C8": new Alfil("negra", "c8"),
    "D8": new Reina("negra", "d8"),
    "E8": new Rey("negra", "e8"),
    "F8": new Alfil("negra", "f8"),
    "G8": new Caballo("negra", "g8"),
    "H8": new Torre("negra", "h8"),
    "A7": new Peon("negra", "a7"),
    "B7": new Peon("negra", "b7"),
    "C7": new Peon("negra", "c7"),
    "D7": new Peon("negra", "d7"),
    "E7": new Peon("negra", "e7"),
    "F7": new Peon("negra", "f7"),
    "G7": new Peon("negra", "g7"),
    "H7": new Peon("negra", "h7"),
    "A1": new Torre("blanca", "a1"),
    "B1": new Caballo("blanca", "b1"),
    "C1": new Alfil("blanca", "c1"),
    "D1": new Reina("blanca", "d1"),
    "E1": new Rey("blanca", "e1"),
    "F1": new Alfil("blanca", "f1"),
    "G1": new Caballo("blanca", "g1"),
    "H1": new Torre("blanca", "h1"),
    "A2": new Peon("blanca", "a2"),
    "B2": new Peon("blanca", "b2"),
    "C2": new Peon("blanca", "c2"),
    "D2": new Peon("blanca", "d2"),
    "E2": new Peon("blanca", "e2"),
    "F2": new Peon("blanca", "f2"),
    "G2": new Peon("blanca", "g2"),
    "H2": new Peon("blanca", "h2")
};

const tableroMain = document.querySelector(".tablero");
const numeracionContenedor = document.getElementById("numeracion-casillas");

/**
 * Crea una casilla del tablero, asigna color y devuelve el elemento HTML generado.
 * @param {number} fila - Número de la fila (1 a 8).
 * @param {number} col - Índice de la columna (0 a 7).
 * @returns {HTMLElement} La casilla creada.
 */
function crearCasilla(fila, col) {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");
    casilla.id = columnas[col] + fila;
    casilla.classList.add((fila + col) % 2 === 0 ? "casilla-blanca" : "casilla-negra");
    return casilla;
}

/**
 * Genera la numeración de las filas con letras (A-H) y la inserta en el contenedor correspondiente.
 */
function crearNumeracionFila() {
    columnas.forEach((columna) => {
        let divFila = document.createElement("div");
        divFila.innerText = columna;
        divFila.classList.add("numeracion-fila");
        divFila.id = `fila-${columna}`;
        numeracionContenedor.appendChild(divFila);
    });
}

/**
 * Genera la numeración de las columnas con números (1-8) y la inserta en el contenedor correspondiente.
 */
function crearNumeracionColumnas() {
    for (let i = 1; i <= 8; i++) {
        let divCol = document.createElement("div");
        divCol.innerText = i;
        divCol.classList.add("numeracion-columna");
        divCol.id = `columna-${i}`;
        numeracionContenedor.appendChild(divCol);
    }
}

/**
 * Coloca las piezas en el tablero llamando a su método correspondiente.
 */
function colocarPiezasEnTablero() {
    Object.values(piezasIniciales).forEach(pieza => {
        pieza.colocarEnTablero();
    });
}

/**
 * Genera el tablero de ajedrez con sus casillas y coloca las piezas.
 */
function crearTablero() {
    const fragment = document.createDocumentFragment();
    for (let fila = 8; fila >= 1; fila--) {
        for (let col = 0; col < 8; col++) {
            const casilla = crearCasilla(fila, col);
            fragment.appendChild(casilla);
        }
    }
    tableroMain.appendChild(fragment);
    colocarPiezasEnTablero();
}

// Inicializa la creación del tablero y la numeración
crearTablero();
crearNumeracionFila();
crearNumeracionColumnas();