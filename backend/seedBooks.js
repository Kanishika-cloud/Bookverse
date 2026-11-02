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


require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book");

async function seedBooks() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB!");

        // Remove existing test records to prevent duplicates.
        // This clears the Book collection before adding the 20 books.
        await Book.deleteMany({});

        // Remove the frontend-only id field, if present.
        const booksToSave = books.map(function(book) {
            const { id, ...bookData } = book;
            return bookData;
        });

        await Book.insertMany(booksToSave);

        console.log(booksToSave.length + " books added successfully!");
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

seedBooks();