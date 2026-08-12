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

    // Uniwersalny selektor – łapie każdy przycisk i link wewnątrz kart cennika
    const pricingButtons = document.querySelectorAll(".pricing-card button, .pricing-card a");

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
        if (authModal) {
            authModal.classList.add("active");
            if (mode === 'register') {
                switchToRegister(planName);
            } else {
                switchToLogin();
            }
        }
    }

    function closeModal() {
        if (authModal) {
            authModal.classList.remove("active");
        }
    }

    function hideAllForms() {
        if (loginForm) loginForm.classList.remove("active");
        if (registerForm) registerForm.classList.remove("active");
        if (verifyForm) verifyForm.classList.remove("active");
        if (forgotForm) forgotForm.classList.remove("active");
    }

    function switchToLogin() {
        hideAllForms();
        if (loginForm) loginForm.classList.add("active");
        if (tabLoginBtn) tabLoginBtn.classList.add("active");
        if (tabRegisterBtn) tabRegisterBtn.classList.remove("active");
        if (authTabs) authTabs.style.display = "grid";
        if (socialGroup) socialGroup.style.display = "grid";
        if (orSeparator) orSeparator.style.display = "block";
        if (modalTitle) modalTitle.innerHTML = "Konto <span>CraftShop</span>";
        if (modalSubtitle) modalSubtitle.textContent = "Wybierz metodę autoryzacji";
        if (footerText) footerText.textContent = "Nie masz jeszcze konta?";
        if (switchAuthBtn) switchAuthBtn.textContent = "Zarejestruj się";
    }

    function switchToRegister(planName = null) {
        hideAllForms();
        if (registerForm) registerForm.classList.add("active");
        if (tabRegisterBtn) tabRegisterBtn.classList.add("active");
        if (tabLoginBtn) tabLoginBtn.classList.remove("active");
        if (authTabs) authTabs.style.display = "grid";
        if (socialGroup) socialGroup.style.display = "grid";
        if (orSeparator) orSeparator.style.display = "block";
        
        if (modalTitle && modalSubtitle) {
            if (planName) {
                modalTitle.innerHTML = `Wybrano plan: <span>${planName}</span>`;
                modalSubtitle.textContent = "Zarejestruj się, aby aktywować ten plan";
            } else {
                modalTitle.innerHTML = "Dołącz do <span>CraftShop</span>";
                modalSubtitle.textContent = "Stwórz darmowe konto dla swojego serwera";
            }
        }
        
        if (footerText) footerText.textContent = "Masz już konto?";
        if (switchAuthBtn) switchAuthBtn.textContent = "Zaloguj się";
    }

    function switchToForgot() {
        hideAllForms();
        if (forgotForm) forgotForm.classList.add("active");
        if (authTabs) authTabs.style.display = "none";
        if (socialGroup) socialGroup.style.display = "none";
        if (orSeparator) orSeparator.style.display = "none";
        if (modalTitle) modalTitle.innerHTML = "Resetowanie <span>hasła</span>";
        if (modalSubtitle) modalSubtitle.textContent = "Wpisz e-mail powiązany z kontem";
        if (footerText) footerText.textContent = "Pamiętasz hasło?";
        if (switchAuthBtn) switchAuthBtn.textContent = "Wróć do logowania";
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

            // Sprawdzenie stanu zalogowania
            if (isUserLoggedIn) {
                window.location.href = `dashboard.html?plan=${encodeURIComponent(planName)}`;
            } else {
                openModal('register', planName);
            }
        });
    });

    if (closeAuthBtn) {
        closeAuthBtn.addEventListener("click", closeModal);
    }

    if (authModal) {
        authModal.addEventListener("click", (e) => {
            if (e.target === authModal) {
                closeModal();
            }
        });
    }

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
            if ((loginForm && loginForm.classList.contains("active")) || (forgotForm && forgotForm.classList.contains("active"))) {
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
                        hideAllForms();
                        if (verifyForm) verifyForm.classList.add("active");
                        if (modalTitle) modalTitle.innerHTML = "Weryfikacja <span>e-mail</span>";
                        if (modalSubtitle) modalSubtitle.textContent = "Wpisz kod wysłany na skrzynkę";
                    } else if (form === verifyForm || form === loginForm) {
                        isUserLoggedIn = true;
                        alert("Zalogowano pomyślnie! Przenoszę do panelu...");
                        window.location.href = "dashboard.html";
                    }
                }
            });
        }
    });
});
