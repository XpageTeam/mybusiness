import $ from "jquery";

$(_ => {
	$(".accordion__item-top").click(function(){
		let $this = $(this);
		$this.closest('.accordion__item').toggleClass('js__open');
		$this.nextAll('.accordion__item-bot').slideToggle();
	});

	$(".accordion__item:first-child").addClass('js__open');

	if($(".accordion__item:first-child").length){
		$('.accordion__item:first-child').find('.accordion__item-bot').slideToggle();
	}

});