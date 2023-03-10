let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener("click", () => {
  location.hash = "search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "trends";
});

arrowBtn.addEventListener("click", () => {
  window.history.back();
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, { passive: false });

window.addEventListener("scroll", (e) => {
  const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

  if (scrollIsBottom) {
    if (location.hash.startsWith("#trends")) {
      getTrendingMovies(page);
    } else if (location.hash.startsWith("#search=")) {
      const [, query] = window.location.hash.split("=");
      getMoviesBySearch(query, page);
    } else if (location.hash.startsWith("#category=")) {
      const category = window.location.hash.split("=")[1].split("-");
      category[1] = category[1].replaceAll("%20", " ");
      getMoviesByCategory(category, page);
    }
    page++;
  }
});

function navigator() {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function homePage() {
  console.log("HOME");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getCategoriesPreview();
  getTrendingMoviesPreview();
}

function categoriesPage() {
  console.log("CATEGORIES");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const category = window.location.hash.split("=")[1].split("-");
  category[1] = category[1].replaceAll("%20", " ");

  getMoviesByCategory(category, page);
}

function movieDetailsPage() {
  console.log("Movie!!");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = '';

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [, id] = window.location.hash.split("=");

  getMovieById(id);
}

function searchPage() {
  console.log("SEARCH");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [, query] = window.location.hash.split("=");

  getMoviesBySearch(query, page);
}

function trendsPage() {
  console.log("TRENDS!!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";

  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMovies();
}
