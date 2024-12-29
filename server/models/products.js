
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    category: {
        type: String, 
        required: true
    },
    brand: {
        type: String, 
        required: true
    },
    model: {
        type: String, 
        required: true
    },
    year: {
        type: Number, 
        required: true
    },
    kilometers: {
        type: Number,
        required: true
    },
    no_owners: {
        type: Number,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mobile_no: {
        type: Number,
        required: true
    },
    images: {
        type: String
    }
})

module.exports = mongoose.model('products',productSchema)