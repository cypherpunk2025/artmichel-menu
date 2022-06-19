// * Art Michel Software Developer Services 2022
// *
// *
// Constantes Buscador versión Escritorio
const botonBusqueda = document.querySelector("nav .navegacion-escritorio .enlace-buscador");
const botonCerrar = document.querySelector(".contenedor-buscador .enlace-cerrar");
const navegacionEscritorio = document.querySelector(".navegacion-escritorio");
const contenedorBusqueda = document.querySelector(".contenedor-buscador");
const cubrir = document.querySelector(".cubrir");

// Al hacer click sobre el boton de busqueda, muestra el menu de busqueda y oculta el menu principal
botonBusqueda.addEventListener("click", () => {
    navegacionEscritorio.classList.add("hide");
    contenedorBusqueda.classList.remove("hide");
    cubrir.classList.add("show");
})

// Al hacer click sobre el boton cerrar, oculta el menu de busqueda y muestra el menu principal
botonCerrar.addEventListener("click", () => {
    navegacionEscritorio.classList.remove("hide");
    contenedorBusqueda.classList.add("hide");
    cubrir.classList.remove("show");
})

// Al hacer click sobre espacio vacio, oculta el menu de busqueda y muestra el menu principal
cubrir.addEventListener("click", () => {
    navegacionEscritorio.classList.remove("hide");
    contenedorBusqueda.classList.add("hide");
    cubrir.classList.remove("show");
})

// Constantes Menu despegable versión Movil
const contenedorMenuIcono = document.querySelector("nav .contenedor-menu-icono");
const contenedorNavegacion = document.querySelector(".contenedor-navegacion");
const contenedorNavegacionNav = document.querySelector(".contenedor-navegacion nav");
const contenedorEscritorio = document.querySelector(".navegacion-escritorio");
const noScroll = document.querySelector(".noscroll");

// Al hacer click sobre el boton de menu, activa o dessactiva la clase para mostrar el contenedor de menu movil.
contenedorMenuIcono.addEventListener("click", () => {
    contenedorNavegacion.classList.toggle("active");
    contenedorNavegacionNav.classList.toggle("active");
    contenedorEscritorio.classList.toggle("active");
    noScroll.classList.toggle("active");
})

// Constantes Buscador versión Movil
const barraBuscador = document.querySelector(".mobile-contenedor-buscador .barra-buscador");
const navegacion = document.querySelector(".contenedor-navegacion nav");
const entradaBusqueda = document.querySelector(".mobile-contenedor-buscador input");
const botonCancelar = document.querySelector(".mobile-contenedor-buscador .boton-cancelar");

// Al hacer click sobre el formulario de busqueda, despliega un segundo menu para mostrar busquedas rapidas
entradaBusqueda.addEventListener("click", () => {
    barraBuscador.classList.add("active");
    navegacion.classList.add("move-up");
    navegacionEscritorio.classList.add("move-down");
})

// Al hacer click sobre el boton Cancelar, desactiva el segundo menu y regresa al menu principal
botonCancelar.addEventListener("click", () => {
    barraBuscador.classList.remove("active");
    navegacion.classList.remove("move-up");
    navegacionEscritorio.classList.remove("move-down");
})

// Al redimenzionar la ventana, remueve el menu desplegable, el menu de busqueda en ambas versiones
window.addEventListener("resize", () => {
    contenedorNavegacion.classList.remove("active");
    contenedorEscritorio.classList.remove("active");
    noScroll.classList.remove("active");
    navegacionEscritorio.classList.remove("hide");
    contenedorBusqueda.classList.add("hide");
    cubrir.classList.remove("show");
    barraBuscador.classList.remove("active");
    navegacion.classList.remove("move-up");
    navegacionEscritorio.classList.remove("move-down");
})

//
//
//
//
/**
 * Lista de nodos para cada polirelleno para IE
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
 */
 if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

/**
 * Evento personalizado polirelleno para >= IE9
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
(function () {
	if (typeof window.CustomEvent === "function") return false;

	function CustomEvent(event, params) {
		params = params || { bubbles: false, cancelable: false, detail: null };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	window.CustomEvent = CustomEvent;
})();

(function ($) {
	// La versión gratuita solo admite 1 video por página/publicación.
	var popup = document.querySelector('.contenedor-emergente-video');
	var speed = 200;

	function init() {
		if (!popup) return;
		setupOpenActions();
		setupVideoHeight();
		setupCloseActions();
	}

	function setupOpenActions() {
		// Disparador de configuración para ventana emergente única.
		setupOpenTriggers('.video-emergente');

		// Disparador de configuración para ventana emergente única (soporte de compatibilidad con versiones anteriores).
		setupOpenTriggers('.ryv-popup');
	}

	function setupOpenTriggers(triggerSelector) {
		var triggers = document.querySelectorAll(triggerSelector);
		if (!triggers) return;

		triggers.forEach(function (trigger) {
			trigger.addEventListener('click', function (e) {
				e.preventDefault();
				openPopup();
			});
		});
	}

	function setupCloseActions() {
		// Cerrar al hacer clic.
		popup.addEventListener('click', function (e) {
			if (e.target == this || e.target.classList.contains('contenedor-emergente-video-cierre')) closePopup();
		});

		// Cerrar al escapar.
		document.addEventListener('keyup', function (e) {
			if (e.key !== 'Escape' && e.key !== 'Esc' && e.keyCode !== 27) return;
			if ($(popup).is(':visible')) closePopup();
		});
	}

	function setupVideoHeight() {
		window.addEventListener('resize', function () {
			var video = document.querySelector('.video-emergente-video.es-redimensionable');
			if (video) $(video).height($(video).width() * 0.5625);
		});
	}

	function openPopup() {
		var video = popup.querySelector('.video-emergente-video');

		document.body.insertBefore(popup, document.body.firstChild);

		$(popup).css({ display: 'flex' }).stop().animate({
			opacity: 1
		}, speed);

		$(video).stop().fadeIn(speed);
		video.src = video.dataset.wpVideoPopupUrl;

		window.dispatchEvent(new Event('resize'));
	}

	function closePopup() {
		var video = popup.querySelector('.video-emergente-video');

		$(popup).stop().animate({
			opacity: 0
		}, speed, function () {
			$(popup).css({ display: 'none' });
		});

		$(video).stop().fadeOut(speed, function () {
			video.src = '';
		});
	}

	init();
})(jQuery);