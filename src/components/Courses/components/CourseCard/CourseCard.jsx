import { memo } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../common/Button/Button';

import { getUserRole } from '../../../../selectors';

import './courseCard.scss';

const CourseCard = memo(
	({
		title,
		description,
		creationDate,
		duration,
		authorsNames,
		showCourseInfo,
		onDeleteCourse,
		onUpdate,
	}) => {
		const userRole = useSelector(getUserRole);

		return (
			<li className='course mb20'>
				<div className='course__about'>
					<h3 className='course__title'>{title}</h3>
					<p className='course__descr'>{description}</p>
				</div>

				<div className='course__specs'>
					<ul>
						<li className='course__authors'>
							<span>Authors:</span> {authorsNames}
						</li>
						<li className='course__duration'>
							<span>Duration:</span> {duration} hours
						</li>
						<li className='course__created'>
							<span>Created:</span> {creationDate}
						</li>
					</ul>
					<div className='course__btns'>
						<Button
							className='btn btn-add'
							buttonText='Show course'
							onClick={() => showCourseInfo(id)}
						/>
						{userRole === 'admin' && (
							<div className='admin-btns'>
								<Button
									className='btn btn-change'
									onClick={() => onUpdate(id)}
								/>
								<Button
									className='btn btn-delete'
									onClick={() => onDeleteCourse(id)}
								/>
							</div>
						)}
					</div>
				</div>
			</li>
		);
	}
);

export default CourseCard;
