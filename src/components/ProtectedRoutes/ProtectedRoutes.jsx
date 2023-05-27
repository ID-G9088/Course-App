import { Navigate, Outlet } from 'react-router-dom';

import { PATH_LOGIN } from '../../constants';

const ProtectedRoutes = ({ onLogOut, children }) => {
	const token = localStorage.getItem('token');
	if (!token) {
		onLogOut();
		return <Navigate to={PATH_LOGIN} replace />;
	}

	return <>{children ? children : <Outlet />}</>;
};
export default ProtectedRoutes;
