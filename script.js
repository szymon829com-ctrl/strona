const services = [
    { id: 1, name: "Avatar", price: 20, desc: "Avatar na Discord, YouTube lub social media w wysokiej jakości.", icon: "▣", featured: false },
    { id: 2, name: "Banner", price: 35, desc: "Profesjonalny banner promocyjny lub na profil / stronę.", icon: "◆", featured: true },
    { id: 3, name: "Logo", price: 45, desc: "Unikalny znak graficzny idealnie dopasowany do Twojej marki.", icon: "✦", featured: false },
    { id: 4, name: "Grafika Minecraft", price: 30, desc: "Miniatury YouTube, grafiki serwerowe i promocyjne.", icon: "⬢", featured: false }
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
                <span>${s.name}</span>
                <strong>od ${s.price} zł</strong>
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
    
    let summary = cart.map(item => `- ${item.name} (od ${item.price} PLN)`).join('\n');
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const confirmed = confirm(`Twoje zamówienie:\n\n${summary}\n\nSzacowany koszt: od ${total} PLN\n\nKliknij OK, aby przejść do realizacji (kontakt / Discord).`);
    
    if (confirmed) {
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
