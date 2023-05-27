import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Page404 from './components/Page404/Page404';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import { getUser } from './selectors';
import { setUser } from './store/user/slice';
import {
	PATH_COURSES,
	PATH_COURSES_ADD,
	PATH_COURSE_ID,
	PATH_COURSE_UPDATE,
	PATH_DEFAULT,
	PATH_LOGIN,
	PATH_PAGE404,
	PATH_REGISTRATION,
} from './constants';
import { httpRequestService } from './services';

import './App.scss';

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const App = () => {
	const dispatch = useDispatch();

	const { isAuth, token } = useSelector(getUser);
	const { logoutRequest, getUserRequest } = httpRequestService();

	const onLogOut = () => {
		const token = localStorage.getItem('token');
		if (token) {
			logoutRequest(token).catch(() => console.log('Token is not valid'));
			localStorage.removeItem('token');
		}
		if (isAuth) {
			dispatch(setUser({ isAuth: false, name: '', email: '', token: '' }));
		}
	};

	if (!token) {
		const localStorageToken = localStorage.getItem('token');
		if (localStorageToken) {
			getUserRequest(localStorageToken)
				.then(
					({
						data: {
							result: { name, email, role },
						},
					}) => {
						dispatch(
							setUser({
								isAuth: true,
								name: name || 'unknown',
								token: localStorageToken,
								role,
								email,
							})
						);
					}
				)
				.catch(onLogOut);
		}
	}

	return (
		<Container>
			<Header onLogOut={onLogOut} />
			<Routes>
				<Route element={<ProtectedRoutes onLogOut={onLogOut} />}>
					<Route path='/' element={<Navigate to={PATH_DEFAULT} replace />} />
					<Route
						path={PATH_COURSES}
						element={
							<ProtectedRoutes onLogOut={onLogOut}>
								<Courses />
							</ProtectedRoutes>
						}
					/>
					<Route
						path={PATH_COURSES_ADD}
						element={
							<ProtectedRoutes onLogOut={onLogOut}>
								<PrivateRoute>
									<CourseForm />
								</PrivateRoute>
							</ProtectedRoutes>
						}
					/>
					<Route
						path={PATH_COURSE_UPDATE}
						element={
							<ProtectedRoutes onLogOut={onLogOut}>
								<PrivateRoute>
									<CourseForm updateMode />
								</PrivateRoute>
							</ProtectedRoutes>
						}
					/>
					<Route
						path={PATH_COURSE_ID}
						element={
							<ProtectedRoutes onLogOut={onLogOut}>
								<CourseInfo />
							</ProtectedRoutes>
						}
					/>
				</Route>

				<Route path={PATH_REGISTRATION} element={<Registration />} />
				<Route path={PATH_LOGIN} element={<Login />} />

				<Route path={PATH_PAGE404} element={<Page404 />} />
				<Route path='*' element={<Navigate to={PATH_PAGE404} replace />} />
			</Routes>
		</Container>
	);
};

export default App;
