const contenedorProductos = document.getElementById('track')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    modeToggle = document.querySelector(".dark-light"),
    searchToggle = document.querySelector(".searchToggle"),
    sidebarOpen = document.querySelector(".sidebarOpen"),
    siderbarClose = document.querySelector(".siderbarClose");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
    body.classList.add("dark");
}



//Carrusel
window.addEventListener('load', function() {
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: '.carousel__indicadores',
        arrows: {
            prev: '.carousel__anterior',
            next: '.carousel__siguiente'
        },
        responsive: [{
            // screens greater than >= 775px
            breakpoint: 450,
            settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            // screens greater than >= 1024px
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
});

function App() {}

window.onload = function(event) {
    var app = new App();
    window.app = app;
};

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;

    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition, slickWidth, track) : nextAction(leftPosition, trackWidth, listWidth, slickWidth, track)
}

let prevAction = (leftPosition, slickWidth, track) => {
    if (leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition, trackWidth, listWidth, slickWidth, track) => {
    if (leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }
}





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

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


stockOfertas.forEach((oferta) => {
    const div = document.createElement('div')
    div.className = "slick";
    div.innerHTML = `
           <div >
                    <div>
                    <img src="${oferta.img}" alt="Image">   
                    <h4>$${oferta.precio}</h4>                      
                    <h5>${oferta.unidad}</h5> 
                    <h3>${oferta.nombre}</h3>                         
                    <br>              
                    <button id="agregar${oferta.id}" class="boton-agregar"><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
                    </div>
           </div>
                
          
          
       
    `
    contenedorProductos.appendChild(div)


    const boton = document.getElementById(`agregar${oferta.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(oferta.id)

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
        const item = stockOfertas.find((prod) => prod.id === prodId)
        carrito.push(item)
        console.log(carrito)
    }
    actualizarCarrito()
}

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

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((ofert) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${ofert.nombre}</p>
        <p>Precio:$${ofert.precio}</p>
        <p>Cantidad: <span id="cantidad">${ofert.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${ofert.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, ofert) => acc + ofert.cantidad * ofert.precio, 0)


}



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