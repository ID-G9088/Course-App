import './input.scss';

const Input = ({
	className,
	type,
	labelText,
	name,
	placeholderText,
	onChange,
	value = '',
	...props
}) => {
	return (
		<>
			<label htmlFor={name}>{labelText}</label>
			<input
				value={value}
				className={className}
				id={name}
				name={name}
				type={type}
				placeholder={placeholderText}
				onChange={onChange}
				{...props}
			></input>
		</>
	);
};

export default Input;
