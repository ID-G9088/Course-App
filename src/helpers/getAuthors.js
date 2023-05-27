const getAuthorsById = (authorsIDs, authorsList) => {
	const authorsIdSet = new Set(authorsIDs);
	return authorsList.reduce(
		(accum, author) =>
			authorsIdSet.has(author.id) ? accum.concat(author) : accum,
		[]
	);
};

const getRemainAuthors = (allAuthors, authorsToExclude) => {
	const authorsIDsToExclude = authorsToExclude.map(({ id }) => id);
	const authorsIDsToExcludeSet = new Set(authorsIDsToExclude);
	return allAuthors.filter(({ id }) => !authorsIDsToExcludeSet.has(id));
};

export { getAuthorsById, getRemainAuthors };
