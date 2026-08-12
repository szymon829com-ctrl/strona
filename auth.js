document.addEventListener('DOMContentLoaded', () => {
    // Elements DOM
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('closeAuthBtn');
    
    // Formularze
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotForm = document.getElementById('forgotForm');
    
    // Dynamiczne teksty i przyciski
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const footerText = document.getElementById('footerText');
    const switchAuthBtn = document.getElementById('switchAuthBtn');
    const showForgotBtn = document.getElementById('showForgot');

    // Przyciski otwierające modal
    const openLoginBtn = document.getElementById('openLoginBtn');
    const openRegisterNav = document.getElementById('openRegisterBtnNav');
    const openRegisterHero = document.getElementById('openRegisterBtnHero');
    const openLoginCard = document.getElementById('openLoginBtnCard');

    let currentTab = 'login';

    // Funkcja do przełączania widoków (Logowanie / Rejestracja / Forgot)
    function switchTab(tab) {
        currentTab = tab;

        // Ukryj wszystkie formularze
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
        forgotForm.classList.remove('active');

        // Zmień widok na podstawie wybranej zakładki
        if (tab === 'login') {
            loginForm.classList.add('active');
            modalTitle.innerHTML = 'Zaloguj się do <span>CraftShop</span>';
            modalSubtitle.textContent = 'Wpisz dane dostępowe do swojego konta';
            footerText.textContent = 'Nie masz jeszcze konta?';
            switchAuthBtn.textContent = 'Zarejestruj się';
        } else if (tab === 'register') {
            registerForm.classList.add('active');
            modalTitle.innerHTML = 'Dołącz do <span>CraftShop</span>';
            modalSubtitle.textContent = 'Zarejestruj się i stwórz sklep w 2 minuty';
            footerText.textContent = 'Masz już konto?';
            switchAuthBtn.textContent = 'Zaloguj się';
        } else if (tab === 'forgot') {
            forgotForm.classList.add('active');
            modalTitle.innerHTML = 'Resetowanie <span>Hasła</span>';
            modalSubtitle.textContent = 'Wprowadź e-mail powiązany z kontem';
            footerText.textContent = 'Pamiętasz hasło?';
            switchAuthBtn.textContent = 'Wróć do logowania';
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

    // Event Listenery - otwieranie
    if (openLoginBtn) openLoginBtn.addEventListener('click', () => openModal('login'));
    if (openLoginCard) openLoginCard.addEventListener('click', () => openModal('login'));
    if (openRegisterNav) openRegisterNav.addEventListener('click', () => openModal('register'));
    if (openRegisterHero) openRegisterHero.addEventListener('click', () => openModal('register'));

    // Przełączanie z poziomu stopce (Zarejestruj się <-> Zaloguj się)
    if (switchAuthBtn) {
        switchAuthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentTab === 'login') {
                switchTab('register');
            } else {
                switchTab('login');
            }
        });
    }

    // Przejście do resetu hasła
    if (showForgotBtn) {
        showForgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('forgot');
        });
    }

    // Zamykanie modalu
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Zamykanie przy kliknięciu w czarne tło
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Zamykanie klawiszem ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
