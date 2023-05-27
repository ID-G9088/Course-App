export const updateStateOnInputChange = (event, state, setState) => {
	const name = event.target.name;
	const value = event.target.value;
	setState({ ...state, [name]: value });
};
