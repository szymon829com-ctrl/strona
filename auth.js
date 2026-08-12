document.addEventListener("DOMContentLoaded", () => {
    // Elementy DOM
    const authModal = document.getElementById("authModal");
    const closeAuthBtn = document.getElementById("closeAuthBtn");
    
    // Przyciski otwierające modal ogólnie
    const openLoginBtns = [
        document.getElementById("openLoginBtn"),
        document.getElementById("openLoginBtnCard"),
        document.getElementById("openLoginBtnNav")
    ];
    
    const openRegisterBtns = [
        document.getElementById("openRegisterBtnHero"),
        document.getElementById("openRegisterBtnNav")
    ];

    // Wszystkie przyciski z cennika (Free, Pro+, Pro)
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

    // =========================================================================
    // SYMULACJA SESJI UŻYTKOWNIKA (Zmień na true, aby przetestować stan zalogowany)
    // =========================================================================
    let isUserLoggedIn = false; 

    // Funkcje pomocnicze do przełączania widoków w modalu
    function openModal(mode = 'login', planName = null) {
        authModal.classList.add("active");
        if (mode === 'register') {
            switchToRegister(planName);
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

    function switchToRegister(planName = null) {
        hideAllForms();
        registerForm.classList.add("active");
        tabRegisterBtn.classList.add("active");
        tabLoginBtn.classList.remove("active");
        authTabs.style.display = "grid";
        socialGroup.style.display = "grid";
        orSeparator.style.display = "block";
        
        if (planName) {
            modalTitle.innerHTML = `Wybrano plan: <span>${planName}</span>`;
            modalSubtitle.textContent = "Zarejestruj się, aby aktywować ten plan";
        } else {
            modalTitle.innerHTML = "Dołącz do <span>CraftShop</span>";
            modalSubtitle.textContent = "Stwórz darmowe konto dla swojego serwera";
        }
        
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

    // --- Nasłuchiwacze zdarzeń ---

    openLoginBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                openModal('login');
            });
        }
    });

    openRegisterBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                openModal('register');
            });
        }
    });

    // Inteligentna obsługa przycisków w cenniku
    pricingButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Pobieramy nazwę planu z karty
            const card = btn.closest(".pricing-card");
            let planName = "Wybrany Plan";
            
            if (card) {
                const planTitleEl = card.querySelector(".plan-name");
                if (planTitleEl) {
                    planName = planTitleEl.textContent.trim();
                }
            }

            // KLUCZOWY WARUNEK: Sprawdzenie stanu zalogowania
            if (isUserLoggedIn) {
                // Jeśli zalogowany -> przekieruj do dashboardu z parametrem planu
                window.location.href = `dashboard.html?plan=${encodeURIComponent(planName)}`;
            } else {
                // Jeśli niezalogowany -> otwórz modal rejestracji z wybranym planem
                openModal('register', planName);
            }
        });
    });

    if (closeAuthBtn) {
        closeAuthBtn.addEventListener("click", closeModal);
    }

    authModal.addEventListener("click", (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    if (tabLoginBtn) {
        tabLoginBtn.addEventListener("click", switchToLogin);
    }

    if (tabRegisterBtn) {
        tabRegisterBtn.addEventListener("click", () => switchToRegister());
    }

    if (showForgot) {
        showForgot.addEventListener("click", (e) => {
            e.preventDefault();
            switchToForgot();
        });
    }

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

    // Walidacja formularzy i symulacja poprawnego logowania
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
                    if (form === registerForm) {
                        // Po rejestracji przechodzimy do weryfikacji kodu
                        hideAllForms();
                        verifyForm.classList.add("active");
                        modalTitle.innerHTML = "Weryfikacja <span>e-mail</span>";
                        modalSubtitle.textContent = "Wpisz kod wysłany na skrzynkę";
                    } else if (form === verifyForm || form === loginForm) {
                        // Symulacja udanego logowania/weryfikacji -> zmiana stanu i przekierowanie do dashboardu
                        isUserLoggedIn = true;
                        alert("Zalogowano pomyślnie! Przenoszę do panelu...");
                        window.location.href = "dashboard.html";
                    }
                }
            });
        }
    });
});
