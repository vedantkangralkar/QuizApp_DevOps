import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    /* eslint-disable no-unused-vars */

    const { user, token } = useContext(AuthContext);
    /* eslint-enable no-unused-vars */

    // Restricts access based on 'token' (and could also check 'user.isAdmin')
    if (!token) return <Navigate to="/login" />;
    // if (!user || !user.isAdmin) return <Navigate to="/" />; // Redirect to home if not admin

    return children;
};

export default AdminRoute;
