import $ from "jquery";
import  is from "is_js"
import Swiper from "swiper/dist/js/swiper.js";
import "./stock-sliders.js";
import "selectize/dist/js/selectize.min.js";

import "./tabs.js";

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
		
	
	  
	let swiper = new Swiper(".main-slider .swiper-container", {

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

	let swiperFranshizaProduct = new Swiper(".franshiza-product__slider .swiper-container", {
		// effect: "fade",
		slidesPerView: 3,
		loop: true,
		roundLengths: true,
		spaceBetween: 3,
		// freeMode: true,
		a11y: false,
	    breakpoints: {
		    320: {
		      slidesPerView: 1,
		      spaceBetween: 0
		    },
		    660: {
		      slidesPerView: 1,
		      spaceBetween: 3
		    },
		    1200: {
		      slidesPerView: 2,
		      spaceBetween: 3
		    }
		  },
		
		navigation: {
	        nextEl: '.franshiza-product__arrow .swiper-button-next',
	        prevEl: '.franshiza-product__arrow .swiper-button-prev',
	      },

	});

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

	// if ($(".main-sliders__title-wrapper").length){

	//     $(".main-sliders__title-wrapper").prepend('<span class="sort-new__label"></span>')

	//     $(".sort-new__label").css({
	//         width: $(".main-sliders__title.active + div").outerWidth(),
	//         left: $(".main-sliders__title.active + div").position().left,
	//     })

	//     $(".main-sliders__title-wrapper").addClass("js__have-label")

	//     $(".main-sliders__title").addClass("js__visible")

	//     $(".main-sliders__title").css({
	//         width: $(".main-sliders__title.active + div").outerWidth(),
	//         left: $(".main-sliders__title.active + div").position().left,
	//     })

	// }
	


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



	


	$('.reviews__item .btn').click(function(){
		let $this = $(this);
		$this.closest('.reviews__item').toggleClass('js__reviews-open');
	})

	$('.reviews__item').each((i,el) => {
		let $this = $(el);

		let itemHeight = $this.find('.reviews__item-text').height();

		console.log(itemHeight);
		if(itemHeight < 150){
			$this.find('.btn').remove();
		}
	})




	$('body').on('click', '.account-testemonials__item--right .btn', function() {
		let $this = $(this);

		$this.closest('.account-testemonials__item').toggleClass('js__open-text');
		$this.closest('.account-testemonials__item').find('.answer').slideToggle();

	})


	// $(window).on("load scroll touchmove", function(){
	// 	if ($(window).scrollTop() > 800){
	// 		$(".scroll-top").fadeIn(300);
	// 	}else{
	// 		$(".scroll-top").fadeOut(300);
	// 	};

	// 	if($(window).width() > 1000) {

	// 		if($(window).scrollTop() > 10){
	// 				$('.inner .head').addClass('js__scroll');
	// 			}else {
	// 				$('.inner .head').removeClass('js__scroll');
	// 			}
	// 	}

		
	// });

	$('.submenu').each((i,el) => {
		let $this = $(el);

		$this.closest('.head__menu-item').addClass('js__has-submenu');
	})



	if ($(".statistic__num").length){
		$(".statistic__num").countTo();
	}

	$(window).on('scroll', function(){
		if ($(".statistic__num").length)
			if ($(".statistic__num").offset().top + 50 <=
				$(window).scrollTop() + $(window).height()){
					$(".statistic__num:not(.countered)").each((i, el) => {
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




	$("body").on("click change", ".btn-clear", function(){
		$(this).prevAll('input[type="text"]').val("");
		
	});

	// if(!is.touchDevice())
	





	function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				if($('div').hasClass('intro-bg__text')){
					// inject += '<span class="'+klass+'" \
					// style="transition-delay: '+(0.12 * i)+'s; transform: translate3d(0, '+(0.30 * i)+'%, 0);">'+item+'</span>'+after;
					inject += '<span class="'+klass+(i+1)+'" \
					style="transition-delay: '+(0.05 * i)+'s; transform: translate3d(0, '+(15.30 * i)+'%, 0);">'+item+'</span>'+after;
				} 
	
				// let deleayCounter = a.length - i;
				// inject += '<span class="'+klass+(i+1)+'" \
				// style="transition-delay: '+(0.12 * deleayCounter)+'s; transform: translate3d('+(0.30 * i)+'%, 0, 0);">'+item+'</span>'+after;

			});	
			t.empty().append(inject);
		}
	}
	
	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},
		
		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};


	 $(".intro-bg__text").lettering();
	 // $(".error-bg__text").lettering();



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





