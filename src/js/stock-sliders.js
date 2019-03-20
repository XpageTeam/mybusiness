import $ from "jquery";
import {Swiper, Navigation, Autoplay, Pagination} from "swiper/dist/js/swiper.esm.js";

Swiper.use([
	Navigation,
	Autoplay,
	Pagination,
]);

const autoplayToggle = _ => {
	$(".stock-slider:not(.active) .swiper-list")[0].swiper.autoplay.stop();
	$(".stock-slider.active .swiper-list")[0].swiper.autoplay.start();
}, slidersToggle = sliderId => {
	$(".stock-slider").removeClass("active");
	$(".stock-slider#"+sliderId).addClass("active");

	// autoplayToggle();
};

$(_ => {
	let sliders = document.querySelectorAll(".stock-slider .swiper-list");

	if (!sliders.length)
		return

	for (let slider of sliders){
		const sliderObject = slider.closest(".stock-slider");

		let slidesCount = 4,
			spaceBetween = 40;

		if (sliderObject.classList.contains("news")) {
			slidesCount = 2
		} else if (sliderObject.classList.contains("video")) {
			slidesCount = 3;
			spaceBetween = 40;
		} else if (sliderObject.classList.contains("history")) {
			slidesCount = 1
		} else if (sliderObject.classList.contains("events")) {
			slidesCount = 2
		}



		new Swiper(slider, {
			slidesPerView: slidesCount,
			spaceBetween: spaceBetween,
			loop: true,
			navigation: {
				prevEl: sliderObject.querySelector(".slick-prev"),
				nextEl: sliderObject.querySelector(".slick-next")
			},
			watchOverflow: true,
			autoplay: sliderObject.classList.contains("active"),
			breakpoints: {
				1100: {
					spaceBetween: 15
				},
				1000: {
					slidesPerView: 2,
					navigation: false,
					spaceBetween: 18,
					
				},
				660: {
					slidesPerView: 1,
					
				}
			}
		});
	}

	// autoplayToggle();

	$(".main-sliders__title").click(function(){
		let $this = $(this);

		if ($this.hasClass("active"))
			return

		let id = $this.data("id");

		$(".main-sliders__title").removeClass("active")
		$this.addClass("active");

		slidersToggle(id);
	});

	$(".sliders-switcher").click(e => {
		$(".main-sliders__title:not(.active)").trigger("click");
	});
});