const tablero = document.querySelector(".tablero");
const columnas = ["a", "b", "c", "d", "e", "f", "g", "h"];

for (let fila = 8; fila >= 1; fila--) {
    for (let col = 0; col < 8; col++) {
        const casilla = document.createElement("div");
        casilla.classList.add("casilla")

        // Generar ID en formato "a1", "b2", etc.
        casilla.id = columnas[col] + fila;

        // Asignar color según la posición
        if ((fila + col) % 2 === 0) {
            casilla.classList.add("casilla-blanca");
        } else {
            casilla.classList.add("casilla-negra");
        }

        tablero.appendChild(casilla);
    }
}