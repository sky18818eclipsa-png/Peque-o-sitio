

const personajes = [

    
    {
        nombre: "Osluvio",
        imagen: "img/personajes/oso.png",
        descripcion: "Está atravesando un duelo y le cuesta aceptar aquello que perdió.se aferra a los recuerdos porque teme olvidarlos. No le importa que las cosas salgan mal, suele resignarse de inmediato con total calma y apatia.",
        rasgos: [
            "Deprimido",
            "Pesimista",
            "Emocionalmente vulnerable"
        ]
    
    },

    {
        nombre: "Pompori",
        imagen: "img/personajes/conejo.png",
        descripcion: "Está acostumbrada a conseguir todo lo que quiere y cree merecer siempre un trato especial. Se resiste a crecer, asumir responsabilidades y dejar de sentirse un rey, aunque su corona sea de cartón.",
        rasgos: [
            "Consentida",
            "Orgullosa",
            "Inmadura"
        ]
    
    },

    {
        nombre: "Teresa",
        imagen: "img/personajes/oveja.png",
        descripcion: "Es una oveja de negocios que vive atrapada en una rutina de trabajo constante. Principal mente se dedica a la contaduria pero es sobreexplotada, trabaja demasiado por el sueldo minimo, cumple con todo y siente que no puede permitirse descansar.",
        
        rasgos: [
            "Seria",
            "Responsable",
            "Agotada"
        ]
    },

    {
        nombre: "Zalem",
        imagen: "img/personajes/serpiente.png",
        descripcion: "Prefiere dormir y evitar los problemas antes que enfrentarse a ellos. utiliza el sueño como refugio para no tener que lidiar con la realidad, lo que mas le gusta es tener sueños lucidos.",
        rasgos: [
            "Reservado", 
            "Somnoliento", 
            "Evasivo"
        ]  
    
    }

];

  const imagenPersonaje = document.querySelector("#imagen-personaje");

  const nombrePersonaje = document.querySelector("#nombre-personaje");

  const descripcionPersonaje = document.querySelector("#descripcion-personaje");

  const rasgosPersonaje = document.querySelector("#rasgos-personaje");
  
  let personajeActual = 0;

    function mostrarPersonaje() {

    const personaje = personajes[personajeActual];

    imagenPersonaje.src = personaje.imagen;
    imagenPersonaje.alt = personaje.nombre;

    nombrePersonaje.textContent = personaje.nombre;

    descripcionPersonaje.textContent = personaje.descripcion;

    rasgosPersonaje.innerHTML = "";

    personaje.rasgos.forEach(function(rasgo) {

        const nuevoRasgo = document.createElement("li");

        nuevoRasgo.textContent = rasgo;

        rasgosPersonaje.appendChild(nuevoRasgo);

    });

}

function cambiarPersonaje(direccion) {

    personajeActual += direccion;

    if (personajeActual < 0) {
        personajeActual = personajes.length - 1;
    }

    else if (personajeActual >= personajes.length) {
        personajeActual = 0;
    }

    mostrarPersonaje();

}const botonesCambio = document.querySelectorAll("[data-cambio]");

botonesCambio.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const direccion = Number(boton.dataset.cambio);

        cambiarPersonaje(direccion);

    });

});
   mostrarPersonaje();
