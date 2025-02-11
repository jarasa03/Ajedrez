const tablero = document.querySelector(".tablero");
const columnas = ["a", "b", "c", "d", "e", "f", "g", "h"];

for (let fila = 8; fila >= 1; fila--) {
    for (let col = 0; col < 8; col++) {
        const casilla = document.createElement("div");

        // Generar ID en formato "a1", "b2", etc.
        let id = `${columnas[col]}${fila}`;
        casilla.id = id;

        // Asignar color según la posición
        if ((fila + col) % 2 === 0) {
            casilla.classList.add("CasillaBlanca");
        } else {
            casilla.classList.add("CasillaNegra");
        }

        tablero.appendChild(casilla);
    }
}