let carrito;

if (JSON.parse(localStorage.getItem('carrito'))) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
    localStorage.setItem('carrito', JSON.stringify([]))
    carrito = JSON.parse(localStorage.getItem('carrito'))
}
//Banner
function mostrarBanner() {
    const banerContent = `
    <div class="banner">
    <h1>Productos </h1>
    <h2>Listado completo</h2>
   
</div>
        `
    const banner = document.getElementById('banner')
    banner.innerHTML += banerContent

}
mostrarBanner()

//Productos
function mostrarProductos() {

    for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        const { id, nombre, precio, img, data } = element
        const card = `
        <div class='card'>          
            <div>
                <img class='imgProducto' src=${img} alt=''/>
            </div>
            <div>
                <h2> $${precio.toLocaleString()}</h2>
                <h5>${data}</h5>
                <h1>${nombre}</h1>
            </div>
            <div class="btn-container">
                <button id=${id} class='btnAgregar'><i class="fa-solid fa-cart-shopping"></i> Agregar al Carrito </button>
            </div>
        </div>
        `
        const container = document.getElementById('container')
        container.innerHTML += card
    }

}
mostrarProductos()

const btnAgregar = document.getElementsByClassName('btnAgregar')

for (let i = 0; i < btnAgregar.length; i++) {
    const element = btnAgregar[i];
    element.addEventListener('click', agregarCarrito)

}


//Agregar Productos
function agregarCarrito(e) {
    const btn = e.target;
    const idBoton = btn.getAttribute('id')
    const productoEncontrado = productos.find(prod => prod.id == idBoton)
    const enCarrito = carrito.find(prod => prod.id == productoEncontrado.id)
    if (!enCarrito) {
        carrito.push({...productoEncontrado, cantidad: 1 })
    } else {
        let carritoFiltrado = carrito.filter(prod => prod.id != enCarrito.id)
        carrito = [...carritoFiltrado, {...enCarrito, cantidad: enCarrito.cantidad + 1 }]
    }
    console.log(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    Swal.fire({
        icon: 'success',
        title: 'Se Agrego Al Carrito',
        showConfirmButton: false,
        timer: 1800,
        width: "20%",
        backdrop: false,
        toast: true,
        position: "bottom",
        background: "#bdbdbd",
        color: "#000",
        padding: "5px 10px",
        top: "20%"

    })
    return
}
const contador = document.getElementById('cartCounter')
contador.innerHTML = carrito.length


if (JSON.parse(localStorage.getItem('carrito'))) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
    localStorage.setItem('carrito', JSON.stringify([]))
    carrito = JSON.parse(localStorage.getItem('carrito'))
}

const totalCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}



const body = document.getElementById('carrito');
if (carrito.length == 0) {
    const texto = `
    <div class='cartContainer'>
        <h1 class='txtCarrito'>No hay productos en el carrito</h1>
        <a class='btnVolver' href='../pages/tienda.html'>
            <button>Volver a la tienda</button>
        </a>
    </div>`;
    body.innerHTML += texto;

} else {
    const table = `
        <div class='tableContainer'>
            <table>
                <thead>
                    <tr>
                        <th><button id="vaciar"><i class="fa-solid fa-circle-xmark"></i></button></th>              
                        <th class='txtTabla'>PRODUCTOS</th>
                        <th class='txtTabla'>CANTIDAD</th>
                        <th class='txtTabla'>PRECIO</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th class='txtTotal'>Total:</th>
                        <th id='total'>$${totalCarrito().toLocaleString()}</th>
                    </tr>
                </tfoot>
            </table>
            </div>
            <div class='btn-container'>
            <a href="../pages/tienda.html"><button id="btn1" class='btnTerminar'>Seguir Comprando</button></a>
            <a href="#"><button id="btn2" class='btnTerminar2'>Confirmar Pedido</button></a>

            </div>`;
    body.innerHTML += table

    const tbody = document.getElementById('tbody')
    for (let i = 0; i < carrito.length; i++) {
        const element = carrito[i];
        const { id, nombre, img, precio, cantidad } = element;
        const cart = `
                <tr id=${id}>
                    <th><img class='trash' src='../img/trash.png' alt='foto de borrar'></th>
                    <th class='detallesTabla'><img class='imgProdCart' src=${img}><span class='nombreProd'>${nombre}</span></th>
                    <th>${cantidad}</th>
                    <th>$${(cantidad * precio).toLocaleString()}</th>
                </tr>`
        tbody.innerHTML += cart
    }

    //Alert confirmar pedido
    const btnAlert = document.getElementById("btn2")
    btnAlert.addEventListener("click", () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra Realizada',
            text: 'Su compra se realizo con exito',
            showConfirmButton: false,
            timer: 2500,
            grow: "row"
        })
    })

    //cerrar
    const btnVaciar = document.getElementById("vaciar")
    btnVaciar.addEventListener("click", () => {
        Swal.fire({
            title: 'Vaciar Carrito',
            text: "Desea borrar todo el carrito?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, borrar todo'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = {}
                Swal.fire(
                    'Borrado!',
                    'Todo su carrito fue eliminado',
                    'success'
                )
            }
        })
    })
}