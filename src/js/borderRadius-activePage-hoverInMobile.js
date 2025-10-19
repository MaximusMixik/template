// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, menuClose } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


function borderRadiusFunction() {
	const galleryItems = document.querySelectorAll('.solution-item');
	if (!galleryItems.length) return;

	const resetCorners = () => {
		galleryItems.forEach(item => {
			item.style.borderRadius = '0';
		});
	};

	const applyCorners = () => {
		resetCorners();

		const totalItems = galleryItems.length;
		// Определяем количество колонок в зависимости от ширины экрана
		const columns = window.innerWidth > 992 ? 3 : window.innerWidth > 700 ? 2 : 1;


		const rows = Math.ceil(totalItems / columns);
		const borderRadius = '12px'
		galleryItems.forEach((item, index) => {
			const currentRow = Math.floor(index / columns) + 1;
			const currentCol = (index % columns) + 1;

			// console.log(currentRow, currentCol)

			// убираем правую границу, если НЕ последняя колонка
			if (currentCol !== columns) {
				item.style.borderRight = 'none';
			}

			// убираем нижнюю границу, если НЕ последний ряд
			if (currentRow !== rows) {
				item.style.borderBottom = 'none';
			}


			// Первый элемент (верхний левый)
			if (index === 0) {
				item.style.borderTopLeftRadius = borderRadius;
			}

			// Последний элемент в первом ряду (верхний правый)
			if (currentRow === 1 && currentCol === columns) {
				item.style.borderTopRightRadius = borderRadius;
			}

			// Первый элемент в последнем ряду (нижний левый)
			if (currentRow === rows && currentCol === 1) {
				item.style.borderBottomLeftRadius = borderRadius;
			}
			// Последний элемент в последнем ряду (нижний правый)
			if (currentRow === rows && currentCol === columns) {
				item.style.borderBottomRightRadius = borderRadius;
			}
		});
	};

	// Применяем углы при загрузке
	applyCorners();

	// Добавляем обработчик изменения размера окна
	let resizeTimeout;
	window.addEventListener('resize', () => {
		// Используем debounce для оптимизации
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(applyCorners, 100);
	});
}

// function activePageLink() {
// 	// Все ссылки меню
// 	// if (menuLinks.length === 0) return

// 	// Получаем текущий путь (только имя файла, без папок и параметров)
// 	let currentPage = window.location.pathname.split("/").pop();

// 	// Если пусто (например index.html), можно указать дефолт
// 	if (currentPage === "" || currentPage === "/") {
// 		currentPage = "home.html";
// 	}
// 	const menuLinks = document.querySelectorAll(".menu__link");

// 	menuLinks.forEach(link => {
// 		let linkPage = link.getAttribute("href")[0]; //.split("#") убираем якорь (#)
// 		if (linkPage === currentPage) {
// 			link.classList.add("active"); // подсветка
// 		}
// 	});
// }

function initSolutionsHover() {
	const cards = document.querySelectorAll('.item-solution, .solution-item');

	if (!cards.length) return;

	// проверяем, что устройство с тачскрином
	const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

	if (!isTouch) return; // на десктопах оставляем hover

	cards.forEach(card => {
		card.addEventListener('touchstart', e => {
			// убираем активный класс со всех
			cards.forEach(c => c.classList.remove('is-active'));

			// добавляем на текущий
			card.classList.add('is-active');
		});
	});
}

function closeMenuAfterClick() {
	const links = document.querySelectorAll('.menu__link ')

	if (!links) return

	links.forEach(link => {
		link.addEventListener('click', () => {
			menuClose()
		})
	})
}


window.onload = () => {
	borderRadiusFunction()

	initSolutionsHover();

	closeMenuAfterClick()

}
document.addEventListener('DOMContentLoaded', () => {
	let currentPage = window.location.pathname.split('/').pop();

	// Если пусто (например /), задаём дефолт
	if (!currentPage) {
		currentPage = 'home.html';
	}

	const menuLinks = document.querySelectorAll('.menu__link, .menu__pages-link');

	menuLinks.forEach(link => {
		let href = link.getAttribute('href') || '';

		// пропускаем все ссылки с #
		if (href.includes('#')) return;

		// убираем параметры
		let linkPage = href.split('?')[0].split('/').pop();

		if (linkPage === currentPage) {
			link.classList.add('active');
			link.closest('.menu__item')?.classList.add('active');
		}
	});
});
