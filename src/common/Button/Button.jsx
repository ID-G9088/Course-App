import './button.scss';

const Button = ({ className, buttonText, onClick, ...props }) => {
	return (
		<button className={className} onClick={onClick} {...props}>
			{buttonText}
		</button>
	);
};

export default Button;
