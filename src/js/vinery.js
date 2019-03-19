import {TweenLite} from "gsap/TweenMax"

const parallax = (element, resistance, mouse) => {
	TweenLite.to(element, 0.2, 
	{
		x : -(( mouse.clientX - (window.innerWidth/2) ) / resistance )
		
	});
};

document.addEventListener("mousemove", e => {
	if (document.querySelector(".vinery__svg"))
		parallax(document.querySelector(".vinery__svg"), 10, e)
})

document.addEventListener("DOMContentLoaded", e => {
	let clickPaths = document.querySelectorAll(".otkl"),
		closeBtn = document.querySelector(".otkl2"),
		sidePanel = document.querySelector(".fixedd"),
		paths = document.querySelectorAll("g.sauvignon, g.muscatWhite, g.aligote, g.plat, g.pinotBlanc, g.citrus, g.moldova, g.augustin, g.firstBorn, g.cardinalis, g.saperavi, g.risus, g.clairette, g.redGold, g.cimBlack, g.pinotNoir, g.bianca, g.hopeAzos, g.cabernetSauvignon, g.merlot, g.chardonnay");

	if (paths.length)
		for (var path of paths)
			path.addEventListener("mouseover", function(){
				let self = this,
					title = document.querySelector(".vinery__title");

				if (title.innerText == self.querySelector(".bluurspan h2").innerText)
					return

				TweenLite.to(title, .2, {
					opacity: 0,
					onComplete(){
						title.innerText = self.querySelector(".bluurspan h2").innerText

						TweenLite.to(title, .2, {
							opacity: 1
						})
					}
				})
			})

	if (!clickPaths.length || !closeBtn || !sidePanel)
		return

	for (var path of clickPaths)
		path.addEventListener("click", function() {
			document.querySelector(".vino").innerHTML = this.querySelector(".bluurspan").innerHTML
			sidePanel.classList.add("fixedd2")
		})

	closeBtn.addEventListener("click", e => {
		sidePanel.classList.remove("fixedd2")
	})
})