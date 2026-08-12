document.addEventListener('DOMContentLoaded', () => {
    // Pobranie elementów modalu
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('closeAuthBtn');
    
    // Formularze
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotForm = document.getElementById('forgotForm');
    
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

    // Przyciski otwierające z poziomu strony
    const openLoginBtn = document.getElementById('openLoginBtn');
    const openRegisterNav = document.getElementById('openRegisterBtnNav');
    const openRegisterHero = document.getElementById('openRegisterBtnHero');
    const openLoginCard = document.getElementById('openLoginBtnCard');

    let currentTab = 'login';

    // Funkcja do przełączania widoków
    function switchTab(tab) {
        currentTab = tab;

        // 1. Ukryj wszystkie formularze
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
        forgotForm.classList.remove('active');

        // 2. Odznacz aktywne zakładki u góry (jeśli istnieją w HTML)
        if (tabLoginBtn) tabLoginBtn.classList.remove('active');
        if (tabRegisterBtn) tabRegisterBtn.classList.remove('active');

        // 3. Przywróć widoczność zakładek i przycisków społecznościowych
        if (authTabs) authTabs.style.display = 'grid';
        if (socialGroup) socialGroup.style.display = 'grid';
        if (orSeparator) orSeparator.style.display = 'block';

        // 4. Ustaw odpowiedni stan
        if (tab === 'login') {
            loginForm.classList.add('active');
            if (tabLoginBtn) tabLoginBtn.classList.add('active');
            modalTitle.innerHTML = 'Zaloguj się do <span>CraftShop</span>';
            modalSubtitle.textContent = 'Wpisz dane dostępowe do swojego konta';
            footerText.textContent = 'Nie masz jeszcze konta?';
            switchAuthBtn.textContent = 'Zarejestruj się';

        } else if (tab === 'register') {
            registerForm.classList.add('active');
            if (tabRegisterBtn) tabRegisterBtn.classList.add('active');
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

            // Ukrywamy Discord/Google oraz taby w trybie resetu hasła
            if (authTabs) authTabs.style.display = 'none';
            if (socialGroup) socialGroup.style.display = 'none';
            if (orSeparator) orSeparator.style.display = 'none';
        }
    }

    // Otwieranie i zamykanie
    const openModal = (tab = 'login') => {
        switchTab(tab);
        modal.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    // Obsługa kliknięć otwierających modal
    if (openLoginBtn) openLoginBtn.addEventListener('click', () => openModal('login'));
    if (openLoginCard) openLoginCard.addEventListener('click', () => openModal('login'));
    if (openRegisterNav) openRegisterNav.addEventListener('click', () => openModal('register'));
    if (openRegisterHero) openRegisterHero.addEventListener('click', () => openModal('register'));

    // Klikanie zakładek górnych (jeśli istnieją w DOM)
    if (tabLoginBtn) tabLoginBtn.addEventListener('click', () => switchTab('login'));
    if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', () => switchTab('register'));

    // Przełączanie ze stopki
    if (switchAuthBtn) {
        switchAuthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentTab === 'login') switchTab('register');
            else switchTab('login');
        });
    }

    // Link "Zapomniałeś hasła?"
    if (showForgotBtn) {
        showForgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('forgot');
        });
    }

    // Zamknięcia modalu
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
