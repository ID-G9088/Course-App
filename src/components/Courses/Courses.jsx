import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { dateGenerator } from '../../helpers/dateGenerator';
import { formatDurationWithoutPrecedingZero } from '../../helpers/pipeDuration';
import { getAuthorsById } from '../../helpers/getAuthors';
import { getCourses, getAuthors, getUserRole } from '../../selectors';
import { PATH_COURSES_ADD, PATH_COURSES } from '../../constants';
import { deleteCourse } from '../../store/courses/slice';
import { getAllCourses } from '../../store/courses/slice';
import { getAllAuthors } from '../../store/authors/slice';

import './courses.scss';

const Courses = () => {
	const [filter, setFilter] = useState('');
	const navigate = useNavigate();
	const coursesList = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);
	const userRole = useSelector(getUserRole);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCourses());
		dispatch(getAllAuthors());
		// eslint-disable-next-line
	}, []);

	const navigateToCreateCourseComp = () => {
		navigate(PATH_COURSES_ADD);
	};

	const filterCourses = (searchQuery) => {
		const trimmedQuery = searchQuery.trim();
		setFilter(trimmedQuery);
	};

	const filteredCourses = filter
		? coursesList.filter(
				(course) =>
					course.title.toLocaleLowerCase().includes(filter.toLowerCase()) ||
					course.id === filter
		  )
		: coursesList;

	const showCourseInfo = useCallback((id) => {
		navigate(id);
	});

	const deleteCourseFromList = useCallback((id) => {
		const token = localStorage.getItem('token');

		if (token) {
			dispatch(deleteCourse({ id, token }));
		}
	});

	const updateCourse = useCallback((id) => {
		navigate(`${PATH_COURSES}/update/${id}`);
	});

	const coursesForRender = filteredCourses.map(
		({ id, authors, creationDate, duration, ...cardProps }) => {
			const authorsNames = getAuthorsById(authors, authorsList)
				.map((author) => author.name)
				.join(', ');

			const formattedCreationDate = dateGenerator(creationDate);
			const formattedDuration = formatDurationWithoutPrecedingZero(duration);

			return (
				<CourseCard
					key={id}
					id={id}
					authorsNames={authorsNames}
					creationDate={formattedCreationDate}
					duration={formattedDuration}
					showCourseInfo={showCourseInfo}
					onDeleteCourse={deleteCourseFromList}
					onUpdate={updateCourse}
					{...cardProps}
				/>
			);
		}
	);

	return (
		<div className='course-list p20'>
			<div className='search-panel mb20'>
				<SearchBar handleSubmit={filterCourses} />
				{userRole === 'admin' && (
					<Button
						className='btn'
						buttonText='Add new course'
						onClick={navigateToCreateCourseComp}
					/>
				)}
			</div>
			<ul data-testid='courseCards-list'>{coursesForRender}</ul>
		</div>
	);
};

export default Courses;
