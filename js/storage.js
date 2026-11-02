let users =
    JSON.parse(localStorage.getItem("users")) || [];

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

let cart = [];


// LOAD CART
function loadCart() {

    if (currentUser) {

        cart = JSON.parse(
            localStorage.getItem(
                "cart_" + currentUser.email
            )
        ) || [];

    } else {

        cart = [];

    }

}


// SAVE CART
function saveCart() {

    if (!currentUser) {
        return;
    }

    localStorage.setItem(
        "cart_" + currentUser.email,
        JSON.stringify(cart)
    );

}


// UPDATE CART COUNT
function updateCartCount() {

    const countElement =
        document.getElementById("cart-count");

    if (!countElement) return;

    let totalItems = 0;

    cart.forEach(function(item) {

        totalItems += Number(item.quantity) || 0;

    });

    countElement.textContent = totalItems;

}


// LOAD CART WHEN SCRIPT RUNS
loadCart();


// UPDATE CART COUNT WHEN PAGE LOADS
document.addEventListener(
    "DOMContentLoaded",
    updateCartCount
);
