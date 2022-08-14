const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const botonComprar = document.getElementById('finalizar-compra')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

//Banner
function mostrarBanner() {
    const bannerConten = `
    <div class="banner">
    <h1>Productos </h1>
    <h2>Listado completo</h2>  
</div>
        `
    const banner = document.getElementById('banner')
    banner.innerHTML += bannerConten

}
mostrarBanner()


//Vaciar Carrito
botonVaciar.addEventListener('click', () => {
    Swal.fire({
        title: 'Vaciar Carrito',
        text: "¿Seguro desea vaciar el varrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Vaciar Carrito'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0
            actualizarCarrito()
            Swal.fire(
                'Carrito vaciado!',
                'Su carrito se encuentra vacio.',
                'success'
            )

        }
    })
})

//Mostrar Productos
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h4 class="precioProducto"> $${producto.precio}</h4>
    <p>${producto.talle}</p>
    <h3>${producto.nombre}</h3>
    <button id="agregar${producto.id}" class="boton-agregar"><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>

    `
    contenedorProductos.appendChild(div)


    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)

    })
})


//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {
        Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'Añadido al carrito',
            showConfirmButton: false,
            "toast": true,
            "background": "#fff",
            "color": "#000",
            timer: 1500
        })
        const existe = carrito.some(prod => prod.id === prodId)
        if (existe) {
            const prod = carrito.map(prod => {
                if (prod.id === prodId) {
                    prod.cantidad++
                }
            })
        } else {
            const item = stockProductos.find((prod) => prod.id === prodId)
            carrito.push(item)
            console.log(carrito)
        }
        actualizarCarrito()
    }
    //ELIMINAR DEL CARRITO
const eliminarDelCarrito = (prodId) => {
        Swal.fire({
            title: 'Eliminar Producto',
            text: "¿Seguro desea eliminar este producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                const item = carrito.find((prod) => prod.id === prodId)
                const indice = carrito.indexOf(item)
                carrito.splice(indice, 1)
                actualizarCarrito()
                console.log(carrito)
                Swal.fire(
                    'Eliminado!',
                    'El producto fue eliminado.',
                    'success'
                )
            }

        })

    }
    //Actualizar Carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)


}
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Footer
const fetchLocalData2 = () => {
    fetch('/javascript/data.json').then((response) => response.json())
        .then((result) => {
            renderFooter(result.redes),
                renderFooter(result.contacto)
        })

    .catch((err) => {

    })
}
const renderFooter = (body) => {
    console.log(body)
    let container = document.getElementById('footer')
    container.innerHTML = `
    <footer class="bg-dark text-white pt-1 pb-4">
        <hr class="">
        <div class="container text-md-center text-md-center">
            <div class="row text-md-center text-md-center ">
                <div class="col-sm-5 col-md-6 col-lg-6 ">
                    <h5 class="text-uppercase mb-4 font-weight-bold ">Sobre Nosotros</h5>
                    <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, ital consectetur lorem ipsum dolor sit amet adipisicing elit.Here you can use rows and columns to organize your footer content. Lorem ipsum
                        dolor sit amet, ital consectetur lorem ipsum dolor sit amet adipisicing elit.</p>
                </div>

                <div class="col-sm-4 col-md-3 col-lg-3 ">
                    <h5 class="text-uppercase mb-4 font-weight-bold ">Contacto</h5>
                    <p>
                        <i class="fas fa-home mr-3"></i> ${body.ubicacion}
                    </p>
                    <p>
                        <i class="fas fa-envelope mr-3"></i> ${body.mail}
                    </p>
                    <p>
                        <i class="fas fa-phone mr-3"></i> ${body.telefono}
                    </p>

                </div>
                <div class="col-sm-4 col-md-3 col-lg-3  redes">
                    <h5 class="text-uppercase mb-4 font-weight-bold ">Redes Sociales</h5>
                    <p>
                         <a href="${body.instagram}" target="_blank" <i class="fa-brands fa-instagram btn--instagram"></i> sebasfrezzini</a>  
                    </p>
                    <p>
                        
                        <a href="${body.twitter}" target="_blank" <i class="fa-brands fa-twitter btn--twitter"></i> NEYEN_CS</a>
                    </p>
                    <p>
                      
                        <a href="${body.facebook}" target="_blank" <i class="fa-brands fa-facebook btn--facebook"></i> Neyen Frezzini</a>
                    </p>

                </div>
            </div>

            <hr class="mb-4">

            <div class="row align-items-center">
                <div class="col-md-12 col-lg-12">
                    <p> Copyright ©2022 All rights reserved by:
                        <a href="#" style="text-decoration: none; color: #a5a5a5;">
                            <strong class="">NEYEN</strong>
                        </a>
                    </p>
                </div>
            </div>

        </div>
    </footer>`;
}
fetchLocalData2();