export class Pieza {
    constructor(color, tipo, posicion) {

        if (new.target === Pieza) {
            throw new Error("No se puede instanciar la clase Pieza directamente");
        }

        this.color = color;
        this.tipo = tipo;
        this.posicion = posicion;

    }

    mover(nuevaPosicion) {
        const movimientosValidos = this.calcularMovimientos();
    
        // Si la nueva posición no está en los movimientos válidos, no hacer nada
        if (!movimientosValidos.includes(nuevaPosicion)) {
            return false;
        }
    
        // Obtener la casilla actual y la nueva casilla
        const casillaActual = document.querySelector(`#${this.posicion.toUpperCase()}`);
        const casillaNueva = document.querySelector(`#${nuevaPosicion.toUpperCase()}`);
    
        if (!casillaNueva) {
            return false;
        }
    
        // Verificar si en la nueva casilla hay una pieza aliada
        const piezaEnNuevaCasilla = casillaNueva.querySelector(".pieza");
        if (piezaEnNuevaCasilla) {
            const claseColorPiezaActual = this.color; // Color de la pieza actual
            const claseColorPiezaNueva = piezaEnNuevaCasilla.dataset.color; // Color de la pieza en la nueva casilla
    
            console.log(`Moviendo ${this.constructor.name} de color ${claseColorPiezaActual} a ${nuevaPosicion}`);
            console.log(`Pieza en la nueva casilla tiene color: ${claseColorPiezaNueva}`);
    
            if (claseColorPiezaActual === claseColorPiezaNueva) {
                console.log("¡No se puede mover! La casilla tiene una pieza aliada.");
                return false; // Si es una pieza aliada, no se puede mover ahí
            }
    
            // Si es una pieza enemiga, se elimina (se "come")
            piezaEnNuevaCasilla.remove();
        }
    
        // Eliminar la pieza de la casilla actual
        if (casillaActual) {
            const piezaElemento = casillaActual.querySelector(".pieza");
            if (piezaElemento) {
                piezaElemento.remove();
            }
        }
    
        // Actualizar la posición en el objeto de la pieza
        this.posicion = nuevaPosicion;
    
        // Colocar la pieza en la nueva casilla visualmente
        this.colocarEnTablero();
    
        // Si es el primer movimiento del peón, actualizar el flag
        if (this.primerMovimiento) {
            this.primerMovimiento = false;
        }
    
        return true;
    }
    
    

    calcularMovimientos() {
        throw new Error("Método 'calcularMovimientos' debe ser implementado por la subclase");
    }

    colocarEnTablero() {

        const casilla = document.querySelector(`#${this.posicion.toUpperCase()}`);
        if (casilla) {
            const piezaDiv = document.createElement("span");
            piezaDiv.classList.add("pieza", this.tipo.toLowerCase(), this.color === "blanca" ? "pieza-blanca" : "pieza-negra");
            piezaDiv.innerText = this.obtenerSimboloPieza();
            piezaDiv.setAttribute("data-color", this.color); // Establecer el color de la pieza en el data-color

            piezaDiv.setAttribute("id", this.posicion); // ID de la casilla
            piezaDiv.setAttribute("role", "img");
            piezaDiv.setAttribute("aria-label", `${this.constructor.name} ${this.color}`);

            casilla.appendChild(piezaDiv);
        }

    }
}