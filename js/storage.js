
let users =
    JSON.parse(localStorage.getItem("users")) || [];

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

let cart = [];

if (currentUser) {

    cart =
        JSON.parse(
            localStorage.getItem(
                "cart_" + currentUser.email
            )
        ) || [];

}

function saveCart() {

    if (!currentUser) {
        return;
    }

    localStorage.setItem(
        "cart_" + currentUser.email,
        JSON.stringify(cart)
    );

}



function updateCartCount() {
    const countElement = document.getElementById("cart-count");

    if (!countElement) return;

    let totalItems = 0;

    cart.forEach(function(item) {
        totalItems += Number(item.quantity) || 0;
    });

    countElement.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", updateCartCount);