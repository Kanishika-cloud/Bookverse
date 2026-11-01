// =====================================
// BOOKVERSE — READING PASSPORT
// =====================================

const passportUserArea = document.getElementById("user-area");
const passportMessage = document.getElementById("passport-message");
const shelfForm = document.getElementById("shelf-form");
const shelfSelect = document.getElementById("shelf-book");
const shelfGrid = document.getElementById("passport-shelf-grid");
const goalForm = document.getElementById("goal-form");

let passportData = {
    goal: 5,
    shelf: []
};

// Each user gets a separate Reading Passport.
function getPassportKey() {
    return "readingPassport_" + currentUser.email.toLowerCase();
}

function loadPassport() {
    if (!currentUser) {
        return;
    }

    const savedData = localStorage.getItem(getPassportKey());

    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);

            passportData = {
                goal: Number(parsedData.goal) || 5,
                shelf: Array.isArray(parsedData.shelf)
                    ? parsedData.shelf
                    : []
            };
        } catch (error) {
            passportData = { goal: 5, shelf: [] };
        }
    }
}

function savePassport() {
    if (!currentUser) {
        showPassportMessage("Please sign in to save your Reading Passport.");
        return false;
    }

    localStorage.setItem(getPassportKey(), JSON.stringify(passportData));
    return true;
}

function showPassportMessage(message) {
    if (passportMessage) {
        passportMessage.textContent = message;
    }
}

// Add a book to the user's personal bookshelf.
// This function can also be used by the AI curator later.
function saveToPassport(bookId) {
    if (!currentUser) {
        alert("Please sign in to save books to your Reading Passport.");
        return;
    }

    const alreadySaved = passportData.shelf.some(function(item) {
        return Number(item.id) === Number(bookId);
    });

    if (alreadySaved) {
        showPassportMessage("This book is already on your bookshelf.");
        return;
    }

    passportData.shelf.push({
        id: Number(bookId),
        status: "saved"
    });

    if (savePassport()) {
        renderPassport();
        showPassportMessage("Book added to your Reading Passport!");
    }
}

function changeBookStatus(bookId, status) {
    const item = passportData.shelf.find(function(book) {
        return Number(book.id) === Number(bookId);
    });

    if (!item) return;

    item.status = status;

    if (savePassport()) {
        renderPassport();
        showPassportMessage(
            status === "finished"
                ? "Wonderful! Book marked as finished."
                : "Reading status updated."
        );
    }
}

function removeFromPassport(bookId) {
    passportData.shelf = passportData.shelf.filter(function(item) {
        return Number(item.id) !== Number(bookId);
    });

    if (savePassport()) {
        renderPassport();
        showPassportMessage("Book removed from your bookshelf.");
    }
}

function renderPassport() {
    if (!shelfGrid) return;

    const finishedBooks = passportData.shelf.filter(function(item) {
        return item.status === "finished";
    }).length;

    document.getElementById("saved-count").textContent =
        passportData.shelf.length;

    document.getElementById("finished-count").textContent =
        finishedBooks;

    document.getElementById("goal-summary").textContent =
        finishedBooks + " / " + passportData.goal;

    document.getElementById("reading-goal").value =
        passportData.goal;

    const percentage = Math.min(
        100,
        Math.round((finishedBooks / passportData.goal) * 100)
    );

    document.getElementById("goal-progress").style.width =
        percentage + "%";

    document.getElementById("goal-caption").textContent =
        percentage >= 100
            ? "Goal achieved! You're a BookVerse explorer."
            : percentage + "% complete — keep turning pages.";

    // Achievements are based on actual bookshelf activity.
    const achievements = [
        {
            title: "First Chapter",
            description: "Save your first book.",
            unlocked: passportData.shelf.length >= 1,
            symbol: "✦"
        },
        {
            title: "The Finisher",
            description: "Finish your first book.",
            unlocked: finishedBooks >= 1,
            symbol: "✓"
        },
        {
            title: "Story Collector",
            description: "Save five books.",
            unlocked: passportData.shelf.length >= 5,
            symbol: "▤"
        },
        {
            title: "Book Explorer",
            description: "Finish five books.",
            unlocked: finishedBooks >= 5,
            symbol: "✧"
        },
        {
            title: "Goal Getter",
            description: "Reach your reading goal.",
            unlocked: finishedBooks >= passportData.goal,
            symbol: "★"
        }
    ];

    const achievementGrid = document.getElementById("achievement-grid");

    achievementGrid.innerHTML = achievements.map(function(item) {
        return `
            <article class="achievement-card ${item.unlocked ? "unlocked" : ""}">
                <span class="achievement-symbol">${item.symbol}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <small>${item.unlocked ? "UNLOCKED" : "LOCKED"}</small>
            </article>
        `;
    }).join("");

    // Fill the dropdown with the real BookVerse catalog.
    if (shelfSelect && shelfSelect.options.length <= 1) {
        books.forEach(function(book) {
            const option = document.createElement("option");
            option.value = book.id;
            option.textContent = book.title + " — " + book.author;
            shelfSelect.appendChild(option);
        });
    }

    if (passportData.shelf.length === 0) {
        shelfGrid.innerHTML = `
            <div class="passport-empty">
                <span>✦</span>
                <h3>Your next favourite is waiting.</h3>
                <p>Add a book from the catalog to begin your reading journey.</p>
            </div>
        `;
        return;
    }

    shelfGrid.innerHTML = passportData.shelf.map(function(item) {
        const book = books.find(function(bookItem) {
            return Number(bookItem.id) === Number(item.id);
        });

        if (!book) return "";

        const finished = item.status === "finished";

        return `
            <article class="passport-book-card">
                <div class="passport-book-cover">
                    <img src="${book.image}" alt="${book.title}">
                </div>

                <div class="passport-book-info">
                    <p class="passport-book-status">
                        ${finished ? "✓ FINISHED" : "CURRENTLY ON YOUR SHELF"}
                    </p>

                    <h3>${book.title}</h3>
                    <p>${book.author}</p>

                    <button
                        class="passport-status-button"
                        onclick="changeBookStatus(${book.id}, '${finished ? "saved" : "finished"}')">
                        ${finished ? "MARK AS UNREAD" : "MARK AS FINISHED"}
                    </button>

                    <button
                        class="passport-remove-button"
                        onclick="removeFromPassport(${book.id})">
                        REMOVE
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

// Save a new reading goal.
if (goalForm) {
    goalForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newGoal = Number(
            document.getElementById("reading-goal").value
        );

        if (!Number.isInteger(newGoal) || newGoal < 1 || newGoal > 100) {
            showPassportMessage("Choose a goal between 1 and 100 books.");
            return;
        }

        passportData.goal = newGoal;

        if (savePassport()) {
            renderPassport();
            showPassportMessage("Your reading goal has been saved.");
        }
    });
}

// Add a selected book to the bookshelf.
if (shelfForm) {
    shelfForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const bookId = Number(shelfSelect.value);

        if (!bookId) {
            showPassportMessage("Please choose a book first.");
            return;
        }

        saveToPassport(bookId);
        shelfForm.reset();
    });
}

// Display the signed-in user's name.
if (passportUserArea && currentUser) {
    passportUserArea.textContent = "Hi, " + currentUser.name;
}

if (!currentUser) {
    showPassportMessage(
        "Your Reading Passport is personal. Please sign in on the Explore page to save your progress."
    );

    if (shelfForm) {
        shelfForm.querySelector("button").disabled = true;
        shelfSelect.disabled = true;
    }

    if (goalForm) {
        goalForm.querySelector("button").disabled = true;
        document.getElementById("reading-goal").disabled = true;
    }
} else {
    loadPassport();
    renderPassport();
}