class SVGGraphics {
    constructor(svgElement) {
        this.svg = svgElement;
    }

    createSVGElement(tag, attributes) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        return element;
    }

    dibujarLinea(x1, y1, x2, y2) {
        const linea = this.createSVGElement('line', {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            stroke: 'black'
        });
        this.svg.appendChild(linea);
    }

    dibujarCircunferencia(cx, cy, r) {
        const circunferencia = this.createSVGElement('circle', {
            cx: cx,
            cy: cy,
            r: r,
            stroke: 'black',
            fill: 'none'
        });
        this.svg.appendChild(circunferencia);
    }

    dibujarElipse(cx, cy, rx, ry) {
        const elipse = this.createSVGElement('ellipse', {
            cx: cx,
            cy: cy,
            rx: rx,
            ry: ry,
            stroke: 'black',
            fill: 'none'
        });
        this.svg.appendChild(elipse);
    }
}


const svgElement = document.getElementById('svg');


const graficosSVG = new SVGGraphics(svgElement);


graficosSVG.dibujarLinea(50, 50, 200, 200);
graficosSVG.dibujarCircunferencia(300, 100, 50);
graficosSVG.dibujarElipse(400, 300, 80, 50);
