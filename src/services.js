import axios from 'axios';

import {
	URL_REQUEST_REGISTRATION,
	URL_REQUEST_LOGIN,
	URL_REQUEST_ALL_COURSES,
	URL_REQUEST_ALL_AUTHORS,
	URL_REQUEST_LOGOUT,
	URL_REQUEST_USER,
	URL_REQUEST_COURSE_CHANGE,
	URL_REQUEST_COURSES_ADD,
	URL_REQUEST_AUTHORS_ADD,
} from './constants';

export const httpRequestService = () => {
	const request = (url, data = null, method = 'get', token, headers) => {
		const axiosInstanceWithToken = (token) => {
			return axios.create({
				headers: {
					Authorization: token,
				},
			});
		};

		const requestParams = {
			url,
			method,
			data,
			headers,
		};

		if (token) {
			const axiosInstance = axiosInstanceWithToken(token);
			return axiosInstance(requestParams);
		}

		return axios(requestParams);
	};

	const registrationRequest = (data) => {
		return request(URL_REQUEST_REGISTRATION, data, 'post');
	};

	const loginRequest = (data) => {
		return request(URL_REQUEST_LOGIN, data, 'post');
	};

	const getAllCoursesRequest = () => {
		return request(URL_REQUEST_ALL_COURSES);
	};

	const getAllAuthorsRequest = () => {
		return request(URL_REQUEST_ALL_AUTHORS);
	};

	const logoutRequest = (token) => {
		return request(URL_REQUEST_LOGOUT, null, 'delete', token);
	};

	const getUserRequest = (token) => {
		return request(URL_REQUEST_USER, null, 'get', token);
	};

	const deleteCourseRequest = (id, token) => {
		console.log('deletecourserequest');
		return request(`${URL_REQUEST_COURSE_CHANGE}/${id}`, null, 'delete', token);
	};

	const updateCourseRequest = (id, data, token) => {
		return request(`${URL_REQUEST_COURSE_CHANGE}/${id}`, data, 'put', token);
	};

	const addCourseRequest = (data, token) => {
		return request(URL_REQUEST_COURSES_ADD, data, 'post', token);
	};

	const addAuthorRequest = (data, token) => {
		return request(URL_REQUEST_AUTHORS_ADD, data, 'post', token);
	};

	return {
		registrationRequest,
		loginRequest,
		getAllCoursesRequest,
		getAllAuthorsRequest,
		logoutRequest,
		getUserRequest,
		deleteCourseRequest,
		updateCourseRequest,
		addCourseRequest,
		addAuthorRequest,
	};
};
