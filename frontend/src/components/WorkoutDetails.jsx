import axios from "axios";
import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import useAuthContextHook from "../hooks/useAuthContextHook";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const backendUrl = "http://localhost:5000";



const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutsContext();

  const { user } = useAuthContextHook();

  const { title, load, reps, createdAt, _id } = workout;

  const handleClick = async () => {

    if (!user) {
      return;
    }

    const { data } = await axios.delete(`${backendUrl}/api/workouts/${_id}`, {
      headers: {
        'Authorization' : `Bearer ${user.token}`
      }
    });

    
    if (data) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }

  }

  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>
        <strong>Reps: </strong>
        {reps}
      </p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
