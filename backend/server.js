require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Book = require("./models/book");
const User = require("./models/user");

const app = express();

const Order = require("./models/order");

const verifyToken = require("./middleware/authMiddleware");
const verifyAdmin = require("./middleware/adminMiddleware");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// HOME ROUTE
app.get("/", (req, res) => {
    res.send("BookVerse backend is working");
});


// CREATE UPLOADS FOLDER IF IT DOES NOT EXIST
const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// MULTER STORAGE CONFIGURATION
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder);
    },

    filename: function(req, file, cb) {
        const extension = path.extname(file.originalname);
        const filename = Date.now() + extension;

        cb(null, filename);
    }
});

// ACCEPT ONLY IMAGE FILES
const fileFilter = function(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed."));
    }
};

// MULTER UPLOAD CONFIGURATION
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// GET ALL BOOKS
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching books"
        });
    }
});

 // ADD A NEW BOOK (ADMIN ONLY)
app.post("/api/books", verifyToken, verifyAdmin, upload.single("image"), async (req, res) => {
    try {
        const { title, author, price, genre, language } = req.body;

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : req.body.image;

        // Check required fields
        if (!title || !author || price === undefined || price === null || price === "") {
            return res.status(400).json({
                message: "Title, author and price are required."
            });
        }

        // Check that price is a valid number
        if (!Number.isFinite(Number(price)) || Number(price) < 0) {
            return res.status(400).json({
                message: "Price must be a valid, non-negative number."
            });
        }

        // Save the new book in MongoDB
        const newBook = await Book.create({
            title: title.trim(),
            author: author.trim(),
            price: Number(price),
            genre,
            language,
            image
        });

        res.status(201).json({
            message: "Book added successfully!",
            book: newBook
        });

    } catch (error) {
        console.error("Add book error:", error.message);

        res.status(500).json({
            message: "Could not add the book."
        });
    }
});


 // EDIT AN EXISTING BOOK (ADMIN ONLY)
app.put("/api/books/:id", verifyToken, verifyAdmin, upload.single("image"), async (req, res) => {
    try {
        const { title, author, price, genre, language } = req.body;

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : req.body.image;

        // Find the book using its ID
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        // Update only the fields provided
        if (title !== undefined) {
            if (typeof title !== "string" || !title.trim()) {
                return res.status(400).json({
                    message: "Title cannot be empty."
                });
            }
            book.title = title.trim();
        }

        if (author !== undefined) {
            if (typeof author !== "string" || !author.trim()) {
                return res.status(400).json({
                    message: "Author cannot be empty."
                });
            }
            book.author = author.trim();
        }

        if (price !== undefined) {
            if (
                price === "" ||
                !Number.isFinite(Number(price)) ||
                Number(price) < 0
            ) {
                return res.status(400).json({
                    message: "Price must be a valid, non-negative number."
                });
            }
            book.price = Number(price);
        }

        if (genre !== undefined) book.genre = genre;
        if (language !== undefined) book.language = language;
        if (image !== undefined) book.image = image;

        // Save the updated book
        await book.save();

        res.json({
            message: "Book updated successfully!",
            book: book
        });

    } catch (error) {
        // Invalid MongoDB ID
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID."
            });
        }

        console.error("Update book error:", error.message);

        res.status(500).json({
            message: "Could not update the book."
        });
    }
});

 // DELETE A BOOK (ADMIN ONLY)
app.delete("/api/books/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        res.json({
            message: "Book deleted successfully!"
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID."
            });
        }

        console.error("Delete book error:", error.message);

        res.status(500).json({
            message: "Could not delete the book."
        });
    }
});

// PLACE ORDER (LOGIN REQUIRED)
app.post("/api/orders", verifyToken, async (req, res) => {
    try {
        const {
            name,
            email,
            address,
            pincode,
            paymentMethod,
            items
        } = req.body;

        // CHECK REQUIRED DETAILS
        if (!name || !email || !address || !pincode || !paymentMethod) {
            return res.status(400).json({
                message: "Please fill in all checkout details."
            });
        }

        // CHECK PIN CODE
        if (!/^[0-9]{6}$/.test(pincode)) {
            return res.status(400).json({
                message: "Please enter a valid 6 digit PIN code."
            });
        }

        // CHECK PAYMENT METHOD
        if (!["cod", "upi", "card"].includes(paymentMethod)) {
            return res.status(400).json({
                message: "Invalid payment method."
            });
        }

        // CHECK CART ITEMS
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty."
            });
        }

        // VALIDATE BOOK IDS AND QUANTITIES
        for (const item of items) {
            if (
                !item.bookId ||
                !mongoose.Types.ObjectId.isValid(item.bookId) ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                return res.status(400).json({
                    message: "Invalid book or quantity in cart."
                });
            }
        }

        // FIND BOOKS IN MONGODB
        const bookIds = items.map(item => item.bookId);

        const books = await Book.find({
            _id: { $in: bookIds }
        });

        if (books.length !== new Set(bookIds.map(String)).size) {
            return res.status(400).json({
                message: "One or more books could not be found."
            });
        }

        // CREATE ORDER ITEMS USING DATABASE PRICES
        let total = 0;

        const orderItems = items.map(item => {
            const book = books.find(
                book => book._id.toString() === item.bookId
            );

            const itemTotal = book.price * item.quantity;
            total += itemTotal;

            return {
                book: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
                quantity: item.quantity
            };
        });

        // SAVE ORDER
        const newOrder = await Order.create({
            user: req.userId,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            address: address.trim(),
            pincode: pincode,
            items: orderItems,
            total: total,
            paymentMethod: paymentMethod
        });

        res.status(201).json({
            message: "Order placed successfully!",
            order: newOrder
        });

    } catch (error) {
        console.error("Place order error:", error.message);

        res.status(500).json({
            message: "Could not place your order."
        });
    }
});


// GET MY ORDERS (LOGIN REQUIRED)
app.get("/api/orders/my-orders", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.userId
        }).sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        console.error("Fetch orders error:", error.message);

        res.status(500).json({
            message: "Could not fetch your orders."
        });
    }
});

// SIGNUP ROUTE
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields."
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        if (
            !cleanEmail.includes("@") ||
            (!cleanEmail.endsWith(".com") &&
             !cleanEmail.endsWith(".in"))
        ) {
            return res.status(400).json({
                message: "Please enter a valid email."
            });
        }

        if (
            password.length < 6 ||
            !/[A-Za-z]/.test(password) ||
            !/[0-9]/.test(password)
        ) {
            return res.status(400).json({
                message:
                    "Password must contain at least 6 characters, including letters and numbers."
            });
        }

        const existingUser = await User.findOne({
            email: cleanEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "This email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: cleanEmail,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Account created successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "This email is already registered."
            });
        }

        console.error("Signup error:", error.message);

        res.status(500).json({
            message: "Could not create account."
        });
    }
});

// LOGIN ROUTE
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter your email and password."
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Wrong email or password."
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Wrong email or password."
            });
        }

        const token = jwt.sign(
            {
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful!",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            message: "Could not log in."
        });
    }
});



app.get("/api/auth/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch user details."
        });
    }
});



// CONNECT TO MONGODB AND START SERVER
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(process.env.PORT || 3000, () => {
            console.log("BookVerse server is running!");
        });
    })
    .catch((error) => {
        console.log(
            "MongoDB connection failed:",
            error.message
        );
    });