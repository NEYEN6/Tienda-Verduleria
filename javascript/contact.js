//Banner
function mostrarBanner() {
    const bannerConten = `
    <div class="banner">
    <h1>Contactanos </h1>
    <br>
    
   
</div>
        `
    const banner = document.getElementById('banner')
    banner.innerHTML += bannerConten

}
mostrarBanner()

//Contact
function mostrarContact() {
    const contactContent = `
    <div class="contenedor">
    <div class="content">
        <div class="image">
            <div class="contact-info">
                <h4>Mas Informacion</h4>
                <ul>
                    <li><i class="fas fa-map-marker-alt"></i> Mercado Central</li>
                    <li><i class="fas fa-phone"></i> 1134926311</li>
                    <li><i class="fas fa-envelope-open-text"></i> sebasfrezzini@gmail.com</li>
                </ul>
                <p>Dia (Hora) de reparto: De lunes a sábados de 9 a 15hs.</p>
                <p>Anquiara S.R.L.</p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.7164718664662!2d-58.499134884588756!3d-34.71233057076046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccf18728bc6a7%3A0x3f70d23922775273!2sMercado%20Central!5e0!3m2!1ses-419!2sar!4v1657752734072!5m2!1ses-419!2sar"
                    width="400" height="200" style="border:solid 1px; " allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>


    </div>
    <form id="form" action="https://formsubmit.co/sebasfrezzini@gmail.com" method="POST" >
        <div class="social">
            <div class="title">Formulario</div>
        </div>

        <!-- /** 
      * ! user name Input here
     **/ -->
     <label for="username">Nombre <i class="fa-solid fa-user"></i></label>
        <div>  
            <input name="text" name="username" id="username" placeholder="Nombre Completo" />
            <i class="fas fa-exclamation-circle failure-icon"></i>
            <i class="far fa-check-circle success-icon"></i>
            <div class="error"></div>
        </div>

        <!-- /** 
      * ! Email Input here
     **/ -->
     <label for="email">Email <i class="fa-solid fa-envelope"></i></label>
        <div>    
            <input name="email" name="email" id="email" placeholder="abc@gmail.com" />
            <i class="fas fa-exclamation-circle failure-icon"></i>
            <i class="far fa-check-circle success-icon"></i>
            <div class="error"></div>
        </div>

        <!-- /** 
      * ! Password Input here
     **/ -->
     <label for="mensaje">Mensaje <i class="fa-solid fa-message"></i></label>
        <div class="text-area"> 
           
            <textarea name="textarea" name="mensaje" id="mensaje" placeholder="Mensaje"></textarea>
            <i class="fas fa-exclamation-circle failure-icon"></i>
            <i class="far fa-check-circle success-icon"></i>
            <div class="error"></div>
        </div>

        <button type="submit" id="submit">Enviar</button>
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="http://127.0.0.1:5501/pages/contact.html>

    </form>
</div>
      `
    const contact = document.getElementById('contact')
    contact.innerHTML += contactContent

}
mostrarContact()



let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let username = id("username"),
    email = id("email"),
    mensaje = id("mensaje"),
    form = id("form"),
    errorMsg = classes("error"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    engine(username, 0, "El nombre no puede estar en blanco");
    engine(email, 1, "Email incorrecto");
    engine(mensaje, 2, "El mensaje no puede estar en blacno");
});

let engine = (id, serial, message) => {
    if (id.value.trim() === "") {
        errorMsg[serial].innerHTML = message;
        id.style.border = "2px solid red";

        // icons
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
    } else {
        errorMsg[serial].innerHTML = "";
        id.style.border = "2px solid green";

        // icons
        failureIcon[serial].style.opacity = "0";
        successIcon[serial].style.opacity = "1";
    }
};

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