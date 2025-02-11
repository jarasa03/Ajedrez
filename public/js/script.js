const tablero = document.querySelector(".tablero");
const columnas = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numeracionContenedor = document.getElementById("numeracion-casillas");

const piezasIniciales = {
    // Piezas negras en la fila 8 (arriba)
    "A8": "♜",
    "B8": "♞",
    "C8": "♝",
    "D8": "♛",
    "E8": "♚",
    "F8": "♝",
    "G8": "♞",
    "H8": "♜",
    "A7": "♟",
    "B7": "♟",
    "C7": "♟",
    "D7": "♟",
    "E7": "♟",
    "F7": "♟",
    "G7": "♟",
    "H7": "♟",

    // Piezas blancas en la fila 1 (abajo)
    "A1": "♖",
    "B1": "♘",
    "C1": "♗",
    "D1": "♕",
    "E1": "♔",
    "F1": "♗",
    "G1": "♘",
    "H1": "♖",
    "A2": "♙",
    "B2": "♙",
    "C2": "♙",
    "D2": "♙",
    "E2": "♙",
    "F2": "♙",
    "G2": "♙",
    "H2": "♙"
};

/**
 * Crea una casilla en el tablero de ajedrez.
 * 
 * Esta función genera un elemento `div` que representa una casilla en el tablero.
 * La casilla se identifica con un ID en formato "a1", "b2", etc., y se le asigna un color
 * (blanco o negro) dependiendo de su posición en el tablero, siguiendo la lógica de ajedrez.
 * 
 * @param {number} fila - El número de la fila donde se ubica la casilla (1 a 8).
 * @param {number} col - El número de la columna donde se ubica la casilla (0 a 7).
 * @returns {HTMLElement} El elemento `div` que representa la casilla con su ID y color asignado.
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

    // Asignar pieza si corresponde
    const pieza = piezasIniciales[casilla.id];
    if (pieza) {
        const piezaDiv = document.createElement("span");
        piezaDiv.classList.add("pieza");
        piezaDiv.innerText = pieza;
        casilla.appendChild(piezaDiv);
    }

    return casilla;
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
    tablero.appendChild(fragment);
}

// Llamar las funciones para generar el tablero y la numeración
crearTablero(); // Crea el tablero con las casillas
crearNumeracionFila(); // Crea la numeración de filas
crearNumeracionColumnas(); // Crea la numeración de columnas