document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // GET CHATBOT ELEMENTS
    // =========================================

    const toggle = document.getElementById("chatbot-toggle");
    const chatWindow = document.getElementById("chatbot-window");
    const closeButton = document.getElementById("chatbot-close");
    const chatForm = document.getElementById("chatbot-form");
    const chatInput = document.getElementById("chatbot-input");
    const messages = document.getElementById("chatbot-messages");

    if (!toggle || !chatWindow || !chatForm || !chatInput || !messages) {
        return;
    }


    // =========================================
    // OPEN AND CLOSE CHATBOT
    // =========================================

    toggle.addEventListener("click", function () {

        chatWindow.classList.toggle("active");

        if (chatWindow.classList.contains("active")) {
            chatInput.focus();
        }

    });

    closeButton.addEventListener("click", function () {
        chatWindow.classList.remove("active");
    });


    // =========================================
    // ESCAPE HTML
    // =========================================

    function escapeHTML(value) {

        return String(value ?? "").replace(/[&<>"']/g, function (char) {

            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];

        });

    }


    // =========================================
    // BOOK INFORMATION
    // =========================================

    function getBookText(book) {

        return [
            book.title,
            book.author,
            book.genre,
            book.category,
            book.language,
            book.description
        ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    }


    function getPrice(book) {

        const price = Number(book.price);

        return Number.isFinite(price) && book.price !== ""
            ? price
            : null;

    }


    function getCover(book) {

        return book.image || book.cover || book.imageUrl || "";

    }


    // =========================================
    // INTEREST KEYWORDS
    // =========================================

    const interestKeywords = {

        horror: [
            "horror",
            "scary",
            "ghost",
            "haunted",
            "supernatural",
            "dark",
            "paranormal",
            "creepy",
            "terrifying"
        ],

        romance: [
            "romance",
            "romantic",
            "love",
            "relationship",
            "romcom",
            "rom-com",
            "heartbreak",
            "couple"
        ],

        mystery: [
            "mystery",
            "detective",
            "crime",
            "suspense",
            "investigation",
            "murder"
        ],

        thriller: [
            "thriller",
            "suspense",
            "crime",
            "mystery",
            "detective",
            "psychological"
        ],

        fantasy: [
            "fantasy",
            "magic",
            "dragon",
            "adventure",
            "magical",
            "wizard"
        ],

        "self-growth": [
            "self-help",
            "self help",
            "growth",
            "mindset",
            "motivation",
            "productivity",
            "improvement"
        ],

        inspiring: [
            "inspiring",
            "inspiration",
            "motivation",
            "biography"
        ],

        science: [
            "science",
            "technology",
            "artificial intelligence",
            "programming"
        ],

        history: [
            "history",
            "historical",
            "biography"
        ],

        fiction: [
            "fiction",
            "novel",
            "story"
        ],

        hindi: ["hindi"],
        english: ["english"],
        punjabi: ["punjabi"],
        french: ["french"]

    };


    // =========================================
    // DETECT BUDGET
    // =========================================

    function findBudget(prompt) {

        const match = prompt.match(
            /(?:under|below|less than|within|budget of)\s*₹?\s*(\d+)|₹\s*(\d+)|\b(?:rs\.?|inr)\s*(\d+)/i
        );

        if (!match) {
            return null;
        }

        return Number(match[1] || match[2] || match[3]);

    }


    // =========================================
    // DETECT INTERESTS IN USER MESSAGE
    // =========================================

    function getDetectedInterests(prompt) {

        const lowerPrompt = prompt.toLowerCase();

        const detected = [];

        Object.keys(interestKeywords).forEach(interest => {

            const mentioned = interestKeywords[interest].some(keyword =>
                lowerPrompt.includes(keyword)
            );

            if (mentioned) {
                detected.push(interest);
            }

        });

        return detected;

    }


    // =========================================
    // SCORE BOOKS
    // =========================================

    function scoreBook(book, prompt, budget, interests) {

        const text = getBookText(book);

        const lowerPrompt = prompt.toLowerCase();

        let score = 0;

        const reasons = [];


        // Match genre and interest

        interests.forEach(interest => {

            const keywords = interestKeywords[interest];

            const matched = keywords.some(keyword =>
                text.includes(keyword)
            );

            if (matched) {

                score += 15;

                reasons.push("Matches your interest in " + interest);

            }

        });


        // Match other words

        const words = lowerPrompt
            .replace(/[₹,]/g, " ")
            .split(/\s+/)
            .filter(word => word.length > 3);

        words.forEach(word => {

            if (text.includes(word)) {
                score += 2;
            }

        });


        // Match budget

        const price = getPrice(book);

        if (budget !== null && price !== null) {

            if (price <= budget) {

                score += 5;

                reasons.push("Within your budget");

            } else {

                score -= 10;

            }

        }


        return {

            book: book,
            score: score,

            reason: reasons[0] ||
                "Matches your reading preferences"

        };

    }


    // =========================================
    // DISPLAY CHAT MESSAGE
    // =========================================

    function addMessage(content, sender) {

        const message = document.createElement("div");

        message.className = "chat-message " + sender;

        message.innerHTML = content;

        messages.appendChild(message);

        messages.scrollTop = messages.scrollHeight;

        return message;

    }


    // =========================================
    // DISPLAY RECOMMENDED BOOKS
    // =========================================

    function showRecommendations(prompt) {

        if (
            typeof books === "undefined" ||
            !Array.isArray(books) ||
            books.length === 0
        ) {

            addMessage(
                "Sorry! I couldn't access the book catalogue. Please check that books.js loads before curator.js.",
                "bot"
            );

            return;

        }


        const budget = findBudget(prompt);

        const interests = getDetectedInterests(prompt);


        // Score every book

        let recommendations = books.map(book =>

            scoreBook(book, prompt, budget, interests)

        );


        // Sort by highest score

        recommendations.sort((a, b) => b.score - a.score);


        // Keep only books matching the requested interest

        if (interests.length > 0) {

            recommendations = recommendations.filter(item =>
                item.score > 0
            );

        }


        // Apply budget filter

        if (budget !== null) {

            recommendations = recommendations.filter(item => {

                const price = getPrice(item.book);

                return price !== null && price <= budget;

            });

        }


        // No matching books

        if (recommendations.length === 0) {

            let message = "I couldn't find an exact match in our current catalogue. ";

            if (interests.length > 0) {

                message += "We may not currently have books in that category. ";

            } else if (budget !== null) {

                message += "I couldn't find books within ₹" + budget + ". ";

            }

            message += "Try another genre or a different budget. 📚";

            addMessage(escapeHTML(message), "bot");

            return;

        }


        // Show maximum three recommendations

        recommendations = recommendations.slice(0, 3);


        let response = "Here are some books I think you might enjoy! ✨";

        if (budget !== null) {

            response += " I've considered your budget of ₹" + budget + ".";

        }


        let html = escapeHTML(response);


        // Generate book cards

        recommendations.forEach(item => {

            const book = item.book;

            const price = getPrice(book);

            const cover = getCover(book);


            html += `

                <div class="chat-book-card">

                    ${
                        cover

                            ? `<img
                                src="${escapeHTML(cover)}"
                                alt="${escapeHTML(book.title)} cover"
                                loading="lazy"
                            >`

                            : `<div class="chat-book-placeholder">
                                B
                            </div>`
                    }


                    <div class="chat-book-info">

                        <h4>
                            ${escapeHTML(book.title)}
                        </h4>

                        <p>
                            ${escapeHTML(book.author || "Unknown author")}
                        </p>

                        <div class="chat-book-price">

                            ${
                                price !== null
                                    ? "₹" + price
                                    : "Price unavailable"
                            }

                        </div>


                        <div class="chat-book-actions">

                            <button
                                type="button"
                                data-chat-cart="${escapeHTML(book.id)}">

                                Add to Cart

                            </button>


                            <button
                                type="button"
                                class="chat-save"
                                data-chat-save="${escapeHTML(book.id)}">

                                ♡ Save

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });


        addMessage(html, "bot");

    }


    // =========================================
    // HANDLE USER MESSAGE
    // =========================================

    function handleMessage(prompt) {

        const text = prompt.trim();

        if (!text) return;


        // Show user message

        addMessage(escapeHTML(text), "user");


        const lower = text.toLowerCase();


        // Greeting

        if (/^(hi|hello|hey|hii|good morning|good evening)\b/.test(lower)) {

            addMessage(
                "Hello! Welcome to BookVerse! 📚 Tell me what kind of books you enjoy, and I'll help you find your next favourite read.",
                "bot"
            );

            return;

        }


        // Help

        if (
            lower.includes("what can you do") ||
            lower.includes("help me") ||
            lower.includes("how do you work")
        ) {

            addMessage(

                "I can help you discover books! ✦<br><br>" +

                "• Recommend horror and romance books<br>" +
                "• Find mystery and thriller books<br>" +
                "• Suggest fantasy adventures<br>" +
                "• Find books within your budget<br>" +
                "• Explore different languages<br><br>" +

                "Try asking: 'Suggest a horror book under ₹500'.",

                "bot"

            );

            return;

        }


        // Catalogue count

        if (
            lower.includes("how many books") ||
            lower.includes("show all books")
        ) {

            if (typeof books !== "undefined" && Array.isArray(books)) {

                addMessage(

                    "We currently have " + books.length +

                    " books in our catalogue! Ask me about a genre or budget to find your perfect read.",

                    "bot"

                );

            } else {

                addMessage(
                    "I couldn't access the book catalogue right now.",
                    "bot"
                );

            }

            return;

        }


        // Book recommendations

        showRecommendations(text);

    }


    // =========================================
    // SEND CHAT MESSAGE
    // =========================================

    chatForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const prompt = chatInput.value.trim();

        if (!prompt) return;

        chatInput.value = "";

        handleMessage(prompt);

    });


    // =========================================
    // QUICK SUGGESTION BUTTONS
    // =========================================

    document.querySelectorAll("[data-chat-prompt]").forEach(button => {

        button.addEventListener("click", function () {

            const prompt = this.getAttribute("data-chat-prompt");

            handleMessage(prompt);

        });

    });


    // =========================================
    // ADD TO CART AND SAVE TO PASSPORT
    // =========================================

    messages.addEventListener("click", function (event) {

        const cartButton = event.target.closest("[data-chat-cart]");

        const saveButton = event.target.closest("[data-chat-save]");


        // ADD TO CART

        if (cartButton) {

            const bookId = cartButton.getAttribute("data-chat-cart");


            if (typeof currentUser === "undefined" || !currentUser) {

                addMessage(
                    "Please sign in to add books to your cart. Use the SIGN IN button at the top of the page.",
                    "bot"
                );

                return;

            }


            const selectedBook = books.find(book =>
                String(book.id) === String(bookId)
            );


            if (selectedBook && typeof addToCart === "function") {

                addToCart(selectedBook.id);

                cartButton.textContent = "✓ Added";

                cartButton.disabled = true;

            } else {

                addMessage(
                    "Sorry, I couldn't add that book to your cart.",
                    "bot"
                );

            }

        }


        // SAVE TO READING PASSPORT

        if (saveButton) {

            const bookId = saveButton.getAttribute("data-chat-save");


            if (typeof currentUser === "undefined" || !currentUser) {

                addMessage(
                    "Please sign in before saving books to your Reading Passport.",
                    "bot"
                );

                return;

            }


            const selectedBook = books.find(book =>
                String(book.id) === String(bookId)
            );


            if (selectedBook && typeof saveToPassport === "function") {

                saveToPassport(selectedBook.id);

                saveButton.textContent = "✓ Saved";

                saveButton.disabled = true;

            } else {

                addMessage(
                    "Sorry, I couldn't save that book to your Reading Passport.",
                    "bot"
                );

            }

        }

    });


    // =========================================
    // INITIAL CHATBOT MESSAGE
    // =========================================

    addMessage(

        "Welcome to BookVerse! 📚 I'm your personal book guide. What would you like to read today?",

        "bot"

    );

});
