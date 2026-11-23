const productos = {

    blindbox: {
        nombre: "Blindbox Liminalia",
        imagen: "img/tienda/blindbox.png",
        descripcion: "Una caja sorpresa que contiene uno de los cuatro peluches de Liminalia. ¿Qué personaje te tocará?"
    },

    poster: {
        nombre: "Póster Liminalia",
        imagen: "img/tienda/poster.png",
        descripcion: "Lleva contigo una ilustración del extraño universo de Liminalia."
    },

    juego: {
        nombre: "Juego de mesa Liminalia",
        imagen: "img/tienda/juego.png",
        descripcion: "Explora habitaciones, consigue las llaves y encuentra la salida de este sueño compartido."
    }

};


// Seleccionamos los elementos HTML

const ventanaProducto = document.querySelector("#ventana-producto");
const imagenDetalle = document.querySelector("#imagen-detalle");
const nombreDetalle = document.querySelector("#nombre-detalle");
const descripcionDetalle = document.querySelector("#descripcion-detalle");
const cerrarProducto = document.querySelector("#cerrar-producto");


// Buscamos todos los botones de productos

const botonesProducto = document.querySelectorAll("[data-producto]");


// Agregamos un evento a cada botón

botonesProducto.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const nombreProducto = boton.dataset.producto;

        const producto = productos[nombreProducto];

        imagenDetalle.src = producto.imagen;
        imagenDetalle.alt = producto.nombre;

        nombreDetalle.textContent = producto.nombre;
        descripcionDetalle.textContent = producto.descripcion;

        ventanaProducto.showModal();

    });
});
// Botón para cerrar la ventana

cerrarProducto.addEventListener("click", function() {

    ventanaProducto.close();

});