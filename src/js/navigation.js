export default class Navigation {
	constructor(options = {}) {
		// default settings
		this.settings = {
			// .menu__list 
			selector: 'a',
			headerOffset: 150,
			scrollDelay: 100,
			pageLoadDelay: 300,
			storageKey: 'scrollTo'
		};

		// add user settings
		this.settings = { ...this.settings, ...options };

		this.html = document.documentElement;
		this.init();
	}

	init() {
		this.setupMenuLinks();
		this.checkAndScrollToSavedElement();
	}

	setupMenuLinks() {
		const menuLinks = document.querySelectorAll(this.settings.selector);
		if (!menuLinks.length) return;

		menuLinks.forEach(link => {
			link.addEventListener('click', () => {
				const href = link.getAttribute('href');
				const anchor = href.split('#')[1];

				if (anchor) {
					sessionStorage.setItem(this.settings.storageKey, anchor);
				}

				this.closeBurgerMenu();
			});
		});
	}
	// close burger menu
	closeBurgerMenu() {
		this.html.classList.remove('menu-open');
		this.html.classList.remove('lock');
	}

	// go to block
	scrollToElement(elementId) {
		const targetElement = document.getElementById(elementId);

		if (targetElement) {
			setTimeout(() => {
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - this.settings.headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}, this.settings.scrollDelay);
		}
	}

	checkAndScrollToSavedElement() {
		const scrollTo = sessionStorage.getItem(this.settings.storageKey);

		if (scrollTo) {
			setTimeout(() => {
				this.scrollToElement(scrollTo);
				sessionStorage.removeItem(this.settings.storageKey);
			}, this.settings.pageLoadDelay);
		}
	}

	scrollTo(elementId, saveToStorage = false) {
		if (saveToStorage) {
			sessionStorage.setItem(this.settings.storageKey, elementId);
		}
		this.scrollToElement(elementId);
	}
}


// document.addEventListener('DOMContentLoaded', () => {
// 	new Navigation;
// });