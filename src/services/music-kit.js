let MK = (function () {
	return {
		get instance() {
			if (!window.music) {
				window.music = window.MusicKit.getInstance();
			}
			return window.music;
		},

		get player() {
			return this.instance.player;
		},

		get volume() {
			return this.player.volume;
		},

		set volume(newVolume) {
			this.player.volume = newVolume;
		},

		homeRecommendations() {
			let recentlyPlayed = this.instance.api.recentPlayed().then((content) => ({
				id: 'recentlyPlayed',
				title: 'Recently Played',
				content,
			}));

			let recommendations = this.instance.api
				.recommendations()
				.then((response) =>
					response.map(
						({
							id,
							attributes: {
								title: { stringForDisplay: title },
							},
							relationships: {
								contents: { data: content },
							},
						}) => ({ id, title, content })
					)
				);

			let flatten = (arr) => [].concat(...arr);
			return Promise.all([recentlyPlayed, recommendations]).then(flatten);
		},

		browseRecommendations() {
			return this.instance.api
				.charts(['songs', 'albums', 'playlists'], { limit: 24 })
				.then(({ songs, albums, playlists }) => [
					...albums,
					...playlists,
					...songs,
				])
				.then((charts) =>
					charts.map(({ name: title, data: content }) => ({
						id: title,
						title,
						content,
					}))
				);
		},
	};
})();

export default MK;
