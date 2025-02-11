const tablero = document.querySelector(".tablero");
const columnas = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numeracionContenedor = document.getElementById("numeracion-casillas");

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

    return casilla;
}

/**
 * Crea la numeración de las filas con letras (a-h).
 * Esta función genera los elementos HTML correspondientes a las letras de las filas (a-h)
 * y los agrega al contenedor de numeración.
 * 
 * Recorre el array `columnas` y para cada letra (fila), crea un `div` que contiene
 * la letra y le asigna una clase CSS para la estilización.
 * Luego, agrega cada `div` al contenedor de numeración en el DOM.
 * 
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
 * Esta función genera los elementos HTML correspondientes a los números de las columnas (1-8)
 * y los agrega al contenedor de numeración.
 * 
 * Recorre los números del 1 al 8 y para cada número (columna), crea un `div` que contiene
 * el número y le asigna una clase CSS para la estilización.
 * Luego, agrega cada `div` al contenedor de numeración en el DOM.
 * 
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
 * Esta función crea un fragmento de documento con todas las casillas del tablero y lo agrega al contenedor del tablero.
 * 
 * El tablero se construye de tal forma que las casillas se añaden en un bucle de filas y columnas. Cada casilla se crea llamando
 * a la función `crearCasilla` con los parámetros correspondientes de fila y columna.
 * 
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