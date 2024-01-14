import { useState } from 'react';
import axios from 'axios';
import useContextHook from './useContextHook'; 

const backendUrl = "http://localhost:5000";
 
const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useContextHook;
    

    const signup = async () => {
        setIsLoading(true);
        setError(null);

        const response = await axios.post(`${backendUrl}/api/user/signup`, {
            headers: {
                "Content-Type" : "application/json"
            }
        });

        if (!response) {
            setIsLoading(false); 
            setError(response.error);
        } else {
            localStorage.setItem('user', JSON.stringify(response.data));

            dispatch({ type: "LOGIN", payload: response.data });
            setIsLoading(false);
        }
    }

    return {
        signup , isLoading , error
    }


}

export default useSignup
