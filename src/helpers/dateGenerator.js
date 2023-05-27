const dateGenerator = (date) => {
	return date
		.split('/')
		.map((dateElem) => (dateElem.length < 2 ? '0' + dateElem : dateElem))
		.join('.');
};

export { dateGenerator };
