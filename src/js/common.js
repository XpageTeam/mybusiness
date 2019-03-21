import $ from "jquery";
import  is from "is_js"
import Swiper from "swiper/dist/js/swiper.js";
import "./stock-sliders.js";
import "selectize/dist/js/selectize.min.js";

import "./tabs.js";
import "./accordion.js";

import "./standart-page.js"
import Sticky from "./x-widgets.js";

window.$ = $;
window.jQuery = $;
window.is = is;

// const WOW = require("wowjs").WOW;

require("./countTo.js");
require("./jquery.fancybox.js");
require("../css/jquery.fancybox.css");



document.addEventListener("DOMContentLoaded", e => {


	$("body").click(function(e){
		if (!$(e.target).is($(".mobile-menu"))
			&& !$(".mobile-menu").has(e.target).length
			&& $("body").hasClass("js__menu--open")
			&& !$(e.target).is($(".burger"))
			&& !$(".burger").has(e.target).length){
				$("body").removeClass("js__menu--open")
		}
	});
		
	
	  
	let swiperMainbanner = new Swiper(".main-slider .swiper-container", {

		effect: "fade",
		slidesPerView: 1,
		loop: true,
		roundLengths: true,
		autoplay: true,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
			clickable: true
		},
		navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	});

	let swiperPartners = new Swiper(".partners .swiper-container", {
		slidesPerView: 3,
		loop: true,
		roundLengths: true,
		autoplay: true,
		spaceBetween: 40,
		navigation: {
	        nextEl: '.partners .swiper-button-next',
	        prevEl: '.partners .swiper-button-prev',
	      },
	});

	let swiperStorySuccess = new Swiper(".story-success .swiper-container", {
		slidesPerView: 1,
		loop: true,
		roundLengths: true,
		autoplay: true,
		navigation: {
	        nextEl: '.story-success .swiper-button-next',
	        prevEl: '.story-success .swiper-button-prev',
	      },
	});


	$('.story-success__btn').click(function(){
		let $this = $(this);

		$this.closest('.story-success__slide').find('.text-page > span:not(:first-child)').slideToggle();

	})


	if ($(".support-stat__item-num").length){
		$(".support-stat__item-num").countTo();
	}

	$(window).on('scroll', function(){
		if ($(".support-stat__item-num").length)
			if ($(".support-stat__item-num").offset().top + 50 <=
				$(window).scrollTop() + $(window).height()){
					$(".support-stat__item-num:not(.countered)").each((i, el) => {
						let $this = $(el),
							speed = 0;

						switch (i){
							case 0:
								speed = 4000;
							break;
							case 1:
								speed = 2000;
							break;

							default:
								speed = 3000;
						}

						$this.countTo({
							speed: speed,
						});

						$this.addClass("countered");
					});
			}

	})


	$('.task__item-top').click(function(){

		var $this = $(this);

		$('.task__item-top').removeClass('js__animate');

		if ($this.next('.task__item-bot').hasClass("js__open")){
			$('.task__item-bot').slideUp(300).removeClass('js__open');
		}else{
			$('.task__item-bot').slideUp(300).removeClass('js__open');
			$this.next('.task__item-bot').slideDown(300).addClass('js__open');
			$this.addClass('js__animate');
		}

		setTimeout(function(){
			$('html,body').animate({
				scrollTop: $('.task__item-top.js__animate').offset().top}, 1000);
		}, 300)


	})

	
	$('.history-item__btn').click(function(){
		let $this = $(this);

		$this.closest('.history-item').toggleClass('js__open');
		$this.closest('.history-item').find('.history-item__text-continuation').slideToggle();


	})

	


	$('.burger').click(function(){
		$('body').toggleClass("js__menu--open");
	});

	$('.head-menu__item').find('ul').closest('li').addClass('js__has-submenu');


	if($('body').hasClass('page-personal')){



		var list = document.querySelector('#filial__list');

		if(list){
			window.observer = new MutationObserver(function(mutations) {
			    mutations.forEach(function(mutation) {
			     let input = mutation.addedNodes[0].querySelector(".forms-input-cont--file:first-child:nth-last-child(2) .forms__input--file");

			     console.log(mutation, input)

			     if (input)
			     	input.addEventListener("change", InputFileChange);
			    });
			});
			  
			observer.observe(list, {
			  	attributes: false, 
			  	childList: true, 
			  	characterData: false
			})
		  	
		}

		$("body").on("change", ".forms__input--file", function(e){

			var value = $(this)[0].files[0].name;
			// console.log(value);
			var inputHasFile = $(this).next('input[type="text"]').val(value);

			if(inputHasFile.length){
				$(this).nextAll('label').remove();
				// $(this).nextAll(".js__input-del").addClass('close-input');
			}

		});


		$("body").on("click", ".filial__item-el .add-input", function(){

			var time = +new Date(),
				$this = $(this),
				getName = $(this).closest('.forms__input-cont--multiple').find('.forms__input-cont:first-child input').attr("name");


			var inputBlock = $this.closest(".forms__input-cont--multiple").append('<div class="forms__input-cont">\
					<input type="text" id="'+time+'" name="'+getName+'"  class="forms__input">\
					<span class="js__input-del" title="Удалить"></span>\
				</div>');

		});



		$("body").on("click", ".filial__item-el--photo .add-input", function(){

			var time = +new Date();
			var $this = $(this);
			var getName = $(this).closest('.forms__input-cont--multiple').find('.forms__input-cont:first-child input').attr("name");


			var inputBlock = $this.closest(".forms__input-cont--multiple").append('<div class="forms__input-cont forms-input-cont--file">\
					<input class="forms__input forms__input--file" name="'+getName+'" type="file" id="'+time+'" accept="image">\
					<input class="forms__input forms__input--file-support" readonly="" type="text">\
					<label class="forms__label--file" for="'+time+'"></label>\
					<span class="js__input-del" title="Удалить"></span>\
				</div>');

			let newInput = inputBlock.find(".forms-input-cont--file:last-child input[type='file']")[0]

			newInput.addEventListener("change", InputFileChange);

		});



		window.InputFileChange = function () {
		  if (this.files[0]) {

		    var fr = new FileReader(),
		    	$shopBlock = $(this).closest("div[data-id]");

		    console.log($shopBlock)

		    fr.addEventListener("load", e => {
				let $photos = $shopBlock.find('.filial-load-photo');

	    		$photos.append("<img src='"+fr.result+"' />")
		    }, false);

		    fr.readAsDataURL(this.files[0]);
		  }
		};


		if($(".filial__item-el--photo input[type='file']").length)
			document.querySelector(".filial__item-el--photo input[type='file']").addEventListener("change", InputFileChange);



			$("body").on("click", ".filial__item-el--photo .input-del", function(){
				let $this = $(this).closest(".forms-input-cont--file"),
					$cont = $(this).closest(".filial__item-el--photo"),
					index = $this.index();

				console.log(index, $this)
				console.log($cont)

				$cont.nextAll(".filial-load-photo").find("img:eq("+index+")").remove()
			})



		$("body").on("click", ".js__input-del, .input-del", function(){
			var $this = $(this);
			$this.closest('.forms__input-cont').remove();
			
		})



	};






	$('.submenu').each((i,el) => {
		let $this = $(el);

		$this.closest('.head__menu-item').addClass('js__has-submenu');
	})








	$("body").on("click change", ".btn-clear", function(){
		$(this).prevAll('input[type="text"]').val("");
		
	});


	




	$(".fancybox").fancybox({
		trapFocus: false,
		touch: false,
		buttons: ["fullscreen", "slideShow", "close"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
	});



	if($(window).width() <= 1000) {


        $('.head-menu__item.js__has-submenu').each(function(i,el){
            var $this = $(el),
            	setCloneLink = $this.find('ul').prev('a').clone();

            console.log(setCloneLink)

            $this.find('ul').prepend('<li class="head-menu__item js__link-parent"></li>');
            $this.find('.js__link-parent').prepend(setCloneLink);
            $this.find('ul').prepend('<div class="head-menu__item js__back">Назад</div>');

        })

        $('.head-menu__item.js__has-submenu > a').removeAttr('href');
        $('.head-menu__item.js__has-submenu > a').click(function(){
            var $this = $(this);
            $this.closest('body').addClass('js__submenu--open');

	        })

	        $('.js__back').click(function(){
	            var $this = $(this);
	            $this.closest('body').removeClass('js__submenu--open');
	        })

	    }

	    if($(window).width() <= 667){

	    	$('.vino-mobile .item').each(function(i,el){
	    		let $this = $(el);

	    		$this.find('.text-page p').closest('.item').addClass('js__has-content')
	    	})

	    	
	    	$('.vino-title').click(function(){
	    		let $this = $(this);

	    		$this.toggleClass('js__open');
	    		$this.next('.vino-content').slideToggle();
	    	})
	    }

	$("body").on("click", ".scroll-top", function(){
        var scrollTop = $(window).scrollTop();
        $("html, body").animate({"scrollTop": 0}, "slow")
    });



	selectizeInit();

});

window.selectizeInit = function() {
	// if (is.touchDevice()){
		if($(window).width() > 1000){
		    $('select').each(function(i,el){
		        let $this = $(el);

		        $this.selectize({
		            create: true,
		            // sortField: 'text'
		        });

		    })
			
		}

		
	// }
    
}


$(window).on("load scroll resize touchmove", e => {
	// if ($(window).scrollTop() > 800){
	// 	$(".scroll-top").fadeIn(300);
	// }else{
	// 	$(".scroll-top").fadeOut(300);
	// };



	if($(window).scrollTop() > 100){

		setTimeout(e => {
			$('.history__intro').remove();
			$('body').addClass('js__history-animate');
		}, 200);


	}

	if ($(window).scrollTop() > 800){
		$(".scroll-top").fadeIn(300);
		$(".scroll-top").css({
			'display': 'flex',
		})

	}else{
		$(".scroll-top").fadeOut(300);
		$(".scroll-top").removeClass('js__scrolled');
	};



	// if($(window).width() > 660 && $('body').hasClass('main')){

	// 	if ($(window).scrollTop() >= 250){
	// 		$(".head").addClass("js__scrolled");
	// 		$("body").addClass("js__scroll");
			
	// 		setTimeout(e => {
	// 			$(".head").addClass("js__show")
	// 		}, 200);

	// 	} else {
	// 		$(".head").removeClass("js__scrolled").removeClass("js__show");
	// 		$("body").removeClass("js__scroll");

	// 	}
		
	// } else if($('body').hasClass('main')) {

	// 	if($('body').hasClass('js__menu--open')){
	// 		return false
	// 	}

	// 	if ($(window).scrollTop() <= 0){
	// 		$(".head").removeClass("js__scrolled").removeClass("js__show");
	// 		$("body").removeClass("js__scroll");

	// 	} else {
	// 		$(".head").addClass("js__scrolled");
	// 		$("body").addClass("js__scroll");
			
	// 		setTimeout(e => {
	// 			$(".head").addClass("js__show")
	// 		}, 200);

	// 	}

	// }



	
});






