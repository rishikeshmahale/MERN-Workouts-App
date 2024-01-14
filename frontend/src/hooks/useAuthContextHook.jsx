import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const useAuthContextHook = () => {

   const context = useContext(AuthContext);

    if (!context) {
        return "useAuthContext must be used inside an AuthContextProvider"
    }
    
    return context;
}

export default useAuthContextHook;
