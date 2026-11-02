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

const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;

        const message = document.getElementById("signup-message");

        if (
            !email.includes("@") ||
            (!email.toLowerCase().endsWith(".com") &&
             !email.toLowerCase().endsWith(".in"))
        ) {
            message.innerText =
                "Please enter a valid email with @ and .com or .in.";
            return;
        }

        if (password.length < 6) {
            message.innerText =
                "Password must be at least 6 characters.";
            return;
        }

        if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
            message.innerText =
                "Password must contain letters and numbers.";
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                message.innerText = data.message || "Signup failed.";
                return;
            }

            message.innerText = "Account created successfully!";
            signupForm.reset();

        } catch (error) {
            console.error("Signup error:", error);
            message.innerText =
                "Unable to connect to the server. Please try again.";
        }
    });
}





const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        const message = document.getElementById("login-message");

        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                message.innerText = data.message || "Login failed.";
                return;
            }

            // Save the token separately from the user details
            localStorage.setItem("token", data.token);

            // Do not save the password in localStorage
            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            message.innerText = "Login successful!";

            setTimeout(function() {
                loginPopup.style.display = "none";

                // Check whether the user has taken the quiz
                const bookTaste = localStorage.getItem(
                    "bookTaste_" + data.user.email
                );

                if (!bookTaste) {
                    window.location.href = "quiz.html";
                } else {
                    window.location.reload();
                }
            }, 500);

        } catch (error) {
            console.error("Login error:", error);
            message.innerText =
                "Unable to connect to the server. Please try again.";
        }
    });
}



// LOGOUT

function logout() {

    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");

    window.location.reload();

}

// SHOW USER IN NAVBAR

function updateNavbar() {
    const userArea = document.getElementById("user-area");
    const loginButton = document.getElementById("login-button");

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!userArea) {
        return;
    }

    if (currentUser) {
        userArea.innerHTML = `
            <span>Hi, ${currentUser.name}</span>
            <button onclick="logout()">Logout</button>
        `;

        if (loginButton) {
            loginButton.style.display = "none";
        }
    } else {
        userArea.innerHTML = "";

        if (loginButton) {
            loginButton.style.display = "";
        }
    }
}

updateNavbar();



async function verifyLogin() {
    const token = localStorage.getItem("token");

    // If there is no token, there is no session to verify
    if (!token) {
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:3000/api/auth/me",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) {
            // Token is invalid or expired
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            updateNavbar();
            window.location.reload();
            return;
        }

        const data = await response.json();

        // Refresh the user details using the backend response
        localStorage.setItem(
            "currentUser",
            JSON.stringify(data.user)
        );
        updateNavbar();

    } catch (error) {
        console.error("Session verification error:", error);
    }
}

verifyLogin();