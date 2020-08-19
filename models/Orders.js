const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    }
})

const OrderShema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    client: {
        type: String
    },
    products: [ProductSchema],
    status: {
        type: String,
        enum: [
            'pending',
            'canceled',
            'delivering',
            'delivered'
        ]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    dateProcessed: {
        type: Date
    }
})



module.exports = mongoose.model('Order', OrderShema)