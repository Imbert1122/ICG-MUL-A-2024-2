class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function esConvexo(puntos) {
    const n = puntos.length;
    if (n < 3) return false; // Un polígono necesita al menos 3 puntos
    
    let signo = null;

    for (let i = 0; i < n; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % n];
        const p3 = puntos[(i + 2) % n];

        const producto = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);

        if (producto !== 0) {
            if (signo === null) {
                signo = producto > 0;
            } else {
                if (signo !== (producto > 0)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function calcularCentroide(puntos) {
    let x = 0, y = 0;
    for (const punto of puntos) {
        x += punto.x;
        y += punto.y;
    }
    return new Punto(x / puntos.length, y / puntos.length);
}

function trazarPoligono(puntos, mostrarCentroide) {
    const svg = document.getElementById("svg");
    svg.innerHTML = ''; // Limpiar el SVG

    // Crear el polígono
    let d = 'M ';
    for (let i = 0; i < puntos.length; i++) {
        d += (puntos[i].x + 50) + ',' + (puntos[i].y + 50) + ' ';
    }
    d += 'Z'; // Cerrar el polígono

    const poligono = document.createElementNS("http://www.w3.org/2000/svg", "path");
    poligono.setAttribute("d", d);
    poligono.setAttribute("fill", "rgba(0, 0, 255, 0.3)");
    poligono.setAttribute("stroke", "blue");
    svg.appendChild(poligono);

    // Dibujar el centroide si se solicita
    if (mostrarCentroide) {
        const centroide = calcularCentroide(puntos);
        const centroideCirculo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        centroideCirculo.setAttribute("cx", centroide.x + 50);
        centroideCirculo.setAttribute("cy", centroide.y + 50);
        centroideCirculo.setAttribute("r", 5);
        centroideCirculo.setAttribute("fill", "red");
        svg.appendChild(centroideCirculo);

        // Dibujar líneas desde el centroide a los puntos medios de cada lado
        const lineas = document.createElementNS("http://www.w3.org/2000/svg", "g");
        lineas.setAttribute("stroke", "green");

        for (let i = 0; i < puntos.length; i++) {
            const p1 = puntos[i];
            const p2 = puntos[(i + 1) % puntos.length];

            const medioX = (p1.x + p2.x) / 2 + 50;
            const medioY = (p1.y + p2.y) / 2 + 50;

            const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
            linea.setAttribute("x1", centroide.x + 50);
            linea.setAttribute("y1", centroide.y + 50);
            linea.setAttribute("x2", medioX);
            linea.setAttribute("y2", medioY);
            lineas.appendChild(linea);
        }

        svg.appendChild(lineas);
    }
}

// Variables para manejar el estado del centroide
let mostrarCentroide = false;
const puntos = [
    new Punto(50, 50),
    new Punto(200, 50),
    new Punto(250, 200),
    new Punto(150, 250),
    new Punto(100, 200)
];

const resultado = esConvexo(puntos) ? "El polígono es convexo." : "El polígono es cóncavo.";
document.getElementById("resultado").textContent = resultado;

// Función para actualizar el polígono al hacer clic en el botón
function actualizarPoligono() {
    mostrarCentroide = !mostrarCentroide;
    document.getElementById("toggleCentroide").textContent = mostrarCentroide ? "Ocultar Centroide" : "Mostrar Centroide";
    trazarPoligono(puntos, mostrarCentroide);
}

// Inicializar el dibujo
trazarPoligono(puntos, mostrarCentroide);

// Asignar evento al botón
document.getElementById("toggleCentroide").addEventListener("click", actualizarPoligono);
