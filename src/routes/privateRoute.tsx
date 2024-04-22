import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface Props {
    component: React.ComponentType
    path?: string
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
    const { isLoggedIn } = useContext(UserContext)
    const oldSessionDetails = localStorage.getItem('sessionObject');
    const sessionObj = oldSessionDetails ? JSON.parse(oldSessionDetails) : null;
    if (isLoggedIn || (sessionObj && sessionObj.isLoggedIn)) {
        return <RouteComponent />
    }

    return <Navigate to="/" />
}