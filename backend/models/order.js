const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            },

            title: String,
            author: String,

            price: {
                type: Number,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    total: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["cod", "upi", "card"],
        required: true
    },

    paymentStatus: {
        type: String,
        default: "pending"
    },

    orderStatus: {
        type: String,
        default: "placed"
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);