import { useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

import { getUser } from '../../selectors';

import './header.scss';

const Header = ({ onLogOut }) => {
	const { isAuth, name } = useSelector(getUser);

	return (
		<header className='header mb20 p20'>
			<Logo />
			{isAuth && (
				<div className='header__log-panel'>
					<span className='header__user-name'>{name}</span>
					<Button className='btn' buttonText='Logout' onClick={onLogOut} />
				</div>
			)}
		</header>
	);
};

export default Header;
