import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";
import { Alfil } from "./Alfil.js";
import { Caballo } from "./Caballo.js";
import { Reina } from "./Reina.js";
import { Torre } from "./Torre.js";

export class Peon extends Pieza {
    constructor(color, posicion) {
        super(color, "Peon", posicion);
        this.primerMovimiento = true; // Indicador de si es el primer movimiento del peón
        this.vulnerableEnPassant = false; // Estado que indica si el peón es vulnerable a la captura al paso
        // Coloca la pieza en su casilla correspondiente al instanciarla
        this.colocarEnTablero();
    }

    /**
     * Obtiene el símbolo correspondiente a la pieza en el tablero.
     * @returns {string} Símbolo del peón según su color
     */
    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♙" : "♟"; // Símbolos de peón blanco o negro
    }

    /**
     * Calcula los movimientos posibles para el peón según su posición actual.
     * Incluye movimientos hacia adelante, capturas en diagonal y la captura al paso.
     * @returns {Array} Lista de posiciones a las que el peón puede moverse
     */
    calcularMovimientos() {
            const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
            const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Asegura que la columna esté en minúsculas
            const fila = parseInt(this.posicion[1]) - 1; // Convierte la fila a un índice 0-7
            const movimientosPosibles = [];

            if (columna === -1) {
                return movimientosPosibles; // Si la columna no es válida, no hay movimientos posibles
            }

            // Dirección del movimiento del peón según su color (1 para blanco, -1 para negro)
            const direccion = this.color === "blanca" ? 1 : -1;

            // Movimiento hacia adelante (una casilla)
            const nuevaFilaAdelante = fila + direccion;
            if (nuevaFilaAdelante >= 0 && nuevaFilaAdelante < 8) {
                const nuevaPosicionAdelante = (arrayLetras[columna] + (nuevaFilaAdelante + 1)).toUpperCase();
                const piezaEnDestinoAdelante = tablero.obtenerPieza(nuevaPosicionAdelante);

                // Si la casilla está vacía, el peón puede moverse allí
                if (!piezaEnDestinoAdelante) {
                    movimientosPosibles.push(nuevaPosicionAdelante);
                }
            }

            // Movimiento hacia adelante (dos casillas), solo si es el primer movimiento
            if (this.primerMovimiento) {
                // Verifica que la casilla intermedia esté vacía
                const posicionIntermedia = (arrayLetras[columna] + (nuevaFilaAdelante + 1)).toUpperCase();
                if (!tablero.obtenerPieza(posicionIntermedia)) {
                    const nuevaFilaDobleAdelante = fila + 2 * direccion;
                    if (nuevaFilaDobleAdelante >= 0 && nuevaFilaDobleAdelante < 8) {
                        const nuevaPosicionDobleAdelante = (arrayLetras[columna] + (nuevaFilaDobleAdelante + 1)).toUpperCase();
                        const piezaEnDestinoDobleAdelante = tablero.obtenerPieza(nuevaPosicionDobleAdelante);

                        // Si la casilla está vacía, el peón puede moverse allí
                        if (!piezaEnDestinoDobleAdelante) {
                            movimientosPosibles.push(nuevaPosicionDobleAdelante);
                        }
                    }
                }
            }

            // Captura en diagonal (si hay piezas enemigas)
            const direccionesComer = [
                { x: 1, y: direccion }, // Captura en diagonal derecha
                { x: -1, y: direccion } // Captura en diagonal izquierda
            ];

            for (const dir of direccionesComer) {
                const nuevaColumna = columna + dir.x;
                const nuevaFila = fila + dir.y;

                // Verifica si la nueva casilla está dentro del tablero
                if (nuevaColumna >= 0 && nuevaColumna < 8 && nuevaFila >= 0 && nuevaFila < 8) {
                    const nuevaPosicionComer = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase();
                    const piezaEnDestinoComer = tablero.obtenerPieza(nuevaPosicionComer);

                    // Si la casilla tiene una pieza enemiga, el peón puede capturarla
                    if (piezaEnDestinoComer && piezaEnDestinoComer.color !== this.color) {
                        movimientosPosibles.push(nuevaPosicionComer);
                    }
                }
            }

            // ----------------------------
            // CAPTURA AL PASO
            // ----------------------------
            // Revisa las casillas laterales en la misma fila para verificar si hay un peón enemigo vulnerable
            const posicionesLaterales = [
                { col: columna - 1, row: fila },
                { col: columna + 1, row: fila }
            ];

            posicionesLaterales.forEach(pos => {
                if (pos.col >= 0 && pos.col < 8) {
                    const posLateral = (arrayLetras[pos.col] + (pos.row + 1)).toUpperCase();
                    const piezaLateral = tablero.obtenerPieza(posLateral);

                    // Verifica que la pieza lateral sea un peón enemigo y esté vulnerable al paso
                    if (
                        piezaLateral &&
                        piezaLateral.color !== this.color &&
                        piezaLateral.constructor.name === "Peon" &&
                        piezaLateral.vulnerableEnPassant
                    ) {
                        // La casilla de destino para la captura al paso es la diagonal hacia adelante
                        const nuevaPosicionEnPassant = (arrayLetras[pos.col] + ((fila + direccion) + 1)).toUpperCase();
                        movimientosPosibles.push(nuevaPosicionEnPassant);
                    }
                }
            });

            return movimientosPosibles; // Retorna todas las posiciones posibles
        }
        /**
         * Promociona el peón a otra pieza (Reina, Torre, Alfil o Caballo).
         * Crea una interfaz de selección para que el usuario elija la nueva pieza.
         */
    promocionar() {
        const opciones = ["Reina", "Torre", "Alfil", "Caballo"];

        // Crear el contenedor para la selección con un ID único
        const contenedorSeleccion = document.createElement('div');
        contenedorSeleccion.id = "cuadro-promocion"; // ID para fácil acceso y manipulación
        contenedorSeleccion.className = "cuadro-promocion"; // Clase para aplicar estilos adicionales
        contenedorSeleccion.style.position = "absolute"; // Posición absoluta para centrar
        contenedorSeleccion.style.top = "50%";
        contenedorSeleccion.style.left = "50%";
        contenedorSeleccion.style.transform = "translate(-50%, -50%)"; // Centrado en pantalla
        contenedorSeleccion.style.backgroundColor = "white"; // Fondo blanco para visibilidad
        contenedorSeleccion.style.padding = "20px"; // Espaciado alrededor del contenido
        contenedorSeleccion.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Sombra para resaltar el cuadro
        contenedorSeleccion.style.borderRadius = "8px"; // Bordes redondeados para un diseño suave
        contenedorSeleccion.style.textAlign = "center"; // Alineación central del contenido

        // Crear el mensaje de selección
        const mensaje = document.createElement('p');
        mensaje.id = "mensaje-promocion"; // ID para el mensaje
        mensaje.textContent = "Selecciona la pieza para la promoción:"; // Texto que indica la acción
        contenedorSeleccion.appendChild(mensaje);

        // Crear los botones de selección de piezas
        opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.textContent = opcion; // El texto del botón corresponde al nombre de la pieza
            boton.style.margin = "5px"; // Espaciado entre los botones
            boton.style.padding = "10px"; // Espaciado interno del botón
            boton.style.fontSize = "16px"; // Tamaño de fuente para los botones
            boton.addEventListener('click', () => {
                let nuevaPieza;

                // Crear la nueva pieza según la selección del usuario
                switch (opcion) {
                    case "Reina":
                        nuevaPieza = new Reina(this.color, this.posicion);
                        break;
                    case "Torre":
                        nuevaPieza = new Torre(this.color, this.posicion);
                        break;
                    case "Alfil":
                        nuevaPieza = new Alfil(this.color, this.posicion);
                        break;
                    case "Caballo":
                        nuevaPieza = new Caballo(this.color, this.posicion);
                        break;
                    default:
                        return;
                }

                // Eliminar el peón del tablero lógico
                tablero.eliminarPieza(this.posicion);

                // Colocar la nueva pieza en la misma posición en el tablero lógico
                tablero.colocarPieza(nuevaPieza);

                // Actualizar la visualización
                this.eliminarDeLaVisualizacion(); // Eliminar el peón de la visualización
                nuevaPieza.colocarEnTablero(); // Colocar la nueva pieza en el tablero visual

                // Actualizar la posición de la pieza promocionada
                this.posicion = nuevaPieza.posicion;

                // Eliminar el cuadro de selección de la pantalla
                document.body.removeChild(contenedorSeleccion);
            });
            contenedorSeleccion.appendChild(boton);
        });

        // Agregar el contenedor de selección al cuerpo del documento
        document.body.appendChild(contenedorSeleccion);
    }

    /**
     * Elimina la pieza de la visualización en el tablero.
     * Elimina el símbolo de la pieza de la casilla correspondiente.
     */
    eliminarDeLaVisualizacion() {
        // Obtener la referencia al elemento de la casilla en el DOM usando la posición de la pieza
        const casilla = document.getElementById(this.posicion.toUpperCase());

        if (casilla) {
            // Limpiar el contenido de la casilla, eliminando el símbolo de la pieza
            casilla.innerHTML = '';
        }
    }
}