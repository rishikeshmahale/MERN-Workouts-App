import { useState } from 'react';
import axios from 'axios';
import useContextHook from './useContextHook'; 

const backendUrl = "http://localhost:5000";
 
const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useContextHook;
    

    const login = async () => {
        setIsLoading(true);
        setError(null);

        const response = await axios.post(`${backendUrl}/api/user/login`, {
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
        login , isLoading , error
    }


}

export default useLogin;
