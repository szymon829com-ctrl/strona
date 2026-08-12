document.addEventListener("DOMContentLoaded", () => {
    // Elementy DOM
    const authModal = document.getElementById("authModal");
    const closeAuthBtn = document.getElementById("closeAuthBtn");
    
    // Przyciski otwierające modal
    const openLoginBtns = [
        document.getElementById("openLoginBtn"),
        document.getElementById("openLoginBtnCard"),
        document.getElementById("openLoginBtnNav")
    ];
    
    const openRegisterBtns = [
        document.getElementById("openRegisterBtnHero"),
        document.getElementById("openRegisterBtnNav")
    ];

    // Przyciski z cennika (wybieranie planu)
    const pricingButtons = document.querySelectorAll(".pricing-card .btn-pricing-outline, .pricing-card .btn-green-solid");

    // Formularze i zakładki
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const verifyForm = document.getElementById("verifyForm");
    const forgotForm = document.getElementById("forgotForm");
    
    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabRegisterBtn = document.getElementById("tabRegisterBtn");
    const authTabs = document.getElementById("authTabs");
    const socialGroup = document.getElementById("socialGroup");
    const orSeparator = document.getElementById("orSeparator");
    
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const footerText = document.getElementById("footerText");
    const switchAuthBtn = document.getElementById("switchAuthBtn");
    const showForgot = document.getElementById("showForgot");

    // Funkcje pomocnicze do przełączania widoków w modalu
    function openModal(mode = 'login') {
        authModal.classList.add("active");
        if (mode === 'register') {
            switchToRegister();
        } else {
            switchToLogin();
        }
    }

    function closeModal() {
        authModal.classList.remove("active");
    }

    function hideAllForms() {
        loginForm.classList.remove("active");
        registerForm.classList.remove("active");
        verifyForm.classList.remove("active");
        forgotForm.classList.remove("active");
    }

    function switchToLogin() {
        hideAllForms();
        loginForm.classList.add("active");
        tabLoginBtn.classList.add("active");
        tabRegisterBtn.classList.remove("active");
        authTabs.style.display = "grid";
        socialGroup.style.display = "grid";
        orSeparator.style.display = "block";
        modalTitle.innerHTML = "Konto <span>CraftShop</span>";
        modalSubtitle.textContent = "Wybierz metodę autoryzacji";
        footerText.textContent = "Nie masz jeszcze konta?";
        switchAuthBtn.textContent = "Zarejestruj się";
    }

    function switchToRegister() {
        hideAllForms();
        registerForm.classList.add("active");
        tabRegisterBtn.classList.add("active");
        tabLoginBtn.classList.remove("active");
        authTabs.style.display = "grid";
        socialGroup.style.display = "grid";
        orSeparator.style.display = "block";
        modalTitle.innerHTML = "Dołącz do <span>CraftShop</span>";
        modalSubtitle.textContent = "Stwórz darmowe konto dla swojego serwera";
        footerText.textContent = "Masz już konto?";
        switchAuthBtn.textContent = "Zaloguj się";
    }

    function switchToForgot() {
        hideAllForms();
        forgotForm.classList.add("active");
        authTabs.style.display = "none";
        socialGroup.style.display = "none";
        orSeparator.style.display = "none";
        modalTitle.innerHTML = "Resetowanie <span>hasła</span>";
        modalSubtitle.textContent = "Wpisz e-mail powiązany z kontem";
        footerText.textContent = "Pamiętasz hasło?";
        switchAuthBtn.textContent = "Wróć do logowania";
    }

    // --- Nasłuchiwacze zdarzeń (Event Listeners) ---

    // Otwieranie logowania
    openLoginBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                openModal('login');
            });
        }
    });

    // Otwieranie rejestracji
    openRegisterBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                openModal('register');
            });
        }
    });

    // Interakcja dla przycisków w cenniku (otwierają rejestrację/zakup)
    pricingButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal('register');
        });
    });

    // Zamykanie modalu
    if (closeAuthBtn) {
        closeAuthBtn.addEventListener("click", closeModal);
    }

    authModal.addEventListener("click", (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    // Przełączanie zakładek w modalu
    if (tabLoginBtn) {
        tabLoginBtn.addEventListener("click", switchToLogin);
    }

    if (tabRegisterBtn) {
        tabRegisterBtn.addEventListener("click", switchToRegister);
    }

    if (showForgot) {
        showForgot.addEventListener("click", (e) => {
            e.preventDefault();
            switchToForgot();
        });
    }

    // Stopka w modalu (link przełączający stan)
    if (switchAuthBtn) {
        switchAuthBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (loginForm.classList.contains("active") || forgotForm.classList.contains("active")) {
                switchToRegister();
            } else {
                switchToLogin();
            }
        });
    }

    // Obsługa wysyłania formularzy (symulacja / zabezpieczenie przed pustymi polami)
    const forms = [loginForm, registerForm, verifyForm, forgotForm];
    forms.forEach(form => {
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                let isValid = true;
                const inputs = form.querySelectorAll("input");

                inputs.forEach(input => {
                    const fieldContainer = input.closest(".input-field");
                    if (!input.value.trim()) {
                        isValid = false;
                        if (fieldContainer) fieldContainer.classList.add("error");
                    } else {
                        if (fieldContainer) fieldContainer.classList.remove("error");
                    }
                });

                if (isValid) {
                    // Tutaj możesz podpiąć faktyczny request fetch do swojego serwera Node.js
                    alert("Akcja wykonana pomyślnie!");
                    if (form === registerForm) {
                        // Przykładowe przełączenie na formularz weryfikacji kodu po rejestracji
                        hideAllForms();
                        verifyForm.classList.add("active");
                        modalTitle.innerHTML = "Weryfikacja <span>e-mail</span>";
                        modalSubtitle.textContent = "Wpisz kod wysłany na skrzynkę";
                    }
                }
            });
        }
    });
});
