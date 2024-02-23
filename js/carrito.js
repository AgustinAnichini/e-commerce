let productosEnCarrito = localStorage.getItem('productosEnCarrito')
productosEnCarrito = JSON.parse(productosEnCarrito)


const carritoVacio = document.getElementById('carrito-vacio')
const contendorProductos = document.getElementById('carrito-productos')
const carritoAcciones = document.getElementById('carrito-acciones')
const carritoComprado = document.getElementById('carrito-comprado')
let botonesEliminar = document.querySelectorAll('.carrito-producto-eleminar')
const botonComprar = document.getElementById('comprar')
const vaciar = document.getElementById('vaciar')
const fragment = document.createDocumentFragment()

cargarProductosCarrito()

function cargarProductosCarrito() {

    if (productosEnCarrito != null && productosEnCarrito.length > 0) {

        contendorProductos.innerHTML = ' '

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div")
            div.classList.add('carrito-producto')
            div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">

            <div class="carrito-producto-titulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>

            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>

            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>

            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>

            <button class="carrito-producto-eleminar" id="${producto.id}" ><i class="bi bi-trash-fill"></i></button>
        `
            fragment.appendChild(div)
        })
        contendorProductos.appendChild(fragment)

    } else {
        carritoVacio.classList.remove('carrito-vacio')
        carritoAcciones.classList.add('carrito-vacio')
        contendorProductos.classList.add('carrito-vacio')
    }
    actualzarBotonesEliminar()
    actualizarTotal()
}

function actualzarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll('.carrito-producto-eleminar')

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)

    productosEnCarrito.splice(index, 1)
    console.log(productosEnCarrito)
    cargarProductosCarrito()

    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito))
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener('click', e => {
    carritoComprado.classList.remove('disabled')
    carritoAcciones.classList.add('carrito-vacio')
    contendorProductos.classList.add('carrito-vacio')
})

vaciar.addEventListener('click', e => {
    productosEnCarrito = []
    cargarProductosCarrito()
})