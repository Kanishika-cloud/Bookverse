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

if (!currentUser) {

    window.location.href = "books.html";

}


// CHECK EMPTY CART

if (!cart || cart.length === 0) {

    window.location.href = "cart.html?empty=true";

}


// DISPLAY ORDER

function displayCheckout() {

    if (!checkoutItems || !checkoutTotal) {
        return;
    }

    checkoutItems.innerHTML = "";

    if (!cart || cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your cart is empty.</p>";

        checkoutTotal.innerText = 0;

        return;

    }

    let total = 0;

    cart.forEach(function(item) {

        total += item.price * item.quantity;

        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <div>

                    <strong>
                        ${item.title}
                    </strong>

                    <p>
                        ${item.author}
                    </p>

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
        function(event) {

            event.preventDefault();


            // CHECK EMPTY CART AGAIN

            if (!cart || cart.length === 0) {

                checkoutMessage.innerText =
                    "Your cart is empty! Please add books first.";

                window.location.href = "cart.html";

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


            // PIN CODE VALIDATION

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


            // CREATE ORDER

            const order = {

                name: name,

                email: email,

                address: address,

                pincode: pincode,

                payment: payment,

                items: cart,

                total: Number(
                    checkoutTotal.innerText
                ),

                date: new Date().toLocaleString()

            };


            // SAVE ORDER

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );


            // EMPTY CART

            cart = [];

            saveCart();


            // SHOW SUCCESS MESSAGE

            checkoutMessage.innerText =
                "Order placed successfully!";


            // RESET FORM

            checkoutForm.reset();


            // UPDATE SUMMARY

            displayCheckout();

        }

    );

}
