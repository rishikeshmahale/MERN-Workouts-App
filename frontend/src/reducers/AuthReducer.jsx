

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "userLogin":
      return {
        user: action.payload,
      };

    case "userLogout":
      return {
        user: null,
          };
      
    default:
      return state;
  }
};

export default AuthReducer;
