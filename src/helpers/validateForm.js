import { EMAIL_REGEX } from '../constants';

export const validateForm = (email, password, name) => {
	const errors = {};

	if (email !== false) {
		if (!email) {
			errors.email = 'Required field';
		} else if (!EMAIL_REGEX.test(email)) {
			errors.email = 'Invalid email';
		}
	}
	if (password !== false) {
		if (!password) {
			errors.password = 'Required field';
		} else if (password.length < 6) {
			errors.password = 'Password is too short (min 6 symbols)';
		}
	}

	if (name !== false) {
		if (!name) {
			errors.name = 'Required field';
		} else if (name.length < 2) {
			errors.name = 'Name is too short (min 2 symbols)';
		}
	}
	return errors;
};
