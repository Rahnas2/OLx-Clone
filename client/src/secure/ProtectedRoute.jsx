import { AuthUser } from '../context/authContext';
import {  Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function ProtectedRoute({ children }) {
    const { user } = AuthUser();

    if (!user?.email) {
        toast.warning('you must be logged in to access this page')
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;