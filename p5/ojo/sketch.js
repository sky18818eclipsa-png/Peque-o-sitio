let ojoBase;
let iris;

  // PRELOAD -----------------------------------
async function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  ojoBase = await loadImage("ojoBase.png");
  iris = await loadImage("iris.png");
}

function draw() {
  if (!ojoBase || !iris) return;

  background(0);

  let ojoX = width / 2;
  let ojoY = height / 2;

  // Ojo
  image(ojoBase, ojoX, ojoY, 300, 180);

  // iris
  let dx = mouseX - ojoX;
  let dy = mouseY - ojoY;

  let angulo = atan2(dy, dx);
  let distancia = dist(mouseX, mouseY, ojoX, ojoY);

  let maxDist = 40;
  distancia = min(distancia, maxDist);

  let irisX = ojoX + cos(angulo) * distancia;
  let irisY = ojoY + sin(angulo) * distancia;

  // Iris
  image(iris, irisX, irisY, 75, 75);
}