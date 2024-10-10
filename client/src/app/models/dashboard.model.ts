import mongoose from 'mongoose';

export interface Passwords {

    _id: String,
    user_id: mongoose.Types.ObjectId | string,
    password: String,
    date: Date
    
}