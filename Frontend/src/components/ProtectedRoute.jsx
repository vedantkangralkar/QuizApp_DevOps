import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    // If there's no token, the user is redirected to '/login'
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
