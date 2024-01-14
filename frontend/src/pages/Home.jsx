import React, { useEffect } from "react";
import axios from "axios";

// components
import WorkoutDetails from "../components/WorkoutDetails.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import useAuthContextHook from "../hooks/useAuthContextHook.jsx";

const backendUrl = "http://localhost:5000";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  const { user } = useAuthContextHook();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await axios.get(`${backendUrl}/api/workouts`, {
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      });
   

      if (response) {
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      }
    };

    if (user) {
      fetchWorkouts();
    }

  }, [dispatch, user]);

  console.log("workouts : ", workouts);

  return (
    <div className="home">
      <div className="workouts">
        {workouts
          ? workouts.map((workout) => {
            return (
              <WorkoutDetails key={workout.id} workout={workout} />
              )
            })
          : null}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
