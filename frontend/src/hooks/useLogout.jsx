import useContextHook from "./useContextHook";
import { useWorkoutsContext } from "./useWorkoutsContext";

const useLogout = () => {
  const { dispatch } = useContextHook();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ tyep : 'SET_WORKOUTS' , payload: null})
  };

    return {
      logout
  }
};

export default useLogout;
