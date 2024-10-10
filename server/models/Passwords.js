const mongoose = require('mongoose')

const generatePasswordSchema = new mongoose.Schema({
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    password: {type: String},
    createdAt: {type: Date, default: Date.now}

})

const collectionpasswords = new mongoose.model('genpassword', generatePasswordSchema)

module.exports = collectionpasswords