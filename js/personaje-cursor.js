
// PERSONAJE QUE ACOMPAÑA AL CURSOR


const personajeCursor = document.querySelector("#personaje-cursor");

// Recuperar la última apariencia guardada
const imagenGuardada = sessionStorage.getItem("personajeActual");

if (imagenGuardada) {
    personajeCursor.src = imagenGuardada;
}

// Seguir el movimiento del mouse
function seguirCursor(event) {

    personajeCursor.style.left = `${event.clientX}px`;
    personajeCursor.style.top = `${event.clientY}px`;

    personajeCursor.style.opacity = "1";
}

document.addEventListener("mousemove", seguirCursor);