const productos = [
    { id: 1, nombre: "Manzanas", precio: 730 },
    { id: 2, nombre: "Bananas", precio: 1050 },
    { id: 3, nombre: "Zanahorias", precio: 650 },
    { id: 4, nombre: 'Pepino', precio: 400 },
    { id: 5, nombre: 'Berenjena', precio: 800 },
    { id: 6, nombre: 'Tomate', precio: 850 },
    { id: 7, nombre: 'Calabacin', precio: 750 },
    { id: 8, nombre: 'Pimiento Verde', precio: 775 },
    { id: 9, nombre: 'Opio', precio: 690 },
];

const carrito = [];
let totalCompra = 0;

function mostrarProductos() {
    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = "";
    productos.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>`;
        listaProductos.appendChild(li);
    });
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    carrito.push(producto);
    totalCompra += producto.precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>`;
        listaCarrito.appendChild(li);
    });
    const totalCompraElement = document.getElementById("totalCompra");
    totalCompraElement.textContent = totalCompra.toFixed(2);
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
    if (carrito.length === 0) {
        alert("Debes seleccionar al menos un producto antes de finalizar la compra.");
        return;
    }

    let nombreCliente;
    
    while (true) {
        nombreCliente = prompt("Por favor, ingresa tu nombre:");
        if (nombreCliente !== null && nombreCliente.trim() !== "") {
            break;
        }
    }
    
    alert(`Gracias por tu compra, ${nombreCliente}. Total: $${totalCompra.toFixed(2)}`);
    
    vaciarCarrito();
}

mostrarProductos();

document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);
