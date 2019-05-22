import $ from "jquery";

window.$ = $;
window.jQuery = $;

document.addEventListener("DOMContentLoaded", e => {

	$('.submenu').each((i,el) => {
		let $this = $(el);

		console.log($this);
		$this.closest('.head-menu__item').addClass('js__has-submenu');
	})

	$(".a-fontsize a").click(function(){
		var $this = $(this);
		switch ($this.attr("class")){
			case "a-fontsize-small":
				Cookies.set("fontsize", "fontsize-small");
				$("html").removeClass("fontsize-big");
				$("html").removeClass("fontsize-normal");
				$("html").addClass("fontsize-small");

			break;
			case "a-fontsize-normal":
				Cookies.set("fontsize", "fontsize-normal");
				$("html").removeClass("fontsize-small");
				$("html").removeClass("fontsize-big");
				$("html").addClass("fontsize-normal");
			break;
			case "a-fontsize-big":
				Cookies.set("fontsize", "fontsize-big");
				$("html").removeClass("fontsize-small");
				$("html").removeClass("fontsize-normal");
				$("html").addClass("fontsize-big");
		}
		return false;
	});

	$(".a-colors a").click(function(){
		var $this = $(this);
		switch ($this.attr("class")){
			case "a-color1":
				Cookies.set("color", "color1");
				$("body").removeClass("color2");
				$("body").removeClass("color3");
				$("body").addClass("color1");

			break;
			case "a-color2":
				Cookies.set("color", "color2");
				$("body").removeClass("color1");
				$("body").removeClass("color3");
				$("body").addClass("color2");

			break;
			case "a-color3":
				Cookies.set("color", "color3");
				$("body").removeClass("color1");
				$("body").removeClass("color2");
				$("body").addClass("color3");
		}
		return false;
	});



	$(".access .special").click(function(){
		console.log(1);
		Cookies.remove("special", 1, { expires: -1 });
		location.reload();
	});

	$('.head-top .head-top__menu-item').each(function(i,el){
		var $this = $(el);

		$this.addClass('main-nav__item');


	})

	var menuItemLink = $('.head-top .head-top__menu-item').clone();


	$('.head-bot .head-top__menu-list').append('<div class="one-links"></div>')

	$('.head-bot .head-top__menu-list').append(menuItemLink);


	$('.head-top__menu-list .main-nav__item').each(function(i,el){
		var $this = $(el);

		var text = 'Галерея';

		if($this.find('.head-top__menu-link').text() == text){
			$this.remove();
		}

		$this.find('.sub-menu--wrap').closest('.main-nav__item').addClass('js__has-submenu');

		if(!$this.hasClass('js__has-submenu')){
			var link = $this.clone();

			$('.one-links').append(link)


		}
	})

	

})