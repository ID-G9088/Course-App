import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { updateStateOnInputChange } from '../../helpers/updateStateOnInputChange';
import { validateForm } from '../../helpers/validateForm';
import { httpRequestService } from '../../services';
import { PATH_DEFAULT } from '../../constants';
import { fetchUser } from '../../store/user/slice';

import '../Registration/registration.scss';

const Login = () => {
	const [loginUser, setLoginUser] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const [loginResult, setLoginResult] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { email, password } = loginUser;
	const { loginRequest } = httpRequestService();

	const onSubmit = (e) => {
		e.preventDefault();

		const activeErrors = validateForm(email, password, false);
		if (Object.keys(activeErrors).length > 0) {
			setErrors(activeErrors);
			return;
		}

		if (Object.keys(errors).length > 0) {
			setErrors({});
		}

		loginRequest({ email, password })
			.then(({ data: { result: token } }) => {
				localStorage.setItem('token', token);
				return dispatch(fetchUser(token));
			})
			.then(() => navigate(PATH_DEFAULT))
			.catch(({ response }) => {
				const errorInfo =
					response.data.result ?? response.data.errors.join(', ');
				setLoginResult(errorInfo);
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
		if (loginResult) setLoginResult('');
		updateStateOnInputChange(e, loginUser, setLoginUser);
	};

	return (
		<div className='registration p20'>
			<div>
				<div className='registration__title'>Login</div>
				<form onSubmit={onSubmit} className='registration__inputs'>
					<Input
						value={email}
						onChange={onInputChange}
						name='email'
						labelText='Email'
						type='email'
						className='input'
						placeholderText='Enter Email'
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
					<Button className='btn' buttonText='Login' />
					<div>
						If you do not have an account you can do{' '}
						<Link to='/registration'>Registration</Link>
					</div>
				</form>
			</div>
			{loginResult && <div className='notification'>{loginResult}</div>}
		</div>
	);
};

export default Login;
