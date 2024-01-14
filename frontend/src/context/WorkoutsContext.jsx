import React, { createContext, useReducer } from 'react';
import WorkoutsReducer from '../reducers/WorkoutsReducer.jsx';

export const WorkoutsContext = createContext();

export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(WorkoutsReducer, {
        workouts
         : null
    })


    return (
        <WorkoutsContext.Provider value={{...state , dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}


