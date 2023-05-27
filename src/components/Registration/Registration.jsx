import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { updateStateOnInputChange } from '../../helpers/updateStateOnInputChange';
import { validateForm } from '../../helpers/validateForm';
import { httpRequestService } from '../../services';

import './registration.scss';

const Registration = () => {
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const [registrationResult, setRegistrationResult] = useState('');
	const navigate = useNavigate();

	const { registrationRequest } = httpRequestService();
	const { name, email, password } = newUser;

	const onSubmit = (e) => {
		e.preventDefault();

		const activeErrors = validateForm(email, password, name);
		if (Object.keys(activeErrors).length > 0) {
			setErrors(activeErrors);
			return;
		}

		if (Object.keys(errors).length > 0) {
			setErrors({});
		}

		registrationRequest({ name, email, password })
			.then(({ data }) => {
				setRegistrationResult(data.result);
				setTimeout(() => navigate('/login'), 2000);
			})
			.catch((error) => {
				setRegistrationResult(
					`Creation of new user was failed. ${
						error.response.data.errors?.join(', ').concat('.') ?? ''
					} Pls try again`
				);
			});
	};

	const onInputChange = (e) => {
		const inputName = e.target.name;
		if (errors[inputName]) {
			setErrors(
				Object.fromEntries(
					Object.entries(errors).filter(([key, value]) => key !== inputName)
				)
			);
		}
		if (registrationResult) setRegistrationResult('');
		updateStateOnInputChange(e, newUser, setNewUser);
	};

	return (
		<div className='registration p20'>
			<div>
				<div className='registration__title'>Registration</div>
				<form onSubmit={onSubmit} className='registration__inputs'>
					<Input
						value={name}
						onChange={onInputChange}
						name='name'
						labelText='Name'
						type='text'
						className='input'
						placeholderText='Enter name'
					/>
					{errors.name && <ErrorMessage message={errors.name} />}
					<Input
						value={email}
						onChange={onInputChange}
						name='email'
						labelText='Email'
						type='email'
						className='input'
						placeholderText='Enter email'
					/>
					{errors.email && <ErrorMessage message={errors.email} />}
					<Input
						value={password}
						onChange={onInputChange}
						name='password'
						labelText='Password'
						type='password'
						className='input'
						placeholderText='Enter password'
					/>
					{errors.password && <ErrorMessage message={errors.password} />}
					<Button className='btn' buttonText='Registration' />
					<div>
						If you have an account you can <Link to='/login'>Login</Link>
					</div>
				</form>
			</div>
			{registrationResult && (
				<div className='notification'>{registrationResult}</div>
			)}
		</div>
	);
};

export default Registration;
