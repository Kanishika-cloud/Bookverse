// ==========================================
// BOOKVERSE - BOOKS.JS
// MongoDB Backend Integration
// ==========================================


// STORE BOOKS FETCHED FROM MONGODB

let books = [];


// ==========================================
// DISPLAY BOOKS
// ==========================================

function displayBooks(bookList) {

    const bookContainer =
        document.getElementById("book-container");

    if (!bookContainer) {
        return;
    }

    bookContainer.innerHTML = "";


    bookList.forEach(function(book) {

        bookContainer.innerHTML += `

            <div class="book-card">

                <a href="book-details.html?id=${encodeURIComponent(book.id)}"
                   class="book-details-link">

                    <div class="book-cover">

                        <img
                            src="${book.image}"
                            alt="${book.title}"
                        >

                    </div>

                    <h2>${book.title}</h2>

                </a>

                <p>${book.author}</p>

                <h3>₹${book.price}</h3>

                <button
                    id="cart-btn-${book.id}"
                    onclick="addToCart('${book.id}')">

                    Add to Cart

                </button>

            </div>

        `;

    });

    updateCartButtons();

}


// ==========================================
// ADD BOOK TO CART
// ==========================================

function addToCart(id) {

    // CHECK LOGIN

    if (!currentUser) {
        return;
    }


    // FIND BOOK

    const book =
        books.find(function(item) {

            return String(item.id) === String(id);

        });


    if (!book) {
        return;
    }


    // CHECK IF BOOK ALREADY EXISTS IN CART

    const existingBook =
        cart.find(function(item) {

            return String(item.id) === String(id);

        });


    if (existingBook) {

        existingBook.quantity++;

    } else {

        cart.push({

            id: book.id,

            title: book.title,

            author: book.author,

            price: book.price,

            quantity: 1

        });

    }


    // SAVE CART

    saveCart();

    updateCartCount();


    // SHOW ADDED TO CART MESSAGE

    const button =
        document.getElementById("cart-btn-" + id);

    if (button) {

        button.textContent = "Added to Cart ✓";

        button.classList.add("added-to-cart");

        setTimeout(function() {

            button.textContent = "Add to Cart";

            button.classList.remove("added-to-cart");

        }, 1500);

    }

}


// ==========================================
// UPDATE CART BUTTONS
// ==========================================

function updateCartButtons() {

    // Buttons show temporary feedback after adding a book.

}


// ==========================================
// GENRE AND LANGUAGE DROPDOWNS
// ==========================================

const genreButton =
    document.getElementById("genre-button");

const languageButton =
    document.getElementById("language-button");


const genreDropdown =
    document.getElementById("genre-dropdown");

const languageDropdown =
    document.getElementById("language-dropdown");


// GENRE DROPDOWN

if (genreButton && genreDropdown && languageDropdown) {

    genreButton.addEventListener("click", function() {

        genreDropdown.classList.toggle("show");

        languageDropdown.classList.remove("show");

    });

}


// LANGUAGE DROPDOWN

if (languageButton && genreDropdown && languageDropdown) {

    languageButton.addEventListener("click", function() {

        languageDropdown.classList.toggle("show");

        genreDropdown.classList.remove("show");

    });

}


// ==========================================
// CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener("click", function(event) {

    if (
        !event.target.closest(".genre-menu") &&
        !event.target.closest(".language-menu")
    ) {

        if (genreDropdown) {

            genreDropdown.classList.remove("show");

        }

        if (languageDropdown) {

            languageDropdown.classList.remove("show");

        }

    }

});


// ==========================================
// FILTER BOOKS USING URL PARAMETERS
// ==========================================

function filterBooks() {

    const params =
        new URLSearchParams(window.location.search);


    const selectedGenre =
        params.get("genre");

    const selectedLanguage =
        params.get("language");


    let filteredBooks = books;


    // FILTER BY GENRE

    if (selectedGenre) {

        filteredBooks =
            filteredBooks.filter(function(book) {

                return book.genre === selectedGenre;

            });

    }


    // FILTER BY LANGUAGE

    if (selectedLanguage) {

        filteredBooks =
            filteredBooks.filter(function(book) {

                return book.language === selectedLanguage;

            });

    }


    const bookContainer =
        document.getElementById("book-container");


    if (bookContainer) {

        displayBooks(filteredBooks);


        // NO BOOKS FOUND MESSAGE

        if (filteredBooks.length === 0) {

            bookContainer.innerHTML = `

                <p class="no-books">
                    No books found in this category.
                </p>

            `;

        }

    }

}


// ==========================================
// LOAD BOOKS FROM MONGODB
// ==========================================

async function loadBooks() {

    const bookContainer =
        document.getElementById("book-container");


    if (!bookContainer) {
        return;
    }


    try {

        // FETCH BOOKS FROM BACKEND

        const response =
            await fetch("http://localhost:3000/api/books");


        if (!response.ok) {

            throw new Error("Could not fetch books");

        }


        const data =
            await response.json();


        // CHECK RESPONSE

        if (!Array.isArray(data)) {

            throw new Error("Invalid book data received");

        }


        // CONVERT MONGODB DOCUMENTS

        books = data.map(function(book) {

            return {

                ...book,

                // USE MONGODB ID

                id: book._id,

                // HANDLE BOOK IMAGES

                image: book.image
                    ? (
                        book.image.startsWith("http")
                            ? book.image
                            : `http://localhost:3000${book.image}`
                    )
                    : ""

            };

        });


        // DISPLAY FILTERED BOOKS

        filterBooks();


    } catch (error) {

        console.error("Error loading books:", error);


        // SHOW ERROR WITHOUT ALERT

        bookContainer.innerHTML = `

            <p class="no-books">
                Unable to load books. Please try again later.
            </p>

        `;

    }

}


// ==========================================
// LOAD BOOKS WHEN PAGE OPENS
// ==========================================

loadBooks();
