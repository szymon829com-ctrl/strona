const services = [
    { id: 1, name: "Render Postaci", price: 25, desc: "Wysokiej jakości render postaci z Twoim skinem w wysokiej rozdzielczości.", icon: "▣", featured: false },
    { id: 2, name: "Banner Social Media", price: 40, desc: "Profesjonalne tło na YouTube, Twittera lub Twitcha.", icon: "◆", featured: true },
    { id: 3, name: "Logo Serwerowe/Marki", price: 60, desc: "Unikalna identyfikacja wizualna Twojego projektu.", icon: "✦", featured: false },
    { id: 4, name: "Miniaturka (Thumbnail)", price: 35, desc: "Efektowna grafika przyciągająca widzów na YT.", icon: "⬢", featured: false },
    { id: 5, name: "Grafika GUI / UI", price: 50, desc: "Interfejsy i elementy graficzne pod serwery MC.", icon: "⬡", featured: false }
];

let cart = [];

function initStore() {
    const productsGrid = document.getElementById('productsGrid');
    const pricingList = document.getElementById('pricingList');

    if (productsGrid) {
        productsGrid.innerHTML = services.map(s => `
            <article class="product ${s.featured ? 'featured' : ''}">
                ${s.featured ? '<div class="popular">POPULARNE</div>' : ''}
                <div class="product-icon">${s.icon}</div>
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <div class="price">od ${s.price} <small>PLN</small></div>
                <button onclick="addToCart(${s.id})">Dodaj do koszyka</button>
            </article>
        `).join('');
    }

    if (pricingList) {
        pricingList.innerHTML = services.map(s => `
            <div class="price-row">
                <div class="price-info">
                    <strong>${s.name}</strong>
                    <p>${s.desc}</p>
                </div>
                <span class="price-val">od ${s.price} zł</span>
            </div>
        `).join('');
    }
}

function toggleCart() {
    document.getElementById('cartOverlay').classList.toggle('active');
}

function addToCart(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;

    cart.push(service);
    updateCartUI();
    toggleCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty">Koszyk jest pusty.</p>`;
        cartTotal.textContent = `od 0 zł`;
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <span>od ${item.price} PLN</span>
                </div>
                <button class="remove" onclick="removeFromCart(${index})">Usuń</button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `od ${total} zł`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Twój koszyk jest pusty!');
        return;
    }

    const discordUser = prompt('Podaj swój nick na Discordzie (np. nazwa#0000 lub nazwa):');
    if (!discordUser) return;

    const additionalNotes = prompt('Dodatkowe uwagi do zamówienia (opcjonalnie, np. opis projektu):') || 'Brak';

    let summary = cart.map(item => `- ${item.name} (od ${item.price} PLN)`).join('\n');
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const confirmed = confirm(
        `PODSUMOWANIE ZAMÓWIENIA:\n\n` +
        `Discord: ${discordUser}\n` +
        `Uwagi: ${additionalNotes}\n\n` +
        `Wybrane usługi:\n${summary}\n\n` +
        `Szacowany koszt: od ${total} PLN\n\n` +
        `Kliknij OK, aby wyslac zamówienie.`
    );

    if (confirmed) {
        cart = [];
        updateCartUI();
        toggleCart();
        window.location.href = "https://discord.com/"; 
    }
}

function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', initStore);
