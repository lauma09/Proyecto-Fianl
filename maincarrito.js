let carrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const carritoVacio = document.querySelector("#carritoVacio")
const carritoCompra = document.querySelector("#carritoCompra")
const contenedorCarrito = document.querySelector("#contenedor-carrito")
const todoCarrito = document.querySelector("#todoCarrito")
const carritoAcciones = document.querySelector("#carritoAcciones")
const botonComprar = document.querySelector("#boton-comprar")
const titulos = document.querySelector("#titulos")
const botonVaciar = document.querySelector("#vaciar-carrito")
const total = document.querySelector("#total")


function cargarProductosCarrito() {
    if (carrito && carrito.length>0) {

        todoCarrito.innerHTML = "";

        carritoVacio.classList.add("disabled");
        contenedorCarrito.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoCompra.classList.add("disabled");
        titulos.classList.remove("disabled");
    
    
        carrito.forEach(producto => {
            
            const div = document.createElement("div");
            div.classList.add("carrito-producto")
            div.innerHTML = `
                        <p>${producto.nombre}</p>
                        <p>${producto.cantidad}</p> 
                        <p>$${producto.precio}</p>
                        <p>$${producto.cantidad * producto.precio}</p>
                        <button class="trash" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `;
            todoCarrito.append(div);
        });
    
    
    } else {
        carritoVacio.classList.remove("disabled");
        contenedorCarrito.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoCompra.classList.add("disabled");
        titulos.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    botonEliminar = document.querySelectorAll(".trash");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = carrito.findIndex(producto => producto.id === idBoton);

    carrito[index].cantidad=carrito[index].cantidad-1
    
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    

    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));

    cargarProductosCarrito();
    actualizarNumerito();
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    carrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    cargarProductosCarrito();
}

function actualizarNumerito() {
    let nuevoNumerito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

actualizarNumerito();

// Botones de acción //

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${carrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
            cargarProductosCarrito();
            actualizarNumerito();
        }
      })
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        title: 'Finalizar compra',
        icon: 'question',
        html: `¿Quieres comprar los ${carrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos?`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
            Swal.fire({
                title: "¡Gracias por tu compra!",
                icon: "success"
              });
            cargarProductosCarrito();
            actualizarNumerito();
        }
      })
}

function actualizarTotal() {
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const totalElement = document.getElementById('total');
    totalElement.innerText = `$${total}`;
}