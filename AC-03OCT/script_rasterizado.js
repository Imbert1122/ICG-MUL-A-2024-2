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
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.beginPath();
    ctx.moveTo(puntos[0].x + 50, puntos[0].y + 50); // Mover al primer punto

    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x + 50, puntos[i].y + 50); // Dibujar líneas entre puntos
    }
    ctx.closePath();
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
    ctx.fill();
    ctx.stroke();

    // Dibujar el centroide si se solicita
    if (mostrarCentroide) {
        const centroide = calcularCentroide(puntos);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(centroide.x + 50, centroide.y + 50, 5, 0, Math.PI * 2); // Dibujar el centroide
        ctx.fill();

        // Dibujar líneas desde el centroide a los puntos medios de cada lado
        ctx.strokeStyle = "green";
        for (let i = 0; i < puntos.length; i++) {
            const p1 = puntos[i];
            const p2 = puntos[(i + 1) % puntos.length];

            const medioX = (p1.x + p2.x) / 2 + 50;
            const medioY = (p1.y + p2.y) / 2 + 50;

            ctx.beginPath();
            ctx.moveTo(centroide.x + 50, centroide.y + 50); // Mover al centroide
            ctx.lineTo(medioX, medioY); // Línea al punto medio
            ctx.stroke();
        }
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
