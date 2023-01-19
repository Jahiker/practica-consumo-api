const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

const defualtImage =
  "https://ps.w.org/dummy-images/assets/icon-256x256.png?rev=2024916";

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.dataset.img) {
      entry.target.src = entry.target.dataset.img;
    }
  });
});

function renderMovieList(movies, container, clean = true) {
  if (clean) {
    container.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    movieContainer.addEventListener("click", () => {
      location.hash = `movie=${movie.id}`;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.alt = movie.title;
    movieImg.src =
      "https://ps.w.org/dummy-images/assets/icon-256x256.png?rev=2024916";

    movieImg.dataset.img = movie.poster_path
      ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
      : defualtImage;

    observer.observe(movieImg);

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
      with_genres: genre,
    },
  });
  const movies = data.results;

  headerCategoryTitle.innerHTML = title;

  renderMovieList(movies, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api("/search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;

  renderMovieList(movies, genericSection);
}

async function getTrendingMovies(page = 1) {
  const { data } = await api("/trending/movie/day", {
    params: {
      page,
    },
  });

  const movies = data.results;
  
  headerCategoryTitle.innerHTML = "Tendencias";
  
  renderMovieList(movies, genericSection, false);
  
  window.addEventListener("scroll", (e) => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    
    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

    if (scrollIsBottom) {
      getPaginatedTrendingMovies(page + 1);
    }
  });
}

async function getPaginatedTrendingMovies(nextPage) {
  getTrendingMovies(nextPage);
}

async function getMovieById(movie_id) {
  const { data: movie } = await api("/movie/" + movie_id);

  const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

  headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  renderCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesId(movie_id);
}

async function getRelatedMoviesId(movie_id) {
  const { data } = await api("/movie/" + movie_id + "/recommendations");
  const relatedMovies = data.results;

  renderMovieList(relatedMovies, relatedMoviesContainer);
}
