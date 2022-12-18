const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        api_key: API_KEY
    }
});

async function getTrendingMoviesPreview() {
    const { data } = await api("/trending/movie/day");
    const movies = data.results;

    movies.forEach(movie => {
        const trendingPreviewMovieContainer = document.querySelector("#trendingPreview .trendingPreview-movieList");
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.alt = movie.title;
        movieImg.src = "https://image.tmdb.org/t/p/w300" + movie.poster_path;

        movieContainer.appendChild(movieImg);
        trendingPreviewMovieContainer.appendChild(movieContainer);
    });
}

getTrendingMoviesPreview();

async function getCategoriesPreview() {
    const { data } = await api("/genre/movie/list");
    const categories = data.genres;

    categories.forEach(category => {
        const previewCategoriesList = document.querySelector("#categoriesPreview .categoriesPreview-list");
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.id = "id" + category.id
        categoryTitle.textContent = category.name;

        categoryContainer.appendChild(categoryTitle);
        previewCategoriesList.appendChild(categoryContainer);
    });
}

getCategoriesPreview();
