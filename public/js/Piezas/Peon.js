import { Pieza } from "./Pieza.js";
import { tablero } from "../Tablero.js";
import { Alfil } from "./Alfil.js"
import { Caballo } from "./Caballo.js"
import { Reina } from "./Reina.js"
import { Torre } from "./Torre.js"

export class Peon extends Pieza {
    constructor(color, posicion) {
        super(color, "Peon", posicion);
        this.primerMovimiento = true; // Flag para verificar si es el primer movimiento
        this.vulnerableEnPassant = false;
        // Colocamos la pieza en su casilla
        this.colocarEnTablero();
    }

    obtenerSimboloPieza() {
        return this.color === "blanca" ? "♙" : "♟"; // Peón blanco o negro
    }

    calcularMovimientos() {
        const arrayLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const columna = arrayLetras.indexOf(this.posicion[0].toLowerCase()); // Asegurarse de que la columna esté en minúsculas
        const fila = parseInt(this.posicion[1]) - 1; // Conversión de la fila para que empiece desde 0
        const movimientosPosibles = [];

        if (columna === -1) {
            return movimientosPosibles;
        }

        // Dirección del movimiento del peón dependiendo de su color
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

        // Movimiento hacia adelante (dos casillas), solo en el primer movimiento
        if (this.primerMovimiento) {
            // Primero, comprobamos que la casilla inmediata esté libre
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

        // Comer en diagonal (si hay piezas enemigas)
        const direccionesComer = [
            { x: 1, y: direccion }, // Comida en diagonal derecha
            { x: -1, y: direccion } // Comida en diagonal izquierda
        ];

        for (const dir of direccionesComer) {
            const nuevaColumna = columna + dir.x;
            const nuevaFila = fila + dir.y;

            // Verificar que la nueva casilla esté dentro del tablero
            if (nuevaColumna >= 0 && nuevaColumna < 8 && nuevaFila >= 0 && nuevaFila < 8) {
                const nuevaPosicionComer = (arrayLetras[nuevaColumna] + (nuevaFila + 1)).toUpperCase();
                const piezaEnDestinoComer = tablero.obtenerPieza(nuevaPosicionComer);

                // Si la casilla tiene una pieza enemiga, el peón puede comerla
                if (piezaEnDestinoComer && piezaEnDestinoComer.color !== this.color) {
                    movimientosPosibles.push(nuevaPosicionComer);
                }
            }
        }

        // ----------------------------
        // AGREGAMOS LA CAPTURA AL PASO
        // ----------------------------
        // Revisamos las casillas laterales en la misma fila para ver si hay un peón enemigo vulnerable
        const posicionesLaterales = [
            { col: columna - 1, row: fila },
            { col: columna + 1, row: fila }
        ];

        posicionesLaterales.forEach(pos => {
            if (pos.col >= 0 && pos.col < 8) {
                const posLateral = (arrayLetras[pos.col] + (pos.row + 1)).toUpperCase();
                const piezaLateral = tablero.obtenerPieza(posLateral);

                // Verificamos que la pieza lateral sea un peón enemigo y esté vulnerable al paso
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







        return movimientosPosibles;
    }

    promocionar() {
        const opciones = ["Reina", "Torre", "Alfil", "Caballo"];
        
        // Crear un contenedor para la selección con un ID
        const contenedorSeleccion = document.createElement('div');
        contenedorSeleccion.id = "cuadro-promocion"; // Añadido id para acceder fácilmente
        contenedorSeleccion.className = "cuadro-promocion"; // Añadido class para estilos adicionales
        contenedorSeleccion.style.position = "absolute";
        contenedorSeleccion.style.top = "50%";
        contenedorSeleccion.style.left = "50%";
        contenedorSeleccion.style.transform = "translate(-50%, -50%)";
        contenedorSeleccion.style.backgroundColor = "white";
        contenedorSeleccion.style.padding = "20px";
        contenedorSeleccion.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        contenedorSeleccion.style.borderRadius = "8px";
        contenedorSeleccion.style.textAlign = "center";
        
        const mensaje = document.createElement('p');
        mensaje.id = "mensaje-promocion"; // Añadido id para el mensaje
        mensaje.textContent = "Selecciona la pieza para la promoción:";
        contenedorSeleccion.appendChild(mensaje);
    
        // Crear botones de selección
        opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.textContent = opcion;
            boton.style.margin = "5px";
            boton.style.padding = "10px";
            boton.style.fontSize = "16px";
            boton.addEventListener('click', () => {
                let nuevaPieza;
    
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
                        console.error("Selección inválida");
                        return;
                }
    
                // Eliminar el peón del tablero lógico
                tablero.eliminarPieza(this.posicion);
    
                // Colocar la nueva pieza en la misma posición en el tablero lógico
                tablero.colocarPieza(nuevaPieza);
    
                // Actualizar la visualización
                this.eliminarDeLaVisualizacion();
                nuevaPieza.colocarEnTablero();
    
                // Actualizar la posición del peón promocionado
                this.posicion = nuevaPieza.posicion;
    
                document.body.removeChild(contenedorSeleccion); // Eliminar el cuadro de selección
            });
            contenedorSeleccion.appendChild(boton);
        });
    
        document.body.appendChild(contenedorSeleccion);
    }
    


    // Método para eliminar la pieza de la visualización
    eliminarDeLaVisualizacion() {
        // Obtenemos la referencia al elemento de la casilla en el DOM usando el ID correspondiente a la posición
        const casilla = document.getElementById(this.posicion.toUpperCase());

        if (casilla) {
            // Limpiar el contenido de la casilla (se asume que la pieza está representada por el símbolo en el innerHTML)
            casilla.innerHTML = '';
        }
    }

}