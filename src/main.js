const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

function renderMovieList(movies, container) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.alt = movie.title;
    movieImg.src = "https://image.tmdb.org/t/p/w300" + movie.poster_path;

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function renderCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.id = "id" + category.id;
    categoryTitle.addEventListener("click", () => {
      location.hash = `category=${category.id}-${category.name}`;
    });
    categoryTitle.textContent = category.name;

    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

async function getTrendingMoviesPreview() {
  const { data } = await api("/trending/movie/day");
  const movies = data.results;

  renderMovieList(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const { data } = await api("/genre/movie/list");
  const categories = data.genres;

  renderCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(category) {
  const [genre, title] = category;
  const { data } = await api("/discover/movie", {
    params: {
      with_genres: genre
    }
  });
  const movies = data.results;

  headerCategoryTitle.innerHTML = title;

  renderMovieList(movies, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api("/search/movie", {
    params: {
      query
    }
  });
  const movies = data.results;

  renderMovieList(movies, genericSection);
}