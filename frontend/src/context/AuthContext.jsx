import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "../reducers/AuthReducer";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }

     }, [dispatch]);

    return (
        <AuthContext.Provider value={{...state , dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}


