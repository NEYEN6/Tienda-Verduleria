//Banner
function mostrarBanner() {
    const bannerConten = `
    <div class="banner">
    <h1>Como Comprar?</h1>
    <h2>Realizá tu compra en simples pasos</h2>  
</div>
        `
    const banner = document.getElementById('banner')
    banner.innerHTML += bannerConten

}
mostrarBanner()



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