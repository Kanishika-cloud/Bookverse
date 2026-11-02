// GET ELEMENTS

const checkoutForm =
    document.getElementById("checkout-form");

const checkoutItems =
    document.getElementById("checkout-items");

const checkoutTotal =
    document.getElementById("checkout-total");

const checkoutMessage =
    document.getElementById("checkout-message");


// CHECK LOGIN

if (!currentUser || !localStorage.getItem("token")) {

    window.location.href = "books.html";

} else {

    // DISPLAY ORDER

    function displayCheckout() {

        if (!checkoutItems || !checkoutTotal) {
            return;
        }

        checkoutItems.innerHTML = "";

        if (!cart || cart.length === 0) {

            checkoutItems.innerHTML =
                "<p>Your cart is empty. Please add books first.</p>";

            checkoutTotal.innerText = 0;

            return;

        }

        let total = 0;

        cart.forEach(function(item) {

            total += item.price * item.quantity;

            checkoutItems.innerHTML += `
                <div class="checkout-item">

                    <div>
                        <strong>${item.title}</strong>
                        <p>${item.author}</p>
                    </div>

                    <span>
                        ₹${item.price} × ${item.quantity}
                    </span>

                </div>
            `;

        });

        checkoutTotal.innerText = total;

    }


    // DISPLAY CART

    displayCheckout();


    // EMAIL VALIDATION

    function validateEmail(email) {

        email = email.trim();

        const emailPattern =
            /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

        return emailPattern.test(email);

    }


    // PLACE ORDER

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();


                // CHECK EMPTY CART

                if (!cart || cart.length === 0) {

                    checkoutMessage.innerText =
                        "Your cart is empty. Please add books first.";

                    return;

                }


                // GET FORM VALUES

                const name =
                    document.getElementById(
                        "checkout-name"
                    ).value.trim();

                const email =
                    document.getElementById(
                        "checkout-email"
                    ).value.trim();

                const address =
                    document.getElementById(
                        "checkout-address"
                    ).value.trim();

                const pincode =
                    document.getElementById(
                        "checkout-pincode"
                    ).value.trim();

                const payment =
                    document.getElementById(
                        "payment-method"
                    ).value;


                // NAME VALIDATION

                if (name.length < 2) {

                    checkoutMessage.innerText =
                        "Please enter a valid name.";

                    return;

                }


                // EMAIL VALIDATION

                if (!validateEmail(email)) {

                    checkoutMessage.innerText =
                        "Please enter a valid email address.";

                    return;

                }


                // ADDRESS VALIDATION

                if (address.length < 5) {

                    checkoutMessage.innerText =
                        "Please enter your complete address.";

                    return;

                }


                // INDIAN PIN CODE VALIDATION

                if (!/^[1-9][0-9]{5}$/.test(pincode)) {

                    checkoutMessage.innerText =
                        "Please enter a valid 6-digit Indian PIN code.";

                    return;

                }


                // PAYMENT VALIDATION

                if (!payment) {

                    checkoutMessage.innerText =
                        "Please select a payment method.";

                    return;

                }


                // GET LOGIN TOKEN

                const token =
                    localStorage.getItem("token");


                if (!token) {

                    checkoutMessage.innerText =
                        "Your session has expired. Please login again.";

                    window.location.href = "index.html";

                    return;

                }


                // PREPARE ORDER DATA FOR BACKEND

                const orderData = {

                    name: name,

                    email: email,

                    address: address,

                    pincode: pincode,

                    paymentMethod: payment,

                    items: cart.map(function(item) {

                        return {

                            bookId: item.id,

                            quantity: item.quantity

                        };

                    })

                };


                // SEND ORDER TO BACKEND

                try {

                    checkoutMessage.innerText =
                        "Placing your order...";

                    const response = await fetch(
                        "http://localhost:3000/api/orders",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type": "application/json",

                                "Authorization": "Bearer " + token

                            },

                            body: JSON.stringify(orderData)

                        }
                    );


                    const data = await response.json();


                    // CHECK SERVER RESPONSE

                    if (!response.ok) {

                        throw new Error(
                            data.message ||
                            "Could not place your order."
                        );

                    }


                    // SAVE LAST ORDER

                    if (data.order) {

                        localStorage.setItem(
                            "lastOrder",
                            JSON.stringify(data.order)
                        );

                    }


                    // SHOW SUCCESS MESSAGE

                    checkoutMessage.innerText =
                        "Order placed successfully! Your order ID is " +
                        (data.order?._id || "confirmed");


                    // EMPTY CART ONLY AFTER SUCCESS

                    cart = [];

                    saveCart();


                    // RESET FORM

                    checkoutForm.reset();


                    // UPDATE CART SUMMARY

                    displayCheckout();


                    // UPDATE NAVBAR CART COUNT

                    if (typeof updateCartCount === "function") {

                        updateCartCount();

                    }


                } catch (error) {

                    console.error(
                        "Checkout error:",
                        error
                    );

                    checkoutMessage.innerText =
                        error.message ||
                        "Something went wrong. Please try again.";

                }

            }

        );

    }

}
