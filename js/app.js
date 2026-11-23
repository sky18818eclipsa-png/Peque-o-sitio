//alert("El archivo JavaScript está conectado");
// La conexión con este archivo ya fue comprobada.
console.log("El programa comenzó.");
// 1. DATOS INICIALES

const capacidad = 10;
const presentesGuardados = sessionStorage.getItem("presentes");

let presentes = presentesGuardados !== null
    ? Number(presentesGuardados)
    : 0;


// SELECCIONAR ELEMENTOS DEL DOM


const tarjeta = document.querySelector(".tarjeta");
const presentesHTML = document.querySelector("#presentes");
const capacidadHTML = document.querySelector("#capacidad");
const estadoHTML = document.querySelector("#estado");
const mensajeHTML = document.querySelector("#mensaje");

const botonAgregar = document.querySelector("#agregar");
const botonRetirar = document.querySelector("#retirar");


// ELEGIR LA APARIENCIA DEL PERSONAJE


function obtenerImagenPersonaje(cantidad) {

    if (cantidad >= 8) {
        return "img/personajes/oveja pesadilla.png";

    } else if (cantidad >= 7) {
        return "img/personajes/oso triste.png";

    } else if (cantidad >= 6) {
        return "img/personajes/conejo triste.png";

    } else if (cantidad >= 5) {
        return "img/personajes/oveja triste.png";

    } else if (cantidad === 4) {
        return "img/personajes/serpiente.png";

    } else if (cantidad === 3) {
        return "img/personajes/oso.png";

    } else if (cantidad === 2) {
        return "img/personajes/conejo.png";

    } else {
        return "img/personajes/oveja.png";
    }
}

// CALCULAR EL ESTADO DEL SUEÑO


function evaluarAforo(presentes, capacidad) {

    if (
        capacidad <= 0 ||
        presentes < 0 ||
        presentes > capacidad
    ) {
        return {
            estado: "ERROR",
            mensaje: "Error: cantidad de personajes inválida."
        };
    }

    const ocupacion = (presentes / capacidad) * 100;

    if (ocupacion < 50) {
        return {
            estado: "SUEÑO",
            mensaje: "El entorno parece estable. Puedes continuar."
        };

    } else if (ocupacion < 80) {
        return {
            estado: "INESTABLE",
            mensaje: "Se detectan anomalías en el entorno."
        };

    } else {
        return {
            estado: "PESADILLA",
            mensaje: "¡Advertencia! El sueño está perdiendo el control."
        };
    }
}



//  MODIFICAR LA CANTIDAD DE PERSONAJES

function agregarPersonaje() {

    if (presentes < capacidad) {
        presentes++;
    }
}

function retirarPersonaje() {

    if (presentes > 0) {
        presentes--;
    }
}



//  ACTUALIZAR INTERFAZ


function actualizarInterfaz() {

    const resultado = evaluarAforo(presentes, capacidad);
    const imagenPersonaje = obtenerImagenPersonaje(presentes);

    sessionStorage.setItem("personajeActual", imagenPersonaje);
    sessionStorage.setItem("presentes", presentes);
    const imagenCursor = document.querySelector("#personaje-cursor");

    if (imagenCursor) {
    imagenCursor.src = imagenPersonaje;
}


    // Actualizar los textos
    presentesHTML.textContent = presentes;
    capacidadHTML.textContent = capacidad;
    estadoHTML.textContent = resultado.estado;
    mensajeHTML.textContent = resultado.mensaje;

    // Actualizar el atributo de la tarjeta
    tarjeta.dataset.state = resultado.estado;

    // Impedir modificaciones fuera de los límites
    botonAgregar.disabled = presentes >= capacidad;
    botonRetirar.disabled = presentes <= 0;
}



//  FUNCIONES PARA LOS EVENTOS


function manejarAgregar() {

    agregarPersonaje();
    actualizarInterfaz();
}

function manejarRetirar() {

    retirarPersonaje();
    actualizarInterfaz();
}



// ESCUCHAR LOS EVENTOS


botonAgregar.addEventListener("click", manejarAgregar);

botonRetirar.addEventListener("click", manejarRetirar);



// MOSTRAR EL ESTADO INICIAL


actualizarInterfaz();

