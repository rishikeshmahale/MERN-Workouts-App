const express = require("express");
const { createWorkout , updateWorkout, deleteWorkout , singleWorkout, getAllWorkouts} = require("../controllers/workoutController.js");
const requireAuth = require("../middleware/requireAuth.js");


const router = express.Router();

router.use(requireAuth);

router.get("/", getAllWorkouts);

router.get("/:id", singleWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout)

router.patch("/:id", updateWorkout)

module.exports = router;


