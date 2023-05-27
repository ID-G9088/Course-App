const formatDurationWithoutPrecedingZero = (duration) => {
	const hours = parseInt(duration / 60);
	const minutes = duration % 60;
	return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

const formatDurationWithPrecedingZero = (duration) => {
	const hours = parseInt(duration / 60);
	const minutes = duration % 60;
	return `${hours < 10 ? '0' + hours : hours}:${
		minutes < 10 ? '0' + minutes : minutes
	}`;
};

export { formatDurationWithoutPrecedingZero, formatDurationWithPrecedingZero };
