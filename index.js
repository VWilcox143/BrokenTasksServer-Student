require('dotenv').config(); //missing .config()
const express = require('express');
const app = express();
const PORT = process.env.PORT;


//! Imports
const { db } = require('./db'); //Needed curly boys to activate db as a callback function.


const { userController, taskController} = require ('./controllers');
const { setDate } = require('./middleware/date');


//! Middleware
app.use(express.json()); //missing parentheses after "json".
app.use(setDate);

//! Controllers
app.use('/user', userController);
app.use('/task', taskController);

//! Connection

const server = async () => {
    db();

    app.listen(PORT, () => console.log(`Server on Port ${PORT}`));
}

server();
