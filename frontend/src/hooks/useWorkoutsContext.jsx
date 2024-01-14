
import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext.jsx";

export const useWorkoutsContext = () => {

    const context = useContext(WorkoutsContext);

    if(!context){
        throw Error("useWorkoutsContext must be used insside an WorkoutsContextProviders");
    }

    return context
}

