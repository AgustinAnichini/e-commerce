const contenedorProductos = document.getElementById('contendor-productos')
const botonesCategorias = document.querySelectorAll('.boton-categoria')
const tituloPrincipal = document.querySelector('#titulo-principal')
const botonesAgregar = document.querySelectorAll('.comprar-producto')
let numero = document.querySelector("#numero");
let productosEnCarrito = []
let productosEnCarritoLS = localStorage.getItem('productosEnCarrito')
let productos = [];

existenProductos()

fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto => {

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <div class="producto">
              <img class="img-producto" src="${producto.imagen}" alt="${producto.titulo}">

                 <div class="info-producto">
                        <h3 class="titulo-prodcuto">${producto.titulo}</h3>
                        <p class="precio-producto">$${producto.precio}</p>
                 <button class="comprar-producto" id="${producto.id}">Comprar</button>
                </div>
         </div>
        `
        contenedorProductos.appendChild(div);
    })
    actualzarBotonesAgregar()
}

botonesCategorias.forEach(boton => {
    boton.addEventListener('click', e => {
        botonesCategorias.forEach(boton => boton.classList.remove('active'))
        e.currentTarget.classList.add('active')

        if (e.currentTarget.id != 'todos') {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.textContent = productoCategoria.categoria.nombre
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton)
        } else {
            tituloPrincipal.innerText = 'Todos los productos';
            cargarProductos(productos);
        }

    })
});


function actualzarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll('.comprar-producto')

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito)
    });
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado)
    }
    actualzarNumerito()

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
}

function actualzarNumerito() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numero.textContent = nuevoNumero
}

function existenProductos() {
    if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS)
        actualzarNumerito()
    } else {
        productosEnCarrito = []
    }
}
