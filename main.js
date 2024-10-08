let productos = [];
fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        CargarProductos(productos);
    })

let carrito;
let carritoLS = localStorage.getItem("productos-en-carrito")
const numerito = document.getElementById('numerito');
if (carritoLS) {
    carrito = JSON.parse(carritoLS);
    actualizarNumerito();
} else {
    carrito = [];
}


const contenedorProductos = document.querySelector("#contenedor");


function CargarProductos() {


     const categorias = {};

        //  Agrupar productos por su categoría
     productos.forEach(producto => {
         if (!categorias[producto.categoria]) {
             categorias[producto.categoria] = [];
         }
         categorias[producto.categoria].push(producto);
     });

     for (const categoria in categorias) {
        //  Contenedor para la categoría
         const nav = document.createElement("nav");
         nav.classList.add("categoria");
         nav.innerHTML = `<h2 class= titulo>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>`;

        //   Añadir los productos de esa categoría
  categorias[categoria].forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
            <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.nombre}</h3>
            <p class="producto-precio">$${producto.precio}</p>   
            </div>
        `;
        //   Boton para los productos
        let button = document.createElement("button");
            button.classList.add("producto-btn");
            button.innerText = "Agregar";
            button.addEventListener("click", () => {
            agregarCarrito(producto);
        })
            div.append(button);
            nav.append(div);
            contenedorProductos.append(nav);
    
    })    
    }
        // Función carrito
    function agregarCarrito(producto) {
        let itemEcontrado = carrito.find((item) => item.id === producto.id);
        if (itemEcontrado) {
            itemEcontrado.cantidad++;
        } else {
            carrito.push({...producto, cantidad: 1});
        }
        actualizarNumerito()
        localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    }

}




function actualizarNumerito() {
    let nuevoNumerito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



// Lista desplegable
contenedorProductos.addEventListener('click', (event) => {
    if (event.target.classList.contains('titulo')) {
        const categoriasElems = document.querySelectorAll('.categoria');
        categoriasElems.forEach((cadaCategoria) => {
            cadaCategoria.classList.remove('activo');
        });
        event.target.parentElement.classList.add('activo');
    }
});
