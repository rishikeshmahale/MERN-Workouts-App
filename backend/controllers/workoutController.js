const Workout = require("../models/WorkoutModel.js");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
    try {

        const user_id = req.user._id;

        const workout = await Workout.find({user_id}).sort({ createdAt: -1 });
        
        res.status(200).json(workout);
        
    } catch (err) {
        res.status(400).json({error : err.message})
    }
} 

const singleWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error : "No such workout found"})
        }

        const workout = await Workout.findById(id);
    
        if (!workout) {
            return res.status(404).json({error : "No Such workout found"})
        }

        res.status(200).json(workout);

    } catch (err) {
        res.status(400).json({error : err.message})
    }
} 

const createWorkout = async (req, res) => {
    
    const { title, reps, load } = req.body;    
    
    let emptyFields = [];

    if (!title){
        emptyFields.push('title')
    }

    if (!load) {
        emptyFields.push('load');
    }

    if (!reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.lenght > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }
    
    try {

        const user_id = req.user._id;

        const workout = await Workout.create({
            title, load, reps, user_id
        });
    
            res.status(200).json(workout);
            
        } catch (err) {
            res.status(400).json({error : err.message});
        }
}


const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({msg : "No such workout found"})
        }

        const workout = await Workout.findOneAndDelete({ _id: id });
        
        if (!workout) {
            return res.status(404).json({msg : "No such workout found"})
        }

        res.status(200).json(workout);


    } catch (err) {
        res.status(400).json({error : err.message})
    }
}

const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "No such workout found" });
        }

        const workout = await Workout.findOneAndUpdate({ _id: id }, {
            ...req.body
        });

        if (!workout) {
            return res.status(404).json({ msg: "No such workout found" });
        }

        res.status(200).json(workout);

    } catch (err) {
        res.status(400).json({ error : err.message });
    }
} 

module.exports = { getAllWorkouts, createWorkout, updateWorkout, deleteWorkout, singleWorkout }
