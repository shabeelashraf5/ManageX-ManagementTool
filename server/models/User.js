const mongoose = require('mongoose')

const addUserSchema = new mongoose.Schema({

    email: {type: String},
    password: {type: String},
    rpassword: {type: String},
    fname: {type: String},
    lname: {type: String},
    phone: {type: Number},
    address: {type: String}
})

const collectionUser = new mongoose.model('user', addUserSchema)

module.exports = collectionUser