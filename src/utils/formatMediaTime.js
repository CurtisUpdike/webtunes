function formattedSeconds(seconds) {
	return {
		hours: Math.floor(seconds / 3600),
		minutes: Math.floor((seconds % 3600) / 60),
	};
}

export default function formatMediaTime(time, seperator) {
	seperator = seperator || ':';
	let seconds = Math.floor((time % 3600) % 60);
	let { hours, minutes } = formattedSeconds(time);
	let display = [];
	if (hours) {
		display.push(`${hours}`);
		display.push(`${minutes < 10 ? '0' + minutes : minutes}`);
	} else {
		display.push(`${minutes}`);
	}
	display.push(`${seconds < 10 ? '0' + seconds : seconds}`);

	return display.join(seperator);
}
