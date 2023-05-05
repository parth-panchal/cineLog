import * as helper from "../../utils/helper";

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

const movieArr = async (ipTitle) => {
  let data = await helper.searchMovie(ipTitle);
  let res = data.results.map((elem) => elem.title);
  return res;
};

const showResults = (results) => {
  searchResults.innerHTML = "";

  if (results.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found";
    searchResults.appendChild(li);
    return;
  }
  // Only show up to 10 results
  for (let i = 0; i < Math.min(results.length, 10); i++) {
    const li = document.createElement("li");
    li.textContent = results[i];
    searchResults.appendChild(li);
  }
};

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value;
  const results = searchFruits(searchTerm);
  showResults(results);
});

// Clear the search results when the user clicks outside the search box
document.addEventListener("click", (event) => {
  if (!searchInput.contains(event.target)) {
    searchResults.innerHTML = "";
  }
});
