window.matchMedia('(width >= 1024px)').addEventListener('change', evt => {
	document.querySelector('#header-links').toggleAttribute('popover', !evt.matches);
});