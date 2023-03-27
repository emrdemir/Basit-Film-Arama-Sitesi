const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const results = document.getElementById('results');

// Film arama fonksiyonu.
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
          <div class="details">
            <h2 class="title">${movie.Title}</h2>
            <p class="year">${movie.Year}</p>
            <p class="plot">${movie.Plot}</p>
            <p class="director"><strong>Director:</strong> ${movie.Director}</p>
            <p class="actors"><strong>Actors:</strong> ${movie.Actors}</p>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>There was an error fetching the data.</p>';
  }
}

// Film arama formuna submit event listener'ı ekleme.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    return;
  }
  searchMovies(searchTerm);
});

// Film detaylarına yönlendirme fonksiyonu.
function redirectToIMDB() {
  const movieElements = document.querySelectorAll('.movie');
  movieElements.forEach(movie => {
    const imdbID = movie.getAttribute('data-imdbid');
    movie.addEventListener('click', () => {
      window.open(`https://www.imdb.com/title/${imdbID}/`, '_blank');
    });
  });
}


redirectToIMDB();
