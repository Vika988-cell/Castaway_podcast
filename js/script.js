document.addEventListener('DOMContentLoaded', function() {

	// ==========================================
	// 1. КОД ДЛЯ БУРГЕР-МЕНЮ
	// ==========================================
	const burgerBtn = document.querySelector('.header__burger');
	const closeBtn = document.querySelector('.mobile-menu__close');
	const mobileMenu = document.querySelector('.mobile-menu');

	burgerBtn.addEventListener('click', function() {
		mobileMenu.classList.add('is-open');
	});

	closeBtn.addEventListener('click', function() {
		mobileMenu.classList.remove('is-open');
	});


	// ==========================================
	// 2. КОД ДЛЯ ВАЛИДАЦИИ ФОРМЫ ПОДПИСКИ
	// ==========================================
	const form = document.getElementById('subscribeForm');
	const nameInput = document.getElementById('subscribeName');
	const emailInput = document.getElementById('subscribeEmail');
	const successMessage = document.getElementById('subscribeSuccess');

	// Если формы нет на этой конкретной странице, скрипт ниже не будет выполняться и не выдаст ошибку
	if (form) {
		// Функция валидации Email с помощью регулярного выражения
		const isValidEmail = (email) => {
			const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
			return regex.test(String(email).toLowerCase());
		};

		// Функция переключения видимости ошибок для полей
		const toggleError = (inputElement, show) => {
			const errorText = inputElement.nextElementSibling;
			if (show) {
				inputElement.classList.add('form-subscribe__input--error');
				if (errorText) errorText.style.display = 'block';
			} else {
				inputElement.classList.remove('form-subscribe__input--error');
				if (errorText) errorText.style.display = 'none';
			}
		};

		form.addEventListener('submit', function(event) {
			event.preventDefault(); // Запрещаем стандартную перезагрузку страницы

			let isFormValid = true;

			// Проверяем заполнение имени
			if (nameInput.value.trim() === '') {
				toggleError(nameInput, true);
				isFormValid = false;
			} else {
				toggleError(nameInput, false);
			}

			// Проверяем корректность почты
			if (!isValidEmail(emailInput.value.trim())) {
				toggleError(emailInput, true);
				isFormValid = false;
			} else {
				toggleError(emailInput, false);
			}

			// Если оба поля заполнены верно
			if (isFormValid) {
				form.style.display = 'none';       // Скрываем форму
				successMessage.style.display = 'block'; // Показываем сообщение благодарности

				console.log('Форма успешно отправлена!', {
					name: nameInput.value.trim(),
					email: emailInput.value.trim()
				});
			}
		});

		// Снимаем красную рамку ошибки, как только пользователь начинает заново вводить текст
		nameInput.addEventListener('input', () => toggleError(nameInput, false));
		emailInput.addEventListener('input', () => toggleError(emailInput, false));
	}

});
