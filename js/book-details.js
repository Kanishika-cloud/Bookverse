// Book descriptions
const bookDescriptions = {

    1: "The Alchemist by Paulo Coelho follows the journey of Santiago, a young shepherd who travels in search of a hidden treasure. Along the way, he discovers lessons about dreams, destiny, courage and listening to your heart.",

    2: "Atomic Habits by James Clear explains how small, consistent changes can lead to remarkable improvements. It shares practical strategies for building good habits, breaking bad ones and making positive changes last.",

    3: "Ikigai explores the Japanese idea of finding your reason for living. The book discusses purpose, happiness, healthy living and the habits that can help people lead a meaningful life.",

    4: "The Psychology of Money by Morgan Housel explores how emotions and behaviour influence financial decisions. Through engaging stories, it explains saving, investing, wealth and the importance of making sensible money choices.",

    5: "The Great Gatsby by F. Scott Fitzgerald is a classic novel set in the Jazz Age. It explores wealth, love, ambition and the American Dream through the mysterious life of Jay Gatsby.",

    6: "Pride and Prejudice by Jane Austen follows Elizabeth Bennet as she navigates relationships, family expectations and social class. It is a timeless story about love, misunderstandings and personal growth.",

    7: "The Silent Patient by Alex Michaelides is a psychological thriller about Alicia Berenson, a painter who suddenly stops speaking after a shocking incident. A psychotherapist becomes determined to uncover her secret.",

    8: "Gone Girl by Gillian Flynn is a psychological thriller about a woman who mysteriously disappears and the husband who becomes the centre of the investigation. The story explores relationships, deception and unexpected twists.",

    9: "The Da Vinci Code by Dan Brown follows Robert Langdon as he investigates a mysterious murder connected to secret symbols, historical clues and hidden mysteries.",

    10: "Dune by Frank Herbert is an epic science-fiction novel set on the desert planet Arrakis. It follows Paul Atreides as he becomes involved in a struggle involving power, politics and survival.",

    11: "Project Hail Mary by Andy Weir follows an astronaut who wakes up alone on a spacecraft with no memory of his mission. He must use science and problem-solving to face an extraordinary challenge.",

    12: "The Fault in Our Stars by John Green tells the emotional story of Hazel and Augustus, two teenagers who meet at a cancer support group. It explores love, friendship, hope and the meaning of life.",

    13: "Me Before You by Jojo Moyes follows Louisa Clark, who becomes a caregiver for Will Traynor. Their relationship changes both their lives and explores love, choices and finding happiness.",

    14: "The 7 Habits of Highly Effective People by Stephen R. Covey presents practical principles for personal and professional effectiveness. It focuses on responsibility, priorities, relationships and continuous improvement.",

    15: "Rich Dad Poor Dad by Robert Kiyosaki shares lessons about money, financial education, assets and liabilities. It encourages readers to think differently about earning, saving and building wealth.",

    16: "Sapiens by Yuval Noah Harari explores the history of humankind, from early humans to modern societies. It examines how culture, agriculture, money and ideas shaped the world.",

    17: "Godaan by Munshi Premchand is a classic Hindi novel that portrays rural Indian life, poverty, social inequality and the struggles of farmers through the life of Hori.",

    18: "Raag Darbari by Shri Lal Shukla is a celebrated Hindi satirical novel that explores village politics, corruption, social structures and everyday life in rural India.",

    19: "Pinjar by Amrita Pritam is a powerful Punjabi novel set during the Partition of India. It explores identity, displacement, suffering and the lives of women during a difficult period in history.",

    20: "Madame Bovary by Gustave Flaubert is a classic French novel about Emma Bovary, a woman dissatisfied with her provincial life who seeks excitement and romance beyond her circumstances."

};


// Get book ID from URL
const urlParams = new URLSearchParams(window.location.search);

const bookId = Number(urlParams.get("id"));


// Find the selected book
const selectedBook = books.find(function(book) {
    return book.id === bookId;
});


// Display selected book
function displayBookDetails() {

    const container =
        document.getElementById("book-details-container");

    if (!container) {
        return;
    }

    if (!selectedBook) {

        container.innerHTML = `
            <div class="book-not-found">
                <h2>Book Not Found</h2>

                <p>Sorry, we could not find this book.</p>

                <a href="books.html">
                    Explore Other Books
                </a>
            </div>
        `;

        return;
    }

    const description =
        bookDescriptions[selectedBook.id] ||
        "Discover this interesting book and explore its story.";

    container.innerHTML = `

        <div class="book-details-content">

            <div class="details-book-image">

                <img
                    src="${selectedBook.image}"
                    alt="${selectedBook.title}"
                >

            </div>


            <div class="details-book-info">

                <p class="details-label">
                    BOOKVERSE COLLECTION
                </p>

                <h1>${selectedBook.title}</h1>

                <p class="details-author">
                    By ${selectedBook.author}
                </p>

                <div class="details-tags">

                    <span>${selectedBook.genre}</span>

                    <span>${selectedBook.language}</span>

                </div>

                <div class="details-divider"></div>

                <h3>About This Book</h3>

                <p class="book-description">
                    ${description}
                </p>

                <div class="details-divider"></div>

                <div class="details-price">

                    <p>Price</p>

                    <h2>₹${selectedBook.price}</h2>

                </div>

                <button
                    id="cart-btn-${selectedBook.id}"
                    class="details-add-cart"
                    onclick="addToCart(${selectedBook.id})">

                    Add to Cart

                </button>

                <p class="details-note">
                    A great read is just one click away.
                </p>

            </div>

        </div>

    `;

}


// Run the function
displayBookDetails();