const services = [
    { id: 1, name: "Avatar", price: 15, desc: "Avatar na Discord, YouTube lub social media.", icon: "▣", featured: false },
    { id: 2, name: "Banner", price: 30, desc: "Profesjonalny banner promocyjny lub na profil.", icon: "◆", featured: true },
    { id: 3, name: "Logo", price: 40, desc: "Unikalny znak graficzny dopasowany do marki.", icon: "✦", featured: false },
    { id: 4, name: "Grafika Minecraft", price: 25, desc: "Miniatury, grafiki serwerowe i reklamowe.", icon: "⬢", featured: false }
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
                <div class="price">${s.price} <small>PLN</small></div>
                <button onclick="addToCart(${s.id})">Dodaj do koszyka</button>
            </article>
        `).join('');
    }

    if (pricingList) {
        pricingList.innerHTML = services.map(s => `
            <div class="price-row">
                <span>${s.name}</span>
                <strong>${s.price} zł</strong>
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
        cartTotal.textContent = `0 zł`;
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <span>${item.price} PLN</span>
                </div>
                <button class="remove" onclick="removeFromCart(${index})">Usuń</button>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `${total} zł`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Twój koszyk jest pusty!');
        return;
    }
    alert('Dziękujemy za złożenie zamówienia! Wkrótce skontaktujemy się w celu ustalenia szczegółów.');
    cart = [];
    updateCartUI();
    toggleCart();
}

document.addEventListener('DOMContentLoaded', initStore);
