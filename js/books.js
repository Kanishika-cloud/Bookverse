
const books = [

    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 299,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT35UTqe-I5Id6J2F1KdueIn1ExIX3nMiNYM1ZmXBI08g&s=10",
        genre: "non-fiction",
        language: "english"
    },

    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 399,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ARDuN7MBoD9cPjB3KNIoSKTbxOyaz137jWK5yVscaw&s=10",
        genre: "non-fiction",
        language: "english"
    },

    {
        id: 3,
        title: "Ikigai",
        author: "Hector Garcia",
        price: 249,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnVW7BcWY6tHpBdlO-tD4v3DL44CaIo6Ec-SxNLcL9QQ&s=10",
        genre: "non-fiction",
        language: "english"
    },

    {
        id: 4,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 349,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4e8GZDve-S3E7Z9MWbnBg6DxpIBHTSNmmSdMV6wip4g&s=10",
        genre: "non-fiction",
        language: "english"
    },

    {
        id: 5,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 279,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTryQtHdFYSlxwv4U2jB0TlQ-a55uLtqvpNLDcbwkmHGw&s=10",
        genre: "classic",
        language: "english"
    },

    {
        id: 6,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 329,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovy_OmGZIEdyamtmV1ZD8rmgitXGKqSQpwl2fVLIIdQ&s",
        genre: "romcom",
        language: "english"
    },

    {
        id: 7,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 399,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ73A0NYridKjK30eNm8ZoWH4ZW_IhswUBdaCuQkMRsHw&s=10",
        genre: "thriller",
        language: "english"
    },

    {
        id: 8,
        title: "Gone Girl",
        author: "Gillian Flynn",
        price: 449,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT29EXxo0o7ovs7IFsxps2KcLkAmBKIYxXxynNQluagKw&s=10",
        genre: "thriller",
        language: "english"
    },

    {
        id: 9,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        price: 399,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFR0TSYqjS6mkHKGtMmEWHUgWnua4UKqAGYu6xhQbnQ&s",
        genre: "thriller",
        language: "english"
    },

    {
        id: 10,
        title: "Dune",
        author: "Frank Herbert",
        price: 499,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAF2Z5-w1qR8C57j871LaHuH7ef68suIBz7zRRG_WRA&s=10",
        genre: "science-fiction",
        language: "english"
    },

    {
        id: 11,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 449,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_miImJ-HoyZ46wihBi5cjDCCp_bO0mN_ykTM_CpoOA&s=10",
        genre: "science-fiction",
        language: "english"
    },

    {
        id: 12,
        title: "The Fault in Our Stars",
        author: "John Green",
        price: 299,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjre_2R1_5hEQtqhgGk8_9i4vPqjyYWeyLS2M4uXrK3g&s",
        genre: "romcom",
        language: "english"
    },

    {
        id: 13,
        title: "Me Before You",
        author: "Jojo Moyes",
        price: 349,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07qm9J7DGUij193dulfqzAQ46pQJqvct87rD_U4hvKQ&s=10",
        genre: "romcom",
        language: "english"
    },

    {
        id: 14,
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen R. Covey",
        price: 499,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDdjt4jv93WnnhXYn6YGznVbW6V3fpAEv4FIqPATG1Vg&s",
        genre: "non-fiction",
        language: "english"
    },

    {
        id: 15,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 349,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT2Zk6v_JxxB08JlN5xIkLORzjrUhJwBoVDb76jTL3Hg&s=10",
        genre: "non-fiction",
        language: "english"
    },

    {
        id: 16,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 499,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvpS0xBKwCh4CuRXkptnWH-YZ4lGo0XlFuaERQlfkcDA&s=10",
        genre: "non-fiction",
        language: "english"
    },

    {
        id: 17,
        title: "Godaan",
        author: "Munshi Premchand",
        price: 249,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2_oVcGT25HUHZ_rtHAbTyIp1lRtjpROfSRuEG7ydKGg&s",
        genre: "classic",
        language: "hindi"
    },

    {
        id: 18,
        title: "Raag Darbari",
        author: "Shri Lal Shukla",
        price: 299,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQpC2_WCcub3yYyIJ_XODVTqLzpEj0-009rYhbRKDnQ&s=10",
        genre: "classic",
        language: "hindi"
    },

    {
        id: 19,
        title: "Pinjar",
        author: "Amrita Pritam",
        price: 299,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4T3oe1RU3KqTEfQARy-qdr3G3EoxS_tURE3WGBnPWYA&s=10",
        genre: "classic",
        language: "punjabi"
    },

    {
        id: 20,
        title: "Madame Bovary",
        author: "Gustave Flaubert",
        price: 329,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFNxansjyJkvvsCCOM2HRkvA4ApG8LlWYXvPkgG0qYQ&s=10",
        genre: "classic",
        language: "french"
    }

];


// Display books
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

                <a href="book-details.html?id=${book.id}"
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
                    onclick="addToCart(${book.id})">

                    Add to Cart

                </button>

            </div>

        `;

    });

    updateCartButtons();

}


// Display all books initially
if (document.getElementById("book-container")) {

    displayBooks(books);

}


// Add a book to the cart

function addToCart(id) {

    if (!currentUser) {
        return;
    }

    const book = books.find(function(item) {
        return item.id === id;
    });

    if (!book) {
        return;
    }

    const existingBook = cart.find(function(item) {
        return item.id === id;
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

    saveCart();
    updateCartCount();

    const button = document.getElementById("cart-btn-" + id);

    if (button) {
        button.textContent = "Added to Cart ✓";
        button.classList.add("added-to-cart");

        setTimeout(function() {
            button.textContent = "Add to Cart";
            button.classList.remove("added-to-cart");
        }, 1500);
    }
}



// Update buttons for books already in the cart


function updateCartButtons() {
    // Buttons start as "Add to Cart".
    // The added message appears temporarily after clicking.
}



// Genre and language dropdowns
const genreButton =
    document.getElementById("genre-button");

const languageButton =
    document.getElementById("language-button");

const genreDropdown =
    document.getElementById("genre-dropdown");

const languageDropdown =
    document.getElementById("language-dropdown");


if (genreButton && genreDropdown && languageDropdown) {

    genreButton.addEventListener("click", function() {

        genreDropdown.classList.toggle("show");
        languageDropdown.classList.remove("show");

    });

}


if (languageButton && genreDropdown && languageDropdown) {

    languageButton.addEventListener("click", function() {

        languageDropdown.classList.toggle("show");
        genreDropdown.classList.remove("show");

    });

}


// Close dropdowns when clicking outside
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


// Read selected genre and language from the URL
const params =
    new URLSearchParams(window.location.search);

const selectedGenre =
    params.get("genre");

const selectedLanguage =
    params.get("language");


// Filter books
if (selectedGenre || selectedLanguage) {

    let filteredBooks = books;

    if (selectedGenre) {

        filteredBooks = filteredBooks.filter(function(book) {
            return book.genre === selectedGenre;
        });

    }

    if (selectedLanguage) {

        filteredBooks = filteredBooks.filter(function(book) {
            return book.language === selectedLanguage;
        });

    }

    const bookContainer =
        document.getElementById("book-container");

    if (bookContainer) {

        displayBooks(filteredBooks);

        if (filteredBooks.length === 0) {

            bookContainer.innerHTML = `

                <p class="no-books">
                    No books found in this category.
                </p>

            `;

        }

    }

}
