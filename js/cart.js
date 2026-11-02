// ==========================================
// GET CART ELEMENTS
// ==========================================

const cartItems =
    document.getElementById("cart-items");


// ==========================================
// DISPLAY CART
// ==========================================

if (cartItems) {

    displayCart();

}


function displayCart() {

    cartItems.innerHTML = "";


    // CHECK IF CART IS EMPTY

    if (!cart || cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        const cartTotal =
            document.getElementById("cart-total");

        if (cartTotal) {
            cartTotal.innerText = 0;
        }

        return;

    }


    let total = 0;


    cart.forEach(function(item) {

        total =
            total +
            Number(item.price) * Number(item.quantity);


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        ${item.author}
                    </p>

                    <p>
                        ₹${item.price}
                        ×
                        ${item.quantity}
                    </p>

                </div>


                <div>

                    <button
                        onclick="decreaseQuantity('${item.id}')">

                        -

                    </button>

                    ${item.quantity}

                    <button
                        onclick="increaseQuantity('${item.id}')">

                        +

                    </button>

                    <button
                        onclick="removeFromCart('${item.id}')">

                        Remove

                    </button>

                </div>

            </div>

        `;

    });


    const cartTotal =
        document.getElementById("cart-total");

    if (cartTotal) {

        cartTotal.innerText = total;

    }

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(id) {

    const book =
        cart.find(function(item) {

            return String(item.id) === String(id);

        });


    if (!book) {
        return;
    }


    book.quantity++;

    saveCart();

    displayCart();

    updateCartCount();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(id) {

    const book =
        cart.find(function(item) {

            return String(item.id) === String(id);

        });


    if (!book) {
        return;
    }


    book.quantity--;


    if (book.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    displayCart();

    updateCartCount();

}


// ==========================================
// REMOVE INDIVIDUAL BOOK
// ==========================================

function removeFromCart(id) {

    cart =
        cart.filter(function(item) {

            return String(item.id) !== String(id);

        });


    saveCart();

    displayCart();

    updateCartCount();

}


// ==========================================
// CLEAR ENTIRE CART
// ==========================================

const clearCart =
    document.getElementById("clear-cart");


if (clearCart) {

    clearCart.addEventListener(
        "click",
        function() {

            cart = [];

            saveCart();

            displayCart();

            updateCartCount();

        }
    );

}


// ==========================================
// SHOW MESSAGE WHEN CHECKOUT IS
// ATTEMPTED WITH AN EMPTY CART
// ==========================================

const urlParams =
    new URLSearchParams(window.location.search);


if (urlParams.get("empty") === "true") {

    const message =
        document.createElement("p");

    message.innerText =
        "Your cart is empty! Please add some books before checkout.";

    message.style.color = "#c7ff45";

    message.style.textAlign = "center";

    message.style.margin = "20px auto";

    message.style.fontSize = "16px";


    const cartContainer =
        document.getElementById("cart-container");


    if (cartContainer) {

        cartContainer.prepend(message);

    }

}
