const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const results = document.getElementById('results');


async function searchMovies(searchTerm) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=4ea9c963`);
    const data = await response.json();
    if (data.Error) {
      results.innerHTML = `<p>${data.Error}</p>`;
      return;
    }
    const movies = data.Search;
    results.innerHTML = movies.map(movie => {
      return `
        <div class="movie" data-imdbid="${movie.imdbID}">
          <div class="poster">
            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">
              <img src="${movie.Poster}" alt="${movie.Title} poster">
            </a>
          </div>
        </div>
      `;
    }).join('');
    redirectToIMDB();
  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>There was an error fetching the data.</p>';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    return;
  }
  searchMovies(searchTerm);
});


function redirectToIMDB() {
  const movieElements = document.querySelectorAll('.movie');
  movieElements.forEach(movie => {
    const imdbID = movie.getAttribute('data-imdbid');
    movie.addEventListener('click', () => {
      window.open(`https://www.imdb.com/title/${imdbID}/`, '_blank');
    });
  });
}
