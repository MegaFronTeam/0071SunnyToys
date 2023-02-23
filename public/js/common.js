"use strict";

let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall() {
		const link = ".link-modal-js";
		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			keyboard: {
				CLOSE: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад"
				// PLAY_START: "Start slideshow",
				// PLAY_STOP: "Pause slideshow",
				// FULL_SCREEN: "Full screen",
				// THUMBS: "Thumbnails",
				// DOWNLOAD: "Download",
				// SHARE: "Share",
				// ZOOM: "Zoom"
			}
			// beforeLoad: function () {
			// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
			// },
			// afterClose: function () {
			// 	root.style.setProperty('--spacing-end', null);
			// },
		});

		// $(link).fancybox({
		// });

		$(".modal-close-js").click(function () {
			fancybox.close();
		});
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;
					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, {
			passive: true
		});
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}
	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let catalogTargetContainer = event.target.closest('.catalog-dropdown.active');
			if ((!container || link) && !catalogTargetContainer) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 1880px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick);
			} else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({
					scrollTop: destination - 80
				}, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;
function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}
	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}
	function whenResize() {
		setFixedNav();
	}
	window.addEventListener('scroll', () => {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', () => {
		whenResize();
	}, {
		passive: true
	});
	whenResize();

	//luckyoneJs
	let headerBlockSlider = new Swiper('.headerBlock-slider-js', {
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 20,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});

	//
	let sCategoriesNext = document.querySelector('.sCategories--js .swiper-button-next');
	let sCategoriesPrev = document.querySelector('.sCategories--js .swiper-button-prev');
	let sCategoriesSlider = new Swiper('.sCategories-slider-js', {
		//loop:true,
		slidesPerView: 'auto',
		spaceBetween: 24,
		slidesPerColumnFill: 'row',
		breakpoints: {
			1: {
				slidesPerView: "auto",
				slidesPerColumn: 1
			},
			575: {
				slidesPerColumn: 2,
				slidesPerView: 2
			},
			768: {
				slidesPerView: 3,
				slidesPerColumn: 2
			},
			1200: {
				slidesPerView: 4,
				slidesPerColumn: 2
			},
			1880: {
				slidesPerView: 6,
				slidesPerColumn: 2
			}
		},
		navigation: {
			nextEl: sCategoriesPrev,
			prevEl: sCategoriesNext
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});

	//
	let sProjectSliderBoxes = document.querySelectorAll('.sHit--js');
	for (let sliderBox of sProjectSliderBoxes) {
		let sHitSlider = new Swiper(sliderBox.querySelector('.sHit-slider-js'), {
			spaceBetween: 24,
			slidesPerView: 'auto',
			loop: true,
			navigation: {
				nextEl: sliderBox.querySelector('.swiper-button-next'),
				prevEl: sliderBox.querySelector('.swiper-button-prev')
			}
		});
	}

	//
	$('.set-curr-year-js').each(function () {
		this.innerHTML = new Date().getFullYear();
	});
	//
	let topNav = document.querySelector(".top-nav");
	function calcHeaderHeight() {
		document.documentElement.style.setProperty('--top-nav-h', "".concat(topNav.offsetHeight, "px"));
	}
	window.addEventListener('resize', calcHeaderHeight, {
		passive: true
	});
	window.addEventListener('scroll', calcHeaderHeight, {
		passive: true
	});
	calcHeaderHeight();

	//
	$('.f-dd-btn-js').click(function () {
		$(this).toggleClass('active');
		$(this).closest('.f-dd-items-js').toggleClass('active');
		$(this).closest('.f-dd-item-js').find('.f-dd-content-js').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	//
	$('.filter-btn-js').click(function () {
		$('body').toggleClass('fixed2');
		$('.c-filter--js').fadeToggle(function () {
			$(this).toggleClass('active');
		});
	});
	//
	$('.custom-select-js').select2({
		minimumResultsForSearch: Infinity
	});

	//end luckyoneJs

	let dublicatedSlidesImgs = document.querySelectorAll('.swiper-slide-duplicate .catalog-item__img');
	if (dublicatedSlidesImgs) {
		dublicatedSlidesImgs.forEach(dublicatedSlidesImg => {
			dublicatedSlidesImg.dataset.fancybox = '';
		});
	}
	let catalogBtns = document.querySelectorAll('.catalog-btn');
	let catalogDropdowns = document.querySelectorAll('.catalog-dropdown');
	if (catalogBtns) {
		for (const catalogBtn of catalogBtns) {
			catalogBtn.addEventListener('click', function (event) {
				// event.preventDefault();
				catalogBtn.classList.toggle('active');
				if (catalogDropdowns) {
					catalogDropdowns.forEach(catalogDropdown => catalogDropdown.classList.toggle('active'));
					// catalogDropdown.classList.toggle('active');
					document.addEventListener('mouseup', event => {
						let catalogContainer = event.target.closest('.catalog-dropdown.active .catalog-dropdown__wrap');
						let catalogTargetBtn = event.target.closest('.catalog-btn.active');
						let catalogTargetBackBtn = event.target.closest('.catalog-dropdown__back');
						if (!catalogContainer && !catalogTargetBtn || catalogTargetBackBtn) {
							catalogBtn.classList.remove('active');
							// catalogDropdown.classList.remove('active');
							catalogDropdowns.forEach(catalogDropdown => catalogDropdown.classList.remove('active'));
						}
					});
				}
				;
			});
		}
	}
	;
}
;
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}