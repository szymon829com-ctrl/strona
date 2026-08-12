document.addEventListener('DOMContentLoaded', () => {
    // Pobranie elementów modalu
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('closeAuthBtn');
    
    // Formularze
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotForm = document.getElementById('forgotForm');
    const verifyForm = document.getElementById('verifyForm');
    
    // Elementy nagłówka i stopki
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const footerText = document.getElementById('footerText');
    const switchAuthBtn = document.getElementById('switchAuthBtn');
    const showForgotBtn = document.getElementById('showForgot');

    // Zakładki i logowanie społecznościowe
    const authTabs = document.getElementById('authTabs');
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');
    const socialGroup = document.getElementById('socialGroup');
    const orSeparator = document.getElementById('orSeparator');
    const modalFooter = document.querySelector('.modal-footer');

    // Przyciski otwierające z poziomu strony
    const openLoginBtn = document.getElementById('openLoginBtn');
    const openRegisterNav = document.getElementById('openRegisterBtnNav');
    const openRegisterHero = document.getElementById('openRegisterBtnHero');
    const openLoginCard = document.getElementById('openLoginBtnCard');

    let currentTab = 'login';
    let registeredEmail = ''; // Zmienna przechowująca e-mail do weryfikacji

    // Funkcja do przełączania widoków
    function switchTab(tab) {
        currentTab = tab;

        // 1. Ukryj wszystkie formularze
        if (loginForm) loginForm.classList.remove('active');
        if (registerForm) registerForm.classList.remove('active');
        if (forgotForm) forgotForm.classList.remove('active');
        if (verifyForm) verifyForm.classList.remove('active');

        // 2. Odznacz aktywne zakładki u góry
        if (tabLoginBtn) tabLoginBtn.classList.remove('active');
        if (tabRegisterBtn) tabRegisterBtn.classList.remove('active');

        // 3. Przywróć domyślną widoczność zakładek, stopki i przycisków społecznościowych
        if (authTabs) authTabs.style.display = 'grid';
        if (socialGroup) socialGroup.style.display = 'grid';
        if (orSeparator) orSeparator.style.display = 'block';
        if (modalFooter) modalFooter.style.display = 'block';

        // 4. Ustaw odpowiedni stan
        if (tab === 'login') {
            if (loginForm) loginForm.classList.add('active');
            if (tabLoginBtn) tabLoginBtn.classList.add('active');
            modalTitle.innerHTML = 'Zaloguj się do <span>CraftShop</span>';
            modalSubtitle.textContent = 'Wpisz dane dostępowe do swojego konta';
            footerText.textContent = 'Nie masz jeszcze konta?';
            switchAuthBtn.textContent = 'Zarejestruj się';

        } else if (tab === 'register') {
            if (registerForm) registerForm.classList.add('active');
            if (tabRegisterBtn) tabRegisterBtn.classList.add('active');
            modalTitle.innerHTML = 'Dołącz do <span>CraftShop</span>';
            modalSubtitle.textContent = 'Zarejestruj się i stwórz sklep w 2 minuty';
            footerText.textContent = 'Masz już konto?';
            switchAuthBtn.textContent = 'Zaloguj się';

        } else if (tab === 'forgot') {
            if (forgotForm) forgotForm.classList.add('active');
            modalTitle.innerHTML = 'Resetowanie <span>Hasła</span>';
            modalSubtitle.textContent = 'Wprowadź e-mail powiązany z kontem';
            footerText.textContent = 'Pamiętasz hasło?';
            switchAuthBtn.textContent = 'Wróć do logowania';

            if (authTabs) authTabs.style.display = 'none';
            if (socialGroup) socialGroup.style.display = 'none';
            if (orSeparator) orSeparator.style.display = 'none';
        }
        else if (tab === 'verify') {
            if (verifyForm) verifyForm.classList.add('active');
            modalTitle.innerHTML = 'Potwierdź <span>e-mail</span>';
            modalSubtitle.textContent = 'Weryfikacja adresu e-mail';
            if (authTabs) authTabs.style.display = 'none';
            if (socialGroup) socialGroup.style.display = 'none';
            if (orSeparator) orSeparator.style.display = 'none';
            if (modalFooter) modalFooter.style.display = 'none';
        }
    }

    // Otwieranie i zamykanie modalu
    const openModal = (tab = 'login') => {
        switchTab(tab);
        modal.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    if (openLoginBtn) openLoginBtn.addEventListener('click', () => openModal('login'));
    if (openLoginCard) openLoginCard.addEventListener('click', () => openModal('login'));
    if (openRegisterNav) openRegisterNav.addEventListener('click', () => openModal('register'));
    if (openRegisterHero) openRegisterHero.addEventListener('click', () => openModal('register'));

    if (tabLoginBtn) tabLoginBtn.addEventListener('click', () => switchTab('login'));
    if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', () => switchTab('register'));

    if (switchAuthBtn) {
        switchAuthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentTab === 'login') switchTab('register');
            else switchTab('login');
        });
    }

    if (showForgotBtn) {
        showForgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('forgot');
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // POMOCNICZA FUNKCJA WALIDACJI PUSTYCH PÓL
    // ==========================================================================
    function validateFormInputs(form) {
        let formIsValid = true;
        const inputs = form.querySelectorAll('input');

        inputs.forEach(input => {
            const fieldContainer = input.closest('.input-field');

            if (!input.value.trim()) {
                if (fieldContainer) fieldContainer.classList.add('error');
                formIsValid = false;
            } else {
                if (fieldContainer) fieldContainer.classList.remove('error');
            }

            input.oninput = () => {
                if (input.value.trim() && fieldContainer) {
                    fieldContainer.classList.remove('error');
                }
            };
        });

        return formIsValid;
    }

    // ==========================================================================
    // OBSŁUGA POSZCZEGÓLNYCH FORMULARZY Z INTEGRACJĄ BACKENDU (NODE.JS)
    // ==========================================================================

    // 1. Logowanie
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateFormInputs(loginForm)) {
                window.location.href = '/strona/dashboard.html';
            }
        });
    }

    // 2. Rejestracja – wysyła dane do lokalnego serwera Node.js i uruchamia wysyłkę maila
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateFormInputs(registerForm)) {
                const nick = document.getElementById('registerNick').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;

                registeredEmail = email; // Zapamiętujemy e-mail do kroku weryfikacji

                fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, nick, password })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        switchTab('verify'); // Przechodzi do ekranu wpisywania kodu
                    } else {
                        alert(data.message || 'Wystąpił błąd podczas rejestracji.');
                    }
                })
                .catch(err => {
                    console.error('Błąd połączenia z serwerem:', err);
                    alert('Nie udało się połączyć z serwerem backendu (czy uruchomiłeś node server.js?).');
                });
            }
        });
    }

    // 3. Weryfikacja kodu e-mail – wysyła kod do sprawdzenia na serwer Node.js
    if (verifyForm) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const codeInput = document.getElementById('verificationCode');
            const fieldContainer = codeInput ? codeInput.closest('.input-field') : null;

            if (!codeInput || codeInput.value.trim().length < 6) {
                if (fieldContainer) fieldContainer.classList.add('error');
                return;
            }

            if (fieldContainer) fieldContainer.classList.remove('error');
            const code = codeInput.value.trim();

            fetch('http://localhost:3000/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: registeredEmail, code })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('Konto zostało pomyślnie zweryfikowane!');
                    window.location.href = '/strona/dashboard.html';
                } else {
                    if (fieldContainer) fieldContainer.classList.add('error');
                    alert(data.message || 'Niepoprawny kod weryfikacyjny.');
                }
            })
            .catch(err => {
                console.error('Błąd weryfikacji:', err);
                alert('Błąd połączenia z serwerem.');
            });
        });
    }

    // 4. Reset hasła
    if (forgotForm) {
        forgotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateFormInputs(forgotForm)) {
                alert('Link do resetu hasła został wysłany!');
                switchTab('login');
            }
        });
    }

    // Obsługa ponownego wysyłania kodu
    const resendBtn = document.getElementById('resendCodeBtn');
    if (resendBtn) {
        resendBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Nowy kod weryfikacyjny został wysłany na adres e-mail.');
        });
    }
});
