export const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
has been the industry's standard dummy text ever since the
1500s, when an unknown
printer took a galley of type and scrambled it to make a type
specimen book. It has survived
not only five centuries, but also the leap into electronic typesetting, remaining essentially u
nchanged. Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
										has been the industry's standard dummy text ever since the
1500s, when an unknown
										printer took a galley of type and scrambled it to make a type
specimen book. It has survived
										not only five centuries, but also the leap into electronic typesetting, remaining essentially u
										nchanged. Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum
																				has been the industry's standard dummy text ever since the
										1500s, when an unknown
																				printer took a galley of type and scrambled it to make a type
										specimen book. It has survived
																				not only five centuries, but also the leap into electronic typesetting, remaining essentially u
																				nchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the
1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type
specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

export const PATH_COURSES = '/courses';
export const PATH_COURSES_ADD = '/courses/add';
export const PATH_COURSE_ID = '/courses/:courseId';
export const PATH_COURSE_UPDATE = '/courses/update/:courseId';
export const PATH_REGISTRATION = '/registration';
export const PATH_LOGIN = '/login';
export const PATH_PAGE404 = '/404';
export const PATH_DEFAULT = PATH_COURSES;

export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const URL_REQUEST_BASE = 'http://localhost:3000';

export const URL_REQUEST_REGISTRATION = `${URL_REQUEST_BASE}/register`;
export const URL_REQUEST_LOGIN = `${URL_REQUEST_BASE}/login`;
export const URL_REQUEST_ALL_COURSES = `${URL_REQUEST_BASE}/courses/all`;
export const URL_REQUEST_ALL_AUTHORS = `${URL_REQUEST_BASE}/authors/all`;
export const URL_REQUEST_LOGOUT = `${URL_REQUEST_BASE}/logout`;
export const URL_REQUEST_USER = `${URL_REQUEST_BASE}/users/me`;
export const URL_REQUEST_COURSE_CHANGE = `${URL_REQUEST_BASE}/courses`;
export const URL_REQUEST_AUTHORS_ADD = `${URL_REQUEST_BASE}/authors/add`;
export const URL_REQUEST_COURSES_ADD = `${URL_REQUEST_BASE}/courses/add`;
