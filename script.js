let cart = [];


/* DODAWANIE DO KOSZYKA */

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    openCart();
}


/* USUWANIE PRODUKTU */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* AKTUALIZACJA KOSZYKA */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartCount.textContent = cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty">
                Twój koszyk jest pusty.
            </p>
        `;

        cartTotal.textContent = "0 zł";

        return;
    }


    let total = 0;


    cartItems.innerHTML = cart.map((item, index) => {

        total += item.price;

        return `
            <div class="cart-item">

                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <span>${item.price} zł</span>

                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${index})"
                >
                    Usuń
                </button>

            </div>
        `;

    }).join("");


    cartTotal.textContent = `${total} zł`;
}


/* OTWIERANIE KOSZYKA */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


/* ZAMYKANIE KOSZYKA */

function closeCart(event) {

    if (event && event.target !== event.currentTarget) {
        return;
    }

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

    document.body.style.overflow = "";
}


/* ZAMÓWIENIE */

function checkout() {

    if (cart.length === 0) {

        alert("Twój koszyk jest pusty.");

        return;
    }


    const items = cart
        .map(item => `${item.name} - ${item.price} zł`)
        .join("\n");


    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );


    alert(
        `Zamówienie:\n\n${items}\n\nRazem: ${total} zł\n\n` +
        `Tutaj możemy później podłączyć formularz zamówienia, Discorda lub płatności.`
    );
}
