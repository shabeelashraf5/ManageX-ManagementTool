const mongoose = require('mongoose')

// mongoose.set('strictQuery', false)
// mongoose.connect('mongodb+srv://shabeelash5:wGzEMe0qZvBVAgN6@cluster0.kfyrp1e.mongodb.net/pass-gen?retryWrites=true&w=majority')
// .then(() => {
//     console.log('The Database Connected')
// })
// .catch((error) => {
//     console.log('Failed to Connect', error)

// })

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://shabeelash5:wGzEMe0qZvBVAgN6@cluster0.kfyrp1e.mongodb.net/pass-gen?retryWrites=true&w=majority', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // exit process with failure
    }
};


module.exports = dbConnection