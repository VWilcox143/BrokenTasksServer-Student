const router = require('express').Router();
const bcrypt = require('bcrypt'); //'bcrypt' was misspelled
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;
const expiresIn = {expiresIn: "1 day"};
const User = require('../models/user.model'); //removed curly-bois from around 'User', added 'user.model'
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');

//! Signup
router.post('/signup', async (req, res) => { //added (req, res)
    try {

        //const { email, password } = req.body; //Took this out because it wasn't necessary here
        
        const user = new User({ //added 'new'
            email: req.body.email, //added req.body.email
            password: bcrypt.hashSync(req.body.password,13)   
        })
        
        const newUser = await user.save(); //added "const newUser = await user.save; 

        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: "1 Day"}); 

        const results = {
            newUser,
            token
        }

        newUser ? //changed user to newUser
            successHandling(res,results) :
            incompleteHandling(res);

    } catch (err) {
        errorHandling(res,err);
    }
});

//! Login
router.post('/login', async(req,res) => {
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({email: email});

        if(!user) throw new Error('E-mail or password does not match');

        const match = await bcrypt.compare(password, user.password); //wasn't comparing password to stored "user" password

        if(!match) throw new Error(`Email or Password do not match`);

        const token = jwt.sign({id: user._id}, SECRET, expiresIn);

        const result = {
            user, token
        }

        result ?
            successHandling(res, result) :
            incompleteHandling(res)

    } catch (err) {
        errorHandling(res,err);
    }
});

module.exports = router;