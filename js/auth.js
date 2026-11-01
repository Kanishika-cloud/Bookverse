const loginButton =
    document.getElementById("login-button");

const loginPopup =
    document.getElementById("login-popup");

const closeLogin =
    document.getElementById("close-login");


if (loginButton) {

    loginButton.addEventListener("click", function() {

        loginPopup.style.display = "flex";

    });

}
if (closeLogin) {

    closeLogin.addEventListener("click", function() {

        loginPopup.style.display = "none";

    });

}
// SIGNUP POPUP
const signupPopup =
    document.getElementById("signup-popup");

const showSignup =
    document.getElementById("show-signup");

const closeSignup =
    document.getElementById("close-signup");


if (showSignup) {

    showSignup.addEventListener("click", function() {

        loginPopup.style.display = "none";

        signupPopup.style.display = "flex";

    });

}


if (closeSignup) {

    closeSignup.addEventListener("click", function() {

        signupPopup.style.display = "none";

    });

}
// GO BACK TO LOGIN
const showLogin =
    document.getElementById("show-login");


if (showLogin) {

    showLogin.addEventListener("click", function() {

        signupPopup.style.display = "none";

        loginPopup.style.display = "flex";

    });

}


// SIGN UP
const signupForm =
    document.getElementById("signup-form");


if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("signup-name").value;

        const email =
            document.getElementById("signup-email").value;

        const password =
            document.getElementById("signup-password").value;

        if (
            !email.includes("@") || (!email.endsWith(".com") && !email.endsWith(".in"))
        ) {

            document.getElementById(
                "signup-message"
            ).innerText =
                "Please enter a valid email with @ and .com or .in.";

            return;

        }

        const hasLetter = /[A-Za-z]/.test(password);

        const hasNumber = /[0-9]/.test(password);


        if (password.length < 6) {

            document.getElementById(
                "signup-message"
            ).innerText =
                "Password must be at least 6 characters.";

            return;

        }


        if (!hasLetter || !hasNumber) {

            document.getElementById(
                "signup-message"
            ).innerText =
                "Password must contain letters and numbers.";

            return;

        }

        const userExists =
            users.find(function(user) {

                return user.email === email;

            });


        if (userExists) {

            document.getElementById(
                "signup-message"
            ).innerText =
                "This email is already registered.";

            return;

        }

        // CREATE NEW USER

        const newUser = {
            name: name,
            email: email,
            password: password

        };


        // ADD USER

        users.push(newUser);


        // SAVE USER

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        document.getElementById(
            "signup-message"
        ).innerText =
            "Account created successfully!";


        signupForm.reset();

    });

}



const loginForm =
    document.getElementById("login-form");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("login-email").value;

        const password =
            document.getElementById("login-password").value;

        const user =
            users.find(function(user) {

                return user.email === email && user.password === password;

            });


        if (user) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            document.getElementById(
                "login-message"
            ).innerText =
                "Login successful!";


            setTimeout(function() {

                loginPopup.style.display = "none";


                // CHECK IF USER HAS TAKEN THE QUIZ

                const bookTaste =
                    localStorage.getItem(
                        "bookTaste_" + user.email
                    );


                if (!bookTaste) {

                    window.location.href =
                        "quiz.html";

                }

                else {

                    window.location.reload();

                }

            }, 500);

        }

        else {

            document.getElementById(
                "login-message"
            ).innerText =
                "Wrong email or password.";

        }

    });

}



// LOGOUT

function logout() {

    localStorage.removeItem("currentUser");

    window.location.reload();

}

// SHOW USER IN NAVBAR

const userArea =
    document.getElementById("user-area");


if (userArea) {

    if (currentUser) {

        userArea.innerHTML = `

            <span>
                Hi, ${currentUser.name}
            </span>

            <button onclick="logout()">
                Logout
            </button>

        `;


        if (loginButton) {

            loginButton.style.display = "none";

        }

    }

}