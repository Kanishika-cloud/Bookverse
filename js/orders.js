// GET ORDERS CONTAINER
const ordersContainer = document.getElementById("orders-container");

// LOAD USER ORDERS
async function loadOrders() {

    const token = localStorage.getItem("token");

    // CHECK LOGIN
    if (!token) {
        window.location.href = "books.html";
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/orders/my-orders",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not load your orders.");
        }

        displayOrders(data);

    } catch (error) {

        console.error("Orders error:", error);

        ordersContainer.innerHTML = `
            <div class="orders-empty">
                <h2>Unable to load orders.</h2>
                <p>${escapeHTML(error.message)}</p>
            </div>
        `;

    }
}


// PREVENT HTML FROM BEING INSERTED AS CODE
function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, function(character) {

        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return characters[character];

    });

}


// DISPLAY ORDERS
function displayOrders(orders) {

    ordersContainer.innerHTML = "";

    // CHECK IF USER HAS ANY ORDERS
    if (!orders || orders.length === 0) {

        ordersContainer.innerHTML = `
            <div class="orders-empty">
                <h2>No orders yet.</h2>
                <p>Your next favourite story is waiting for you.</p>
                <a href="books.html" class="orders-shop-button">
                    EXPLORE BOOKS
                </a>
            </div>
        `;

        return;
    }


    // DISPLAY EACH ORDER
    orders.forEach(function(order) {

        const orderDate = new Date(order.createdAt).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

        let bookList = "";

        order.items.forEach(function(item) {

            bookList += `
                <div class="order-book">

                    <div>
                        <strong>${escapeHTML(item.title)}</strong>
                        <p>${escapeHTML(item.author)}</p>
                    </div>

                    <span>
                        ${item.quantity} × ₹${item.price}
                    </span>

                </div>
            `;

        });


        ordersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-top">

                    <div>
                        <span class="order-label">ORDER PLACED</span>
                        <p>${orderDate}</p>
                    </div>

                    <div>
                        <span class="order-label">ORDER ID</span>
                        <p>${escapeHTML(order._id)}</p>
                    </div>

                </div>


                <div class="order-books">

                    <h3>Books in this order</h3>

                    ${bookList}

                </div>


                <div class="order-bottom">

                    <div>
                        <span class="order-label">PAYMENT</span>
                        <p>${escapeHTML(order.paymentMethod.toUpperCase())}</p>
                        <small>
                            ${escapeHTML(order.paymentStatus)}
                        </small>
                    </div>

                    <div>
                        <span class="order-label">STATUS</span>
                        <p>${escapeHTML(order.orderStatus)}</p>
                    </div>

                    <div>
                        <span class="order-label">TOTAL</span>
                        <h3>₹${Number(order.total).toFixed(2)}</h3>
                    </div>

                </div>

            </div>

        `;

    });

}


// LOAD ORDERS WHEN PAGE OPENS
loadOrders();