import React, { useState } from "react";
import { onSubmitDetails } from "../service/api.js";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import useAuthContextHook from "../hooks/useAuthContextHook.jsx";



const workoutDetails = {
  title: "",
  load: "",
  reps: "",
};


const WorkoutForm = () => {
  const [workout, setWorkout] = useState(workoutDetails);

  const [error, setError] = useState(null);

  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useWorkoutsContext();
  
  const { user } = useAuthContextHook();

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
      
    if (!user) {
      setError("You must be logged in");
      return;
    }
    
    const response = await onSubmitDetails(workout);

    if (!response) {
      setError(error , "no workout found");
    } else {
      setError(null);
      setWorkout({
        title: "",
        load: "",
        reps: ""
      });
      
      dispatch({type : "CREATE_WORKOUT" , payload : response})
    }

  };
  


  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label>Exercize Title</label>
      <input
        type="text"
        placeholder="enter workout title"
        name="title"
        value={workout.title}
        onChange={(e) => onValueChange(e)}
        className={emptyFields.includes('title') ? "error" : ""}
      />
      <label>Load (in kg):</label>
      <input
        type="text"
        placeholder="enter load(in kg)"
        name="load"
        value={workout.load}
        onChange={(e) => onValueChange(e)}
        className={emptyFields.includes('load') ? "error" : ""}
      />
      <label>Reps:</label>
      <input
        type="text"
        placeholder="enter the number of reps"
        name="reps"
        value={workout.reps}
        onChange={(e) => onValueChange(e)}
        className={emptyFields.includes('reps') ? "error" : ""}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
