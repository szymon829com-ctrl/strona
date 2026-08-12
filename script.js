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

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 350);
    }, 3000);
}

function toggleCart() {
    document.getElementById('cartOverlay').classList.toggle('active');
}

function addToCart(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;

    cart.push(service);
    updateCartUI();
    showToast(`Dodano do koszyka: ${service.name}`);
}

function removeFromCart(index) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    updateCartUI();
    showToast(`Usunięto z koszyka: ${removedName}`, 'error');
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
        showToast('Twój koszyk jest pusty!', 'error');
        return;
    }
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function submitOrder() {
    const discordInput = document.getElementById('modalDiscord');
    const notesInput = document.getElementById('modalNotes');
    
    const discordUser = discordInput ? discordInput.value.trim() : '';

    if (!discordUser) {
        showToast('Podaj swój nick na Discordzie!', 'error');
        return;
    }

    closeCheckoutModal();
    cart = [];
    updateCartUI();
    toggleCart();

    showToast('Zamówienie zostało przygotowane pomyślnie!');

    if (discordInput) discordInput.value = '';
    if (notesInput) notesInput.value = '';

    window.open("https://discord.com/users/xszymoxpro", "_blank");
}

function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', initStore);
