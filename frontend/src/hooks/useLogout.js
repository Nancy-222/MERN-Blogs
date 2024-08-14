import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });

        // Delay navigation to ensure logout is completed
        setTimeout(() => {
            navigate('/');
        }, 100); // Adjust delay if needed
    };

    return { logout };
};
