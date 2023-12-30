const mongoose = require('mongoose');

const User = new mongoose.Schema({ //mongoose.Schema was not called upon
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, //String was mis-typed as 'Strings'.
        required: true
    }
});

module.exports = mongoose.model('User', User);