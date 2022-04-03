const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PasswordSchema = new Schema({
    FQDN: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    },
    update_date: {
        type: Date,
        required: false
    },
    expiration_date: {
        type: Date,
        required: true
    },
})

module.exports = Password = mongoose.model('Passwords', PasswordSchema)