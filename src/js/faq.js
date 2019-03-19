document.addEventListener("DOMContentLoaded", e => {
	let faqItems = document.querySelectorAll(".faq-item__title-cont");

	if (!faqItems.length)
		return

	for (var faqItem of faqItems)
		faqItem.addEventListener("click", function(){
			let parent = this.closest(".faq-item");

			if (!parent)
				return

			if (parent.classList.contains("js__opened"))
				parent.classList.remove("js__opened")
			else
				parent.classList.add("js__opened")
		})
})