const services = [
    { id: 1, name: "Embed Discord", price: 25, desc: "Profesjonalne embedy dostosowane pod twój serwer.", icon: "▣", featured: false },
    { id: 2, name: "Banner pod tryb", price: 30, desc: "Profesjonalne banery pod tryb.", icon: "◆", featured: true },
    { id: 3, name: "Logo Serwerowe", price: 40, desc: "Unikalna identyfikacja wizualna Twojego projektu.", icon: "✦", featured: false },
    { id: 4, name: "Miniaturka", price: 20, desc: "Efektowna grafika przyciągająca widzów na YT.", icon: "⬢", featured: false },
    { id: 5, name: "Ikonki pod ItemShop", price: 20, desc: "Ikonki pod itemshop.", icon: "⬢", featured: false },
];

let cart = JSON.parse(localStorage.getItem('sx_cart')) || [];

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

    updateCartUI();
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.remove(); }, 350);
    }, 3000);
}

function toggleCart() {
    window.location.href = 'cart.html';
}

function addToCart(id) {
    const service = services.find(s => s.id === id);
    if (!service) return;

    cart.push(service);
    saveCart();
    updateCartUI();
    showToast(`Dodano do koszyka: ${service.name}`);
}

function removeFromCart(index) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showToast(`Usunięto z koszyka: ${removedName}`, 'error');
}

function saveCart() {
    localStorage.setItem('sx_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty" style="text-align:center; padding: 40px; color: var(--muted);">Twój koszyk jest pusty.</p>`;
        if (cartTotal) cartTotal.textContent = `od 0 zł`;
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; margin-bottom:12px; border-radius:12px; background:rgba(255,255,255,.03); border:1px solid var(--border);">
                <div class="cart-item-info">
                    <strong style="color:white; margin-bottom:4px; display:block;">${item.name}</strong>
                    <span style="color:var(--muted); font-size:13px;">od ${item.price} PLN</span>
                </div>
                <button class="remove" onclick="removeFromCart(${index})">Usuń</button>
            </div>
        `;
    }).join('');

    if (cartTotal) {
        cartTotal.textContent = `od ${total} zł`;
    }
}

async function submitOrder() {
    const discordInput = document.getElementById('modalDiscord');
    const notesInput = document.getElementById('modalNotes');
    
    const discordUser = discordInput ? discordInput.value.trim() : '';
    const notes = notesInput ? notesInput.value.trim() : 'Brak uwag';

    if (cart.length === 0) {
        showToast('Twój koszyk jest pusty!', 'error');
        return;
    }

    if (!discordUser) {
        showToast('Podaj swój nick na Discordzie!', 'error');
        return;
    }

    let itemsList = cart.map(item => `• ${item.name} (od ${item.price} PLN)`).join('\n');
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const webhookURL = "https://discord.com/api/webhooks/1537399559641104444/rZprACMCthx81xEXCnUGJ4e6S15E5HFScIgzmjGp_DqU01V99Mej31GuAyeGxZ_sW8jw";

    const payload = {
        content: `🚨 **NOWE ZAMÓWIENIE W SX STUDIO!** 🚨\n\n👤 **Klient (Discord):** \`${discordUser}\`\n🛒 **Wybrane usługi:**\n${itemsList}\n\n💰 **Szacowany kosz:** od ${totalPrice} PLN\n💬 **Uwagi:** ${notes}`
    };

    try {
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Błąd wysyłania webhooka:", error);
    }

    cart = [];
    saveCart();
    updateCartUI();

    showToast('Zamówienie wysłane pomyślnie!');

    // Przekierowanie z powrotem na stronę główną po 1.5 sekundy
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}
    if (!discordUser) {
        showToast('Podaj swój nick na Discordzie!', 'error');
        return;
    }

    let itemsList = cart.map(item => `• ${item.name} (od ${item.price} PLN)`).join('\n');
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const webhookURL = "https://discord.com/api/webhooks/1537399559641104444/rZprACMCthx81xEXCnUGJ4e6S15E5HFScIgzmjGp_DqU01V99Mej31GuAyeGxZ_sW8jw";

    const payload = {
        content: `🚨 **NOWE ZAMÓWIENIE W SX STUDIO!** 🚨\n\n👤 **Klient (Discord):** \`${discordUser}\`\n🛒 **Wybrane usługi:**\n${itemsList}\n\n💰 **Szacowany kosz:** od ${totalPrice} PLN\n💬 **Uwagi:** ${notes}`
    };

    try {
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Błąd wysyłania webhooka:", error);
    }

    cart = [];
    saveCart();
    updateCartUI();

    showToast('Zamówienie wysłane pomyślnie!');

    setTimeout(() => {
        window.open("https://discord.com/users/xszymoxpro", "_blank");
    }, 1200);
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
