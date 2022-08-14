let carrito;
if (JSON.parse(localStorage.getItem('carrito'))) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
    localStorage.setItem('carrito', JSON.stringify([]))
    carrito = JSON.parse(localStorage.getItem('carrito'))
}

const totalCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}

//Banner
function mostrarBanner() {
    const bannerConten = `
    <div class="banner">
    <h1>Carrito </h1>
    <h2>de compras</h2>
   
</div>
        `
    const banner = document.getElementById('banner')
    banner.innerHTML += bannerConten

}
mostrarBanner()

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