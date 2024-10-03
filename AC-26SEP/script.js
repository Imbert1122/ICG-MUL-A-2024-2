class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

class SVGGraphics {
    #svg;

    constructor(svgElement) {
        this.#svg = svgElement;
    }

    createSVGElement(tag, attributes) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        return element;
    }

    dibujarLinea(punto1, punto2) {
        const x1 = punto1.getX();
        const y1 = punto1.getY();
        const x2 = punto2.getX();
        const y2 = punto2.getY();

        let dx = x2 - x1;
        let dy = y2 - y1;
        let absDx = Math.abs(dx);
        let absDy = Math.abs(dy);
        let sx = (dx < 0) ? -1 : 1;
        let sy = (dy < 0) ? -1 : 1;
        let err = absDx - absDy;

        while (true) {
            // Dibujar un punto en lugar de una línea muy pequeña
            const linePoint = this.createSVGElement('rect', {
                x: x1,
                y: y1,
                width: 1,
                height: 1,
                fill: 'black'
            });
            this.#svg.appendChild(linePoint);

            if (x1 === x2 && y1 === y2) break;
            let err2 = err * 2;

            if (err2 > -absDy) {
                err -= absDy;
                x1 += sx;
            }
            if (err2 < absDx) {
                err += absDx;
                y1 += sy;
            }
        }
    }

    dibujarCircunferencia(centro, r) {
        const circunferencia = this.createSVGElement('circle', {
            cx: centro.getX(),
            cy: centro.getY(),
            r: r,
            stroke: 'black',
            fill: 'none'
        });
        this.#svg.appendChild(circunferencia);
    }

    dibujarElipse(centro, rx, ry) {
        const elipse = this.createSVGElement('ellipse', {
            cx: centro.getX(),
            cy: centro.getY(),
            rx: rx,
            ry: ry,
            stroke: 'black',
            fill: 'none'
        });
        this.#svg.appendChild(elipse);
    }
}

const svgElement = document.getElementById('svg');
const graficosSVG = new SVGGraphics(svgElement);

const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
graficosSVG.dibujarLinea(punto1, punto2);

const centroCircunferencia = new Punto(300, 100);
graficosSVG.dibujarCircunferencia(centroCircunferencia, 50);

const centroElipse = new Punto(400, 300);
graficosSVG.dibujarElipse(centroElipse, 80, 50);
