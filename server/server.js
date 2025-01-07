const express = require('express')
const path = require('path')
const http = require('http')
const createError = require('http-errors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
//const mongoose = require('./config/database')
const connectDB = require('./config/database')

const userRouter = require('./routes/usersRoutes')
const weatherRouter = require('./routes/weatherRoutes')
const todoRouter = require('./routes/todoRoutes')


const app = express()

connectDB()

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())


app.use('/api' , userRouter)
app.use('/api/weather', weatherRouter)
app.use('/api/todolist', todoRouter)



app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });



app.listen(3000 , () => {
    console.log('The Server Connected')
})

