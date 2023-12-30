const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    date: Date,
    title: {
        type: String,
        required: true
    },
    details: { //changed to an object in order to add 'required
        type: String, //added 'type' key because it was required
        required: true //Added "required" because...I felt like it should be required to have details
    },
    completed: Boolean,
    user_id: {
        type: mongoose.Types.ObjectId, //wasn't calling on the id correctly
        ref: "User"
    }
});

module.exports = mongoose.model('Task', Task ); //'Task' Schema was created but not called upon.