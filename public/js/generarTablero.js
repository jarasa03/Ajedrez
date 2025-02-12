import { Torre } from "./Piezas/Torre.js";
import { Caballo } from "./Piezas/Caballo.js";
import { Alfil } from "./Piezas/Alfil.js";
import { Reina } from "./Piezas/Reina.js";
import { Rey } from "./Piezas/Rey.js";
import { Peon } from "./Piezas/Peon.js";

import { tablero } from "./Tablero.js";

const tableroMain = document.querySelector(".tablero");
const columnas = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numeracionContenedor = document.getElementById("numeracion-casillas");

const piezasIniciales = {
    // Piezas negras en la fila 8 (arriba)
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

    // Piezas blancas en la fila 1 (abajo)
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

/**
 * Crea una casilla del tablero de ajedrez, asigna un color según su posición
 * y coloca la pieza correspondiente (si existe) en la casilla.
 * Además, asigna atributos de accesibilidad como `role` y `aria-label` tanto a las casillas
 * como a las piezas.
 * 
 * @param {number} fila - Número de la fila de la casilla (1 a 8).
 * @param {number} col - Número de la columna de la casilla (0 a 7, representando las columnas a-h).
 * 
 * @returns {HTMLElement} La casilla creada, con su ID, color y pieza correspondiente (si hay una).
 * 
 * @example
 * // Crear una casilla en la fila 1 y columna 0 (esquina inferior izquierda)
 * const casillaA1 = crearCasilla(1, 0);
 * 
 * @description
 * Esta función también genera un ID único para cada pieza combinando el tipo de pieza
 * (como "torre blanca") y su posición en el tablero (por ejemplo, "a1"). Además, se asignan roles
 * y descripciones accesibles usando `aria-label`, lo que mejora la experiencia para usuarios con discapacidades.
 * 
 * @see {piezasIniciales} Para cómo se inicializan las piezas en el tablero.
 */
function crearCasilla(fila, col) {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");

    // Generar ID en formato "a1", "b2", etc.
    casilla.id = columnas[col] + fila;

    // Asignar color según la posición
    if ((fila + col) % 2 === 0) {
        casilla.classList.add("casilla-blanca");
    } else {
        casilla.classList.add("casilla-negra");
    }

    // Asignar rol y aria-label para accesibilidad de las casillas
    casilla.setAttribute("role", "gridcell");
    casilla.setAttribute("aria-label", casilla.id);

    // Asignar pieza si corresponde
    const pieza = piezasIniciales[casilla.id];
    if (pieza) {
        const piezaDiv = document.createElement("span");
        piezaDiv.classList.add("pieza");

        // Usamos el tipo de la pieza para establecer su representación visual
        piezaDiv.innerText = obtenerSimboloPieza(pieza);

        // Añadir rol y aria-label para describir la pieza
        piezaDiv.setAttribute("role", "img");
        piezaDiv.setAttribute("aria-label", `${pieza.tipo} ${pieza.color === "blanca" ? "blanca" : "negra"}`);
        piezaDiv.id = `${pieza.tipo.toLowerCase()}-${pieza.color}-${columnas[col]}${fila}`;

        // Añadir el color correspondiente (blanco o negro)
        piezaDiv.classList.add(pieza.color === "blanca" ? "pieza-blanca" : "pieza-negra");

        casilla.appendChild(piezaDiv);
    }

    return casilla;
}

// Función que devuelve el símbolo de la pieza según el tipo y color
function obtenerSimboloPieza(pieza) {
    const simbolos = {
        "Peon": { blanca: "♙", negra: "♟" },
        "Torre": { blanca: "♖", negra: "♜" },
        "Caballo": { blanca: "♘", negra: "♞" },
        "Alfil": { blanca: "♗", negra: "♝" },
        "Reina": { blanca: "♕", negra: "♛" },
        "Rey": { blanca: "♔", negra: "♚" }
    };

    // Retornar el símbolo correspondiente dependiendo del color de la pieza
    return simbolos[pieza.tipo][pieza.color];
}

/**
 * Crea la numeración de las filas con letras (a-h).
 * @function
 * @returns {void} No devuelve ningún valor. Modifica directamente el DOM añadiendo la numeración de las filas al contenedor correspondiente.
 */
function crearNumeracionFila() {
    columnas.forEach((columna) => {
        let divFila = document.createElement("div");
        divFila.innerText = columna;
        divFila.classList.add("numeracion-fila");
        divFila.id = `fila-${columna}`; // ID con letra de columna
        numeracionContenedor.appendChild(divFila);
    });
}

/**
 * Crea la numeración de las columnas con números (1-8).
 * @function
 * @returns {void} No devuelve ningún valor. Modifica directamente el DOM añadiendo la numeración de las columnas al contenedor correspondiente.
 */
function crearNumeracionColumnas() {
    for (let i = 1; i <= 8; i++) {
        let divCol = document.createElement("div");
        divCol.innerText = i;
        divCol.classList.add("numeracion-columna");
        divCol.id = `columna-${i}`; // ID con número de columna
        numeracionContenedor.appendChild(divCol);
    }
}

/**
 * Crea el tablero de ajedrez con las casillas correspondientes.
 * @function
 * @returns {void} No devuelve ningún valor. Modifica directamente el DOM añadiendo el tablero al contenedor correspondiente.
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
}

// Llamar las funciones para generar el tablero y la numeración
crearTablero(); // Crea el tablero con las casillas
crearNumeracionFila(); // Crea la numeración de filas
crearNumeracionColumnas(); // Crea la numeración de columnas

console.log(tablero.casillas);

const caballoBlanco = new Alfil("blanca", "B6");

// Calcular los movimientos posibles del caballo
const movimientosPosibles = caballoBlanco.calcularMovimientos();

// Mostrar los movimientos posibles en la consola
console.log("Movimientos posibles para el caballo blanco en B6:", movimientosPosibles);