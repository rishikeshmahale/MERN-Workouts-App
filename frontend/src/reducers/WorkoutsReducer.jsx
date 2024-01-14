
const WorkoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [action.paylaod, ...state.workouts],
      };
    
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((workout) => {
          return workout._id !== action.payload._id
        })
      }

    default:
      return state;
  }
};

export default WorkoutsReducer;
