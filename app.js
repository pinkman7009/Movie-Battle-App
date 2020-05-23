createAutocomplete({
	root: document.querySelector('#left-autocomplete'),
	renderOption: (movie) => {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
            <img src = "${imgSrc}">
            ${movie.Title} (${movie.Year})
        `;
	},
	onOptionSelect: (movie) => {
		onMovieSelect(movie, '#left-summary', 'left');
		document.querySelector('.tutorial').classList.add('is-hidden');
	},
	inputValue: (movie) => {
		//decides the value of input after the option is selected
		return movie.Title;
	},
	fetchData: async (searchName) => {
		const response = await axios.get('https://www.omdbapi.com/', {
			params: {
				apikey: '31b2587c',
				s: searchName
			}
		});

		if (response.data.Error) return [];

		return response.data.Search;
	}
});
createAutocomplete({
	root: document.querySelector('#right-autocomplete'),
	renderOption: (movie) => {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
            <img src = "${imgSrc}">
            ${movie.Title} (${movie.Year})
        `;
	},
	onOptionSelect: (movie) => {
		onMovieSelect(movie, '#right-summary', 'right');
		document.querySelector('.tutorial').classList.add('is-hidden');
	},
	inputValue: (movie) => {
		//decides the value of input after the option is selected
		return movie.Title;
	},
	fetchData: async (searchName) => {
		const response = await axios.get('https://www.omdbapi.com/', {
			params: {
				apikey: '31b2587c',
				s: searchName
			}
		});

		if (response.data.Error) return [];

		return response.data.Search;
	}
});

const onMovieSelect = async (movie, summaryID, side) => {
	const response = await axios.get('https://www.omdbapi.com/', {
		params: {
			apikey: '31b2587c',
			i: movie.imdbID
		}
	});

	let colour = side === 'left' ? '12cad6' : '00a8cc';
	document.querySelector(summaryID).innerHTML = movieTemplate(response.data, colour);
};

const movieTemplate = (movieDetail, colour) => {
	const metascore = parseInt(movieDetail.Metascore);
	const imdbRating = parseFloat(movieDetail.imdbRating);
	const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
	let count = 0;
	movieDetail.Awards.split(' ').forEach((word) => {
		let value = parseInt(word);

		if (!isNaN(value)) count = count + value;
	});

	return `
	
	<article class = "media">
	<figure class = "media-left">
		<p class = "image">
		<img src = "${movieDetail.Poster}"
		</p>
	</figure>
	<div class = "media-content">
		<div class = "content">
		<h2>${movieDetail.Title}</h2>
		<h4>${movieDetail.Genre}</h4>
		<p>${movieDetail.Plot}</p>
		</div>
	</div>
	</article>

	<article data-value=${count} class = "notification" style="background-color : #${colour}">
	<p class = "subtitle">Awards</p>
	<p class = "title">${movieDetail.Awards}</p>
	</article>

	<article data-value=${metascore} class = "notification" style="background-color : #${colour};">
	<p class = "subtitle">Metascore</p>
	<p class = "title">${movieDetail.Metascore}</p>
	</article>

	<article data-value=${imdbRating} class = "notification" style="background-color : #${colour};">
	<p class = "subtitle">IMDB Rating</p>
	<p class = "title">${movieDetail.imdbRating}</p>
	</article>

	<article data-value=${imdbVotes} class = "notification" style="background-color : #${colour};">
	<p class = "subtitle">IMDB Votes</p>
	<p class = "title">${movieDetail.imdbVotes}</p>
	</article>

	`;
};
