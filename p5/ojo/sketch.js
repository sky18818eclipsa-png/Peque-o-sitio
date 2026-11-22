let ojoBase;
let iris;

async function setup() {
  createCanvas(200, 500);
  imageMode(CENTER);

  ojoBase = await loadImage("ojoBase.png");
  iris = await loadImage("iris.png");
}

function draw() {
  if (!ojoBase || !iris) return;

  background(0);

  let cantidad = 3;
  let separacion = 20;
  let ojoW = width - 20;
  let ojoH = ojoW * 0.6;
  let irisSize = ojoW * 0.25;
  let maxDist = ojoW * 0.133;

  // Alto total de la columna, para centrarla verticalmente
  let totalAlto = cantidad * ojoH + (cantidad - 1) * separacion;
  let inicioY = (height - totalAlto) / 2;

  let ojoX = width / 2;

  for (let i = 0; i < cantidad; i++) {
    let ojoY = inicioY + i * (ojoH + separacion) + ojoH / 2;

    image(ojoBase, ojoX, ojoY, ojoW, ojoH);

    let dx = mouseX - ojoX;
    let dy = mouseY - ojoY;

    let angulo = atan2(dy, dx);
    let distancia = min(dist(mouseX, mouseY, ojoX, ojoY), maxDist);

    let irisX = ojoX + cos(angulo) * distancia;
    let irisY = ojoY + sin(angulo) * distancia;

    image(iris, irisX, irisY, irisSize, irisSize);
  }
}
