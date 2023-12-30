const router = require('express').Router(); //'.Router()' was missing
const  Task  = require('../models/task.model');
const { errorHandling, successHandling, incompleteHandling } = require('../helpers');
const  validateSession  = require('../middleware/validate-session');
const  { setDate }  = require('../middleware/date'); //imported 'setDate' middleware


//! CREATE
router.post('/', validateSession, setDate,  async(req,res) => {
    try {
        
        const { title, details, completed } = req.body;
        // const { id } = req.user; //Wasn't calling for user ID properly

        const task = new Task({
            date: req.date,
            title,
            details,
            completed: completed ? completed : false,
            user_id: req.user._id
        })

        const newTask = await task.save();

        newTask ?
            successHandling(res,newTask) :
            incompleteHandling(res);

    } catch (err) {
        errorHandling(res,err);
    }
})

//! GET ALL
router.get('/', validateSession,  async(req,res) => { //missing validateSession middleware
    try {

        const { id } = req.user;

        const tasks = await Task.find({user_id: id});

        tasks ? 
            successHandling(res,tasks) : 
            incompleteHandling(res);
        
    } catch (err) {
        errorHandling(res,err); //called upon req instead of res
    }
})

//! GET ONE
router.get('/get-one/:id', validateSession, async(req,res) => {
    try {

        //const userId = req.user.id; // not necessary
        const { id } = req.params;

        const task = await Task.findOne({_id: id}); //Changed findEach to findOne Took out  "user_id: userId" because it wasn't necessary.

        task ? 
            successHandling(res,task) :
            incompleteHandling(res);
        
    } catch (err) {
        errorHandling(res,err); // called upon req instead of res
    }
})

//! UPDATE
router.patch('/:id', validateSession, async(req,res) => {
    try {
        
        const filter = {
            _id: req.params.id,
            owner_id: req.user._id
        }

        const info = req.body;

        const returnOption = {new: true};

        const updatedTask = await Task.findOneAndUpdate(filter, info, returnOption);
        // const userId = req.id;
        // const date = req.date;
        // const taskId = req.params;
        // const {title,details,completed} = req.body;

        // const update = {
        //     title,details,completed,date
        // }
        // const returnOpt = {new: true};

        // const updatedTask = await Task.findOneAndUpdate(
        //     {_id: taskId,user_id:userId}, update, returnOpt
        // );

        updatedTask ?
            successHandling(res, "Task Updated", updatedTask) :
            incompleteHandling(res);

    } catch (err) {
        errorHandling(res,err); //called upon req instead of res
    }
})

//! DELETE
router.delete('/:id', validateSession, async(req,res) => {
    try {
        
        const { id } = req.params;
        // const userId = req.user.id; //Not necessary because of validate middleware

        const deleteTask = await Task.deleteOne({_id: id, owner_id: req.user._id}); //Changed "deleted" to "deleteOne", fixed user id key/value

        deleteTask.deletedCount ?
        
            successHandling(res, "Task Deleted") : //Changed "Task deleted" from an object to a string.
            incompleteHandling(res);

    } catch (err) {
        errorHandling(res,err); //called upon req instead of res
    }
})

module.exports = router; //missing export