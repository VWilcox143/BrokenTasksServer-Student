const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); //User wasn't imported for use on line 10.

const validateSession = async (req, res, next) => { //Missing 'res'
    try {
        const token = req.headers.authorization; //token was being accessed before it was active
        
        const decoded = await jwt.verify(token, process.env.JWT); //.verify was missing
        
        const user = await User.findById(decoded.id);
        
        
        if(!user) throw new Error(`User not found`);
        
        req.user = user; //req.user was not stored
        
        return next() //missing 'next()' to tell it to move on.
    } catch (err) {
        res.json({message: err.message})
    }
}

module.exports = validateSession;
