import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { formatDurationWithPrecedingZero } from '../../helpers/pipeDuration';
import { getAuthors, getCourses } from '../../selectors';
import { PATH_COURSES } from '../../constants';
import { getAuthorsById, getRemainAuthors } from '../../helpers/getAuthors';
import { addCourse, updateCourse } from '../../store/courses/slice';
import { addAuthor } from '../../store/authors/slice';

import './courseForm.scss';

const CourseForm = ({ updateMode }) => {
	const coursesList = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let initialAvailableAuthorsListState = authorsList;
	let initialCourseAuthorsListState = [];
	let initialCourseState = {
		id: null,
		title: '',
		description: '',
		creationDate: null,
		duration: '',
		authors: [],
	};

	if (updateMode) {
		const courseInfo = coursesList.find((course) => course.id === courseId);
		initialCourseState = courseInfo;
		const selectedAuthorsList = getAuthorsById(courseInfo.authors, authorsList);
		initialCourseAuthorsListState = selectedAuthorsList;
		initialAvailableAuthorsListState = getRemainAuthors(
			authorsList,
			selectedAuthorsList
		);
	}

	const [newCourse, setNewCourse] = useState(initialCourseState);
	const [authorName, setAuthorName] = useState('');
	const [availableAuthorsList, setAvailableAuthorsList] = useState(
		initialAvailableAuthorsListState
	);
	const [courseAuthorsList, setCourseAuthorsList] = useState(
		initialCourseAuthorsListState
	);

	const { title, description, duration, id } = newCourse;

	const handleChangeAuthorsList = (pickedAuthor, action) => {
		const deleteAuthor = (prevState) =>
			prevState.filter((author) => author.id !== pickedAuthor.id);
		const addAuthor = (prevState) => [...prevState, pickedAuthor];

		if (action === 'add') {
			setCourseAuthorsList(addAuthor);
			setAvailableAuthorsList(deleteAuthor);
		}

		if (action === 'delete') {
			setCourseAuthorsList(deleteAuthor);
			setAvailableAuthorsList(addAuthor);
		}
	};

	const createNewCourse = () => {
		const date = new Date();
		const creationDate = `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()}`;
		const authors = courseAuthorsList.map(({ id }) => id);

		if (!description || !title || !duration || !authors.length) {
			alert('Please, fill in all fields');
			return null;
		}

		const newCourse = {
			title,
			description,
			creationDate,
			duration,
			authors,
		};

		return newCourse;
	};

	const addNewCourse = () => {
		let newCourse = createNewCourse();
		const token = localStorage.getItem('token');

		if (newCourse) {
			dispatch(addCourse({ newCourse, token })).then(() =>
				navigate(PATH_COURSES)
			);
		}
	};

	const createNewAuthor = (authorName) => {
		const trimmedName = authorName.trim();
		if (!trimmedName || trimmedName.length < 2) {
			setAuthorName('');
			return;
		}

		const newAuthor = {
			name: trimmedName,
		};
		const token = localStorage.getItem('token');

		dispatch(addAuthor({ newAuthor, token })).then(({ payload }) => {
			setAvailableAuthorsList((prevState) => [...prevState, payload]);
			setAuthorName('');
		});
	};

	const handleUpdateCourse = () => {
		const updatedCourse = createNewCourse();
		const token = localStorage.getItem('token');
		if (updatedCourse) {
			dispatch(updateCourse({ id, updatedCourse, token })).then(() =>
				navigate(PATH_COURSES)
			);
		}
	};

	const availableAuthorsRenderList = availableAuthorsList.map(
		(author, index) => {
			return (
				<li className='block__authors-item' key={author.id}>
					<span
						data-testid={`available-author-${index}`}
						className='block__author-name'
					>
						{author.name}
					</span>
					<Button
						data-testid={`addAuthorBtn-${index}`}
						className='btn'
						buttonText='Add author'
						onClick={() => handleChangeAuthorsList(author, 'add')}
					/>
				</li>
			);
		}
	);

	const courseAuthorsRenderList = courseAuthorsList.map((author, index) => {
		return (
			<li className='block__authors-item' key={author.id}>
				<span
					data-testid={`course-author-${index}`}
					className='block__author-name'
				>
					{author.name}
				</span>
				<Button
					data-testid={`deleteAuthorBtn-${index}`}
					className='btn'
					buttonText='Delete author'
					onClick={() => handleChangeAuthorsList(author, 'delete')}
				/>
			</li>
		);
	});

	return (
		<div className='add-course p20'>
			<div className='add-course__header mb20'>
				<div className='add-course__inputs'>
					<Input
						className='input'
						type='text'
						value={title}
						onChange={(e) =>
							setNewCourse({ ...newCourse, title: e.target.value })
						}
						placeholderText='Enter title...'
						name='title'
						labelText='Title'
					/>
					<Button
						className='btn'
						buttonText={updateMode ? 'Update course' : 'Create course'}
						onClick={updateMode ? handleUpdateCourse : addNewCourse}
					/>
				</div>
				<label htmlFor='description' className='add-course__title'>
					Description
				</label>
				<textarea
					value={description}
					onChange={(e) =>
						setNewCourse({ ...newCourse, description: e.target.value })
					}
					minLength='2'
					id='description'
					className='add-course__description'
					placeholder='Enter description'
				/>
			</div>
			<div className='add-course__footer'>
				<div className='block p10'>
					<div className='block__title'>Add author</div>
					<Input
						className='input'
						type='text'
						value={authorName}
						minLength='2'
						name='createAuthor'
						labelText='Author name'
						placeholderText='Enter author name...'
						onChange={(e) => setAuthorName(e.target.value)}
					/>
					<Button
						className='btn'
						buttonText='Create author'
						onClick={() => createNewAuthor(authorName)}
						disabled={authorName.length < 2}
					/>
				</div>
				<div className='block p10'>
					<div className='block__title'>Authors</div>
					{availableAuthorsList.length > 0 ? (
						<ul data-testid='availableAuthors' className='block__authors-list'>
							{availableAuthorsRenderList}
						</ul>
					) : (
						'Author list is empty'
					)}
				</div>
				<div className='block p10'>
					<div className='block__title'>Duration</div>
					<Input
						className='input'
						value={duration}
						onChange={(e) => {
							setNewCourse({
								...newCourse,
								duration: parseInt(e.target.value.replace('-', '')) || '',
							});
						}}
						type='number'
						min='0'
						name='duration'
						labelText='Duration'
						placeholderText='Enter duration in minutes...'
					/>
					<div className='block__duration-output'>
						Duration{' '}
						{newCourse.duration
							? formatDurationWithPrecedingZero(duration)
							: '00:00'}{' '}
						hours
					</div>
				</div>
				<div className='block p10'>
					<div className='block__title'>Course authors</div>
					{courseAuthorsList.length > 0 ? (
						<ul data-testid='courseAuthors' className='block__authors-list'>
							{courseAuthorsRenderList}{' '}
						</ul>
					) : (
						'Course authors list is empty'
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseForm;
