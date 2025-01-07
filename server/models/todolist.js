const mongoose = require('mongoose') 

const generateTodoSchema = new mongoose.Schema({

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    title: {type: String, required: true},
    completed: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}

})

const collectiontodo = new mongoose.model('todolist', generateTodoSchema)

module.exports = collectiontodo