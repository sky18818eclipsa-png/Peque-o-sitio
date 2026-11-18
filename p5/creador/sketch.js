let forma = 1; // 1 = circulo 2 = cuadrado 3 = triangulo 4 = arbol 5 = ojo 6 = estrella
let colorActual = '#ff0000';
let intensidadTinte = 0.5; 
let fondoActual = 1; 

let colores = [
  '#ff0000',
  '#0000ff',
  '#ffff00',
  '#ffffff',
  '#000000'
];

let imgs = {};          // pinceles
let fondos = {};        
let cacheTintadas = {}; 
let capa;    

async function setup() {
  createCanvas(854, 480);
  capa = createGraphics(854, 480); 

  imgs[1] = await loadImage('circulo.png');
  imgs[2] = await loadImage('cuadrado.png');
  imgs[3] = await loadImage('triangulo.png');
  imgs[4] = await loadImage('arbol.png');
  imgs[5] = await loadImage('ojo.png');
  imgs[6] = await loadImage('estrella.png');

  fondos[1] = await loadImage('fondo1.png');
  fondos[2] = await loadImage('fondo2.png');
  fondos[3] = await loadImage('fondo3.png');
}

function draw() {
 // FONDOS -------------------------------------
  background(fondos[fondoActual]);

  if (mouseIsPressed && !enCaja(mouseX, mouseY)) {
    dibujarForma(forma, mouseX, mouseY, 15, capa);
  }

  image(capa, 0, 0);

 //UI -----------------------------------
  dibujarCaja();
}

function dibujarCaja() {
  fill(220);
  stroke(0);
  strokeWeight(1);
  rect(0, 0, 320, 140);

  // formas --------------------------
  for (let i = 1; i <= 6; i++) {
    let x = 30 + (i - 1) * 50;

    noFill();
    stroke(0);
    strokeWeight(i === forma ? 4 : 1);
    square(x - 20, 10, 40);

    dibujarForma(i, x, 30, 10); 
  }

  // colores --------------------------
  for (let i = 0; i < colores.length; i++) {
    let x = 30 + i * 50;

    fill(colores[i]);
    stroke(0);
    strokeWeight(colorActual === colores[i] ? 4 : 1);
    square(x - 15, 60, 30);
  }

  // fondos --------------------------
  for (let i = 1; i <= 3; i++) {
    let x = 30 + (i - 1) * 50;

    image(fondos[i], x - 20, 102, 40, 30);

    noFill();
    stroke(0);
    strokeWeight(i === fondoActual ? 4 : 1);
    rect(x - 20, 102, 40, 30);
  }
}

function dibujarForma(tipo, x, y, r, g) {
  let destino = g || window;
  destino.imageMode(CENTER);
  destino.image(getTintada(tipo, colorActual), x, y, r * 2, r * 2);
  destino.imageMode(CORNER);
}

function getTintada(tipo, col) {
  let clave = tipo + '-' + col;
  if (!cacheTintadas[clave]) {
    cacheTintadas[clave] = tintarImagen(imgs[tipo], col);
  }
  return cacheTintadas[clave];
}

function tintarImagen(img, col) {
  let pg = createGraphics(img.width, img.height);
  pg.pixelDensity(1);
  pg.image(img, 0, 0);
  pg.loadPixels();

  let c = color(col);
  let r = red(c), g = green(c), b = blue(c);
  let k = intensidadTinte;

  for (let i = 0; i < pg.pixels.length; i += 4) {
    pg.pixels[i]     = pg.pixels[i]     * (1 - k) + r * k;
    pg.pixels[i + 1] = pg.pixels[i + 1] * (1 - k) + g * k;
    pg.pixels[i + 2] = pg.pixels[i + 2] * (1 - k) + b * k;
    // pg.pixels[i + 3] (alpha) no se toca
  }
  pg.updatePixels();
  return pg;
}

function enCaja(x, y) {
  return x < 320 && y < 140;
}

function mousePressed() {
  if (enCaja(mouseX, mouseY)) {

    // Seleccionar forma
    if (mouseY < 60) {
      for (let i = 1; i <= 6; i++) {
        let x = 30 + (i - 1) * 50;
        if (mouseX > x - 20 && mouseX < x + 20) {
          forma = i;
        }
      }
    }

   // SELECCIONAR COLOR
    else if (mouseY < 100) {
      for (let i = 0; i < colores.length; i++) {
        let x = 30 + i * 50;
        if (mouseX > x - 15 && mouseX < x + 15) {
          colorActual = colores[i];
        }
      }
    }

    // SELECCIONAR FODO
    else {
      for (let i = 1; i <= 3; i++) {
        let x = 30 + (i - 1) * 50;
        if (mouseX > x - 20 && mouseX < x + 20) {
          fondoActual = i;
        }
      }
    }
  }
}