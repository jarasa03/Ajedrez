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
 * Crea una casilla del tablero de ajedrez, asigna un color según su posición
 * y coloca la pieza correspondiente (si existe) en la casilla.
 * 
 * @param {number} fila - Número de la fila de la casilla (1 a 8).
 * @param {number} col - Número de la columna de la casilla (0 a 7, representando las columnas a-h).
 * 
 * @returns {HTMLElement} La casilla creada, con su ID, color y pieza correspondiente (si hay una).
 * 
 * @example
 * // Crear una casilla en la fila 1 y columna 0 (esquina inferior izquierda)
 * const casillaA1 = crearCasilla(1, 0);
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

        // Añadir aria-label para describir la pieza
        switch (pieza) {
            case "♖":
                piezaDiv.setAttribute("aria-label", "Torre blanca");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♘":
                piezaDiv.setAttribute("aria-label", "Caballo blanco");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♗":
                piezaDiv.setAttribute("aria-label", "Alfil blanco");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♕":
                piezaDiv.setAttribute("aria-label", "Reina blanca");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♔":
                piezaDiv.setAttribute("aria-label", "Rey blanco");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♙":
                piezaDiv.setAttribute("aria-label", "Peón blanco");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♜":
                piezaDiv.setAttribute("aria-label", "Torre negra");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♞":
                piezaDiv.setAttribute("aria-label", "Caballo negro");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♝":
                piezaDiv.setAttribute("aria-label", "Alfil negro");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♛":
                piezaDiv.setAttribute("aria-label", "Reina negra");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♚":
                piezaDiv.setAttribute("aria-label", "Rey negro");
                piezaDiv.setAttribute("role", "img");
                break;
            case "♟":
                piezaDiv.setAttribute("aria-label", "Peón negro");
                piezaDiv.setAttribute("role", "img");
                break;
            default:
                piezaDiv.setAttribute("aria-label", "Casilla vacía");
        }

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