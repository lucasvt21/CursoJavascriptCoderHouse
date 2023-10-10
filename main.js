let productos = [];
let carrito = [];

const getProductos = async () => {
    try {
        const response = await fetch("./JSON/productos.JSON");
        const data = await response.json();
        productos = data || [];
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

let totalCompra = 0;

const storedCarrito = localStorage.getItem("carrito");

if (storedCarrito) {
    carrito = JSON.parse(storedCarrito);
    actualizarCarrito();
}

function mostrarProductos(productos) {
    const gridProductos = document.getElementById("gridProductos");
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `<div class="producto-card">
        <img src="${producto.img}" alt="${producto.nombre}" />
        <p class="titulo-producto">${producto.nombre}</p> <p class = "precio-producto"> $${producto.precio.toFixed(2)}</p>
        <button class="boton-producto" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        </div>`;
        gridProductos.appendChild(div);
    });
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);

    const productoEnCarrito = carrito.find(p => p.id === productoId);

    productoEnCarrito ? productoEnCarrito.cantidad++ : (producto.cantidad = 1, carrito.push(producto));

    totalCompra += producto.precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";

    let totalItems = 0;

    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `${producto.nombre} (x${producto.cantidad}) - $${(producto.precio * producto.cantidad).toFixed(2)} <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>`;
        listaCarrito.appendChild(li);

        totalItems += producto.cantidad;
    });

    const totalCompraElement = document.getElementById("totalCompra");

    totalCompraElement && (totalCompraElement.textContent = totalCompra.toFixed(2));

    const totalItemsElement = document.getElementById("totalItems");
    totalItemsElement && (totalItemsElement.textContent = totalItems);

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarDelCarrito(productoId) {
    const index = carrito.findIndex(p => p.id === productoId);
    if (index !== -1) {
        const productoEliminado = carrito.splice(index, 1)[0];
        totalCompra -= productoEliminado.precio;
        actualizarCarrito();
    }
}

function vaciarCarrito() {
    carrito.length = 0;
    totalCompra = 0;
    actualizarCarrito();
}

function finalizarCompra() {
    carrito.length === 0
        ? Swal.fire({
            icon: 'error',
            title: 'Problemas',
            text: 'Tiene que seleccionar al menos un producto para realizar la compra.'
        })
        : Swal.fire({
            icon: 'success',
            title: 'La compra fue realizada con exitos.',
            text: `Gracias por tu compra, Total: $${totalCompra.toFixed(2)}`
        });

    vaciarCarrito();
}

document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);

getProductos();


/// En la siguiente entrega realizare todo lo faltante.
