// noprotect
let forma = 1; // 1 = circulo 2 = cuadrado 3 = triangulo 4 = arbol 5 = ojo 6 = estrella
let colorActual = '#ff0000';
let intensidadTinte = 0.5; 
let fondoActual = 1; 
let borrando = false;   

// TAMAÑOS DEL PINCEL ---------------------
let tamanosPincel = [8, 15, 25];   
let ladosIcono = [14, 22, 30];     
let tamanoActual = 1;              //0 = pequeño, 1 = mediano, 2 = grande

let colores = [
  '#ff0000',
  '#0000ff',
  '#ffff00',
  '#ffffff',
  '#000000'
];

let imgs = {};         
let fondos = {};        
let cacheTintadas = {}; 
let capa;    
let imgGoma;            

// LAYOUT DE LA CAJA ----------------------
const CAJA_W = 320;
const CAJA_H = 140;

// Fila 1: herramientas
const HERR_Y = 28, HERR_LADO = 36, HERR_PASO = 44, HERR_X0 = 26;
// Fila 2: colores
const COL_Y = 70, COL_LADO = 26, COL_PASO = 44, COL_X0 = 26;
// Fila 3 izquierda: tamaños
const TAM_Y = 115, TAM_PASO = 40, TAM_X0 = 30;
// Fila 3 derecha: fondos
const FON_Y = 115, FON_W = 40, FON_H = 30, FON_PASO = 50, FON_X0 = 185;

// Líneas separadoras
const SEP1_Y = 52;   
const SEP2_Y = 90;   

async function setup() {
  createCanvas(854, 480);;
  capa = createGraphics(854, 400); 

  imgs[1] = await loadImage('circulo.png');
  imgs[2] = await loadImage('cuadrado.png');
  imgs[3] = await loadImage('triangulo.png');
  imgs[4] = await loadImage('arbol.png');
  imgs[5] = await loadImage('ojo.png');
  imgs[6] = await loadImage('estrella.png');

  fondos[1] = await loadImage('fondo1.png');
  fondos[2] = await loadImage('fondo2.png');
  fondos[3] = await loadImage('fondo3.png');

  imgGoma = await loadImage('goma.png');
}

function draw() {
 // FONDOS -------------------------------------
  background(fondos[fondoActual]);

  let radio = tamanosPincel[tamanoActual];

  if (mouseIsPressed && !enCaja(mouseX, mouseY)) {
    if (borrando) {
      capa.erase();
      capa.noStroke();
      capa.circle(mouseX, mouseY, (radio + 5) * 2);
      capa.noErase();
    } else {
      dibujarForma(forma, mouseX, mouseY, radio, capa);
    }
  }

  image(capa, 0, 0);

  if (borrando && !enCaja(mouseX, mouseY)) {
    noFill();
    stroke(0);
    strokeWeight(1);
    circle(mouseX, mouseY, (radio + 5) * 2);
  }

 //UI -----------------------------------
  dibujarCaja();
}

function dibujarCaja() {
  fill(220);
  stroke(0);
  strokeWeight(1);
  rect(0, 0, CAJA_W, CAJA_H);

  // líneas separadoras horizontales
  stroke(150);
  strokeWeight(1);
  line(8, SEP1_Y, CAJA_W - 8, SEP1_Y);
  line(8, SEP2_Y, CAJA_W - 8, SEP2_Y);

  // HERRAMIENTAS--------------------------
  for (let i = 1; i <= 6; i++) {
    let x = HERR_X0 + (i - 1) * HERR_PASO;

    noFill();
    stroke(0);
    strokeWeight(!borrando && i === forma ? 4 : 1);
    square(x - HERR_LADO / 2, HERR_Y - HERR_LADO / 2, HERR_LADO);

    // icono sin teñir (imagen original)
    imageMode(CENTER);
    image(imgs[i], x, HERR_Y, 24, 24);
    imageMode(CORNER);
  }

  // goma
  let xg = HERR_X0 + 6 * HERR_PASO;
  fill(255);
  stroke(0);
  strokeWeight(borrando ? 4 : 1);
  square(xg - HERR_LADO / 2, HERR_Y - HERR_LADO / 2, HERR_LADO);
  image(imgGoma, xg - HERR_LADO / 2, HERR_Y - HERR_LADO / 2, HERR_LADO, HERR_LADO);

  // COLORES --------------------------
  for (let i = 0; i < colores.length; i++) {
    let x = COL_X0 + i * COL_PASO;

    fill(colores[i]);
    stroke(0);
    strokeWeight(!borrando && colorActual === colores[i] ? 4 : 1);
    square(x - COL_LADO / 2, COL_Y - COL_LADO / 2, COL_LADO);
  }

  // TAMAÑOS  -----------
  for (let i = 0; i < 3; i++) {
    let x = TAM_X0 + i * TAM_PASO;
    let lado = ladosIcono[i];

    fill(255);
    stroke(0);
    strokeWeight(i === tamanoActual ? 4 : 1);
    square(x - lado / 2, TAM_Y - lado / 2, lado);
  }

  // FONDOS --------------------------
  for (let i = 1; i <= 3; i++) {
    let x = FON_X0 + (i - 1) * FON_PASO;

    image(fondos[i], x - FON_W / 2, FON_Y - FON_H / 2, FON_W, FON_H);

    noFill();
    stroke(0);
    strokeWeight(i === fondoActual ? 4 : 1);
    rect(x - FON_W / 2, FON_Y - FON_H / 2, FON_W, FON_H);
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
  }
  pg.updatePixels();
  return pg;
}

function enCaja(x, y) {
  return x < CAJA_W && y < CAJA_H;
}

function sobre(cx, cy, w, h) {
  return mouseX > cx - w / 2 && mouseX < cx + w / 2 &&
         mouseY > cy - h / 2 && mouseY < cy + h / 2;
}

function mousePressed() {
  if (!enCaja(mouseX, mouseY)) return;

  // Herramientas: formas
  for (let i = 1; i <= 6; i++) {
    let x = HERR_X0 + (i - 1) * HERR_PASO;
    if (sobre(x, HERR_Y, HERR_LADO, HERR_LADO)) {
      forma = i;
      borrando = false;
    }
  }

  // Herramientas: goma
  let xg = HERR_X0 + 6 * HERR_PASO;
  if (sobre(xg, HERR_Y, HERR_LADO, HERR_LADO)) {
    borrando = true;
  }

  // Colores
  for (let i = 0; i < colores.length; i++) {
    let x = COL_X0 + i * COL_PASO;
    if (sobre(x, COL_Y, COL_LADO, COL_LADO)) {
      colorActual = colores[i];
      borrando = false;
    }
  }

  // Tamaños
  for (let i = 0; i < 3; i++) {
    let x = TAM_X0 + i * TAM_PASO;
    if (sobre(x, TAM_Y, 34, 34)) {
      tamanoActual = i;
    }
  }

  // Fondos
  for (let i = 1; i <= 3; i++) {
    let x = FON_X0 + (i - 1) * FON_PASO;
    if (sobre(x, FON_Y, FON_W, FON_H)) {
      fondoActual = i;
    }
  }
}