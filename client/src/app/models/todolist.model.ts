import mongoose from 'mongoose';

export interface ToDoList {

    _id: string,
    user_id: mongoose.Types.ObjectId | string,
    title: string,
    completed: boolean,
    date: Date
    
}