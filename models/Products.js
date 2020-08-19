const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,

    },
    type: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', ProductsSchema);