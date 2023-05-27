import { useSelector } from 'react-redux';
import { Link, useParams, Navigate } from 'react-router-dom';

import { dateGenerator } from '../../helpers/dateGenerator';
import { getAuthorsById } from '../../helpers/getAuthors';
import { formatDurationWithPrecedingZero } from '../../helpers/pipeDuration';
import { getAuthors, getCourses } from '../../selectors';

import './courseInfo.scss';

const CourseInfo = () => {
	const { courseId } = useParams();
	const coursesList = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);
	const course = coursesList.find((course) => course.id === courseId);

	if (!course) {
		return <Navigate to='/404' />;
	}

	const { title, description, id, duration, creationDate, authors } = course;

	return (
		<div className='course-info p20'>
			<div className='back-arrow'>
				<Link to='/courses'>Back to courses</Link>{' '}
			</div>
			<h2 className='course-info__title'>{title}</h2>
			<div className='course-info__details'>
				<p className='course-info__description'>{description}</p>
				<div className='course-info__features'>
					<div className='course-info__id'>
						<span>ID:</span> {id}
					</div>
					<div className='course-info__duration'>
						<span>Duration: </span>
						{formatDurationWithPrecedingZero(duration)} hours
					</div>
					<div className='course-info__created'>
						<span>Created: </span>
						{dateGenerator(creationDate)}
					</div>
					<div className='course-info__authors'>
						<span>Authors: </span>
						<ul>
							{getAuthorsById(authors, authorsList).map((author, ind) => (
								<li key={ind}>{author.name}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
