(function() {
  "use strict";
  /* Easy selector helper function */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }/*Ayuda a seleccionar un elemento usando querySelector o querySelectorAll (cuando all es verdadero), limpiando el input.*/

  /* Easy event listener function */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }/*Añade un listener para eventos (como clicks o scroll) a uno o mas elementos seleccionados mediante la función select.*/

  /* Easy on scroll event listener */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }/*Añade un listener para el evento scroll en un elemento, ejecutando una función cada vez que el usuario haga scroll.*/

  /* Barra de nav */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive) /*Cambia la clase active de los enlaces del navbar (barra de navegación) basándose en la posición actual del scroll y la sección visible en pantalla.*/


  /* Scroll a elemento */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }/*Realiza un desplazamiento suave hacia un elemento específico, ajustando por la altura del encabezado si está fijado.*/

  /* Toggle .header-scrolled class a #header cuando scroll */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  } /* Agrega o quita la clase header-scrolled cuando el usuario hace scroll más de 100 píxeles, modificando el estilo del encabezado. */

  /* Nav celu toggle */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })/* Alterna el menú de navegación móvil entre abierto y cerrado cuando se hace clic en el botón de menú. */

  /* Nav celu */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true) /* Activa/desactiva los submenús en el menú en la version de celu cuando se hace clic en un enlace que tiene un dropdown */

  /* Scroll con .scrollto */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true) /* Permite que los enlaces con la clase .scrollto hagan scroll suave hasta su destino, ajustando por el header y cerrando el menú móvil si está abierto. */

  /* Scroll con links URL */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  }); /* verifica si la URL contiene un hash que haga referencia a un elemento en la página */

  /* Preloader */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  } /*Elimina el preloader de la página una vez que el contenido ha terminado de cargarse.*/


  /* Testimonials slider */
  new Swiper('.testimonials-slider', {
    speed: 100,
    loop: false,
    autoplay: false,
    slidesPerView: '1',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  }); /* Configura un slider con testimonios, permitiendo navegar entre ellos mediante paginación tipo "bullets". */

 /* Animación en scroll */
 window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  })

 /* Swipers */

  var mySwiper = new Swiper(".swiper", {
    autoHeight: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    speed: 500,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    spaceBetween: 30,
    on: {
      init: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
      },
      slideChangeTransitionStart: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper.realIndex).addClass("active");
      }
    }
  });

   /* Interacción con scroll */
  $(".swiper-pagination-custom .swiper-pagination-switch").click(function () {
    mySwiper.slideTo($(this).index());
    $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
    $(this).addClass("active");
  });
});

  particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
})() /* Configura un fondo interactivo de partículas, usando la librería particlesJS. */


/* CARRITO */

// Actualizar el contador del carrito en pantalla
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').innerText = cart.length;
}

// Función para agregar un evento al carrito
function addToCart(eventName) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verificar si el evento ya está en el carrito
  const eventExists = cart.find(event => event.name === eventName);
  if (!eventExists) {
      cart.push({ name: eventName });
      localStorage.setItem('cart', JSON.stringify(cart));
      //alert(`${eventName} se agregó al carrito.`);
  } else {
    // Usar SweetAlert en lugar del alert
    Swal.fire({
      icon: 'info',
      title: `${eventName} ya está en el carrito.`,
      text: '¡Puedes seguir añadiendo más eventos o revisar tu carrito!',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#010483',
    });
  }

  // Actualizar el contador de items en el carrito
  updateCartCount();
}


// Mostrar y ocultar el panel del carrito
function toggleCart() {
  const cartPanel = document.getElementById('cart-panel');
  cartPanel.classList.toggle('hidden');
  displayCartItems();
}

// Mostrar los elementos del carrito en el panel emergente
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');

  if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
      return;
  }

  cartItemsContainer.innerHTML = "<ul>" +
      cart.map(event => `
          <li>
              ${event.name} 
              <i class="fas fa-trash-alt trash-icon" onclick="removeFromCart('${event.name}')"></i>
          </li>
      `).join('') +
      "</ul>";
}

// Función para eliminar un evento del carrito
function removeFromCart(eventName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(event => event.name !== eventName);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

// Función para simular la compra de los eventos en el carrito
function checkout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
      Swal.fire({
          icon: 'warning',
          title: 'Carrito vacío',
          text: 'No hay eventos en el carrito.',
      });
      return;
  }

  Swal.fire({
      icon: 'success',
      title: '¡Inscripción realizada con éxito!',
      text: 'Gracias por participar.',
      confirmButtonText: 'Cerrar'
  });

  localStorage.removeItem('cart');
  updateCartCount();
  displayCartItems();
}


// Llamada inicial para mostrar el contador actualizado al cargar la página
document.addEventListener("DOMContentLoaded", updateCartCount);


