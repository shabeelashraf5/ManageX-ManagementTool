const mongoose = require('mongoose')

const generatePasswordSchema = new mongoose.Schema({

    password: {type: String},
    createdAt: {type: Date, default: Date.now}

})

const collectionpasswords = new mongoose.model('genpassword', generatePasswordSchema)

module.exports = collectionpasswords