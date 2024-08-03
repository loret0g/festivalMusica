document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', () => {
        if(sobreFestival.getBoundingClientRect().bottom < 1) {  // Coodernadas
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });
}

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;
        /*const imagen = document.createElement('IMG');
        imagen.loading = 'lazy';
        imagen.width = '300';
        imagen.height = '200';
        imagen.src = `src/img/gallery/thumb/${i}.jpg`;
        imagen.alt = 'Imagen galería';*/

        // Event Handler (detecta el click)
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;

    // Generar Modal:
    const modal = document.createElement('DIV');
    modal.classList.add('modal');

    // Botón para cerrar
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    // Eliminar modal:
    modal.onclick = cerrarModal;    // No () ya que no tiene argumento y se ejecutaría al darle click a la foto

    // Agregar al HTML:
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');      // Para que no se pueda hacer scroll con la img abierta
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal?.remove();    // Si existe modal -> elimina

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');
        let actual = '';
        // Detectar sección:
        sections.forEach(section => {
            const sectionTop = section.offsetTop;       // Esta función recoge la distancia entre la parte sup. del section y su padre (body).
                                                        // Si estuviese dentro de un div. Recogería esa medida.
            const sectionHight =  section.clientHeight; // Cuanto mide el elemento (píxeles que mide el section)

            // Detecta section más visible:
            if(window.scrollY >= (sectionTop - sectionHight / 3)) {     // scroll que damos >= (distancia que se encuentra en el HTML)
                actual = section.id;
            }
        });

        // Añade la clase al section más visible: (iteramos sobre los links, buscando el más visible)
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            }
        });
    });
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();     // Para que no me lleve de forma instantanea al link que se pulsa

            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'});
        });
    });
}