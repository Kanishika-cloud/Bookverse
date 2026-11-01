// GET QUIZ FORM

const quizForm =
    document.getElementById("quiz-form");

const quizResult =
    document.getElementById("quiz-result");

// CHECK LOGIN

if (!currentUser) {


    window.location.href = "index.html";

}

// CHECK IF QUIZ WAS ALREADY DONE
const savedTaste =
    localStorage.getItem(
        "bookTaste_" + currentUser.email
    );

if (savedTaste) {

    showResult(savedTaste);

}
// QUIZ SUBMIT


if (quizForm) {

    quizForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // GENRE SCORES

            let scores = {

                romcom: 0,

                thriller: 0,

                "science-fiction": 0,

                "non-fiction": 0

            };


            // GET ANSWERS

            const answers =
                new FormData(quizForm);


            // ADD SCORES

            for (let answer of answers.values()) {

                scores[answer]++;

            }


            // FIND HIGHEST SCORE

            let favouriteGenre =
                "romcom";

            let highestScore =
                scores.romcom;


            if (scores.thriller > highestScore) {

                favouriteGenre = "thriller";

                highestScore =
                    scores.thriller;

            }


            if (
                scores["science-fiction"]
                > highestScore
            ) {

                favouriteGenre =
                    "science-fiction";

                highestScore =
                    scores["science-fiction"];

            }


            if (
                scores["non-fiction"]
                > highestScore
            ) {

                favouriteGenre =
                    "non-fiction";

                highestScore =
                    scores["non-fiction"];

            }


            // SAVE BOOK TASTE

            localStorage.setItem(

                "bookTaste_" +
                currentUser.email,

                favouriteGenre

            );


            // SHOW RESULT

            showResult(favouriteGenre);

        }

    );

}
// SHOW RESULT


function showResult(genre) {


    let title = "";

    let description = "";


    if (genre === "romcom") {

        title =
            "You're a Rom-Com Reader 💕";

        description =
            "You enjoy warm stories, relationships, humour and characters you can connect with.";

    }


    else if (genre === "thriller") {

        title =
            "You're a Thriller Reader 🔍";

        description =
            "You love suspense, mysteries, unexpected twists and stories that keep you guessing.";

    }


    else if (genre === "science-fiction") {

        title =
            "You're a Sci-Fi Reader 🚀";

        description =
            "You enjoy futuristic worlds, big ideas, technology and adventures beyond the ordinary.";

    }


    else if (genre === "non-fiction") {

        title =
            "You're a Non-Fiction Reader 📚";

        description =
            "You enjoy learning, real-life stories, ideas and books that give you something new to think about.";

    }


    // HIDE QUESTIONS
    quizForm.style.display = "none";
    // SHOW RESULT

    quizResult.innerHTML = `

        <span>
            YOUR BOOKVERSE TASTE
        </span>

        <h2>
            ${title}
        </h2>

        <p>
            ${description}
        </p>


        <button
            onclick="showRecommendations('${genre}')">

            SHOW MY BOOKS

            <span>
                ↗
            </span>

        </button>


        <button
            class="retake-button"
            onclick="retakeQuiz()">

            RETAKE QUIZ

        </button>

    `;

}
// SHOW RECOMMENDED BOOKS
function showRecommendations(genre) {

    localStorage.setItem(
        "selectedGenre",
        genre
    );


    window.location.href =
        "books.html?genre=" + genre;

}
// RETAKE QUIZ
function retakeQuiz() {

    localStorage.removeItem(
        "bookTaste_" + currentUser.email
    );
    quizResult.innerHTML = "";
    quizForm.reset();
    quizForm.style.display = "block";

}
