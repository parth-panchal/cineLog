const form = document.getElementById("editListForm");
const listId = form.dataset.listId;


// Get list data from the server
async function getListData(listId) {
  try {
    const response = await fetch(`/list/${listId}/in`);
    if (!response.ok) throw new Error("Error fetching list data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching list data:", error);
    return null;
  }
}

async function populateListData(listId) {
  const listData = await getListData(listId);
  if (!listData) return;

  // Populate list name
  const listNameInput = document.getElementById("listName");
  listNameInput.value = listData.list.title;

  // Populate selected movies
  const selectedMovies = document.getElementById("selectedMovies");
  listData.movieList.forEach((movie) => {
    const movieItem = document.createElement("li");
    movieItem.textContent = movie.title;
    movieItem.dataset.movieId = movie.id;
    // Create the "x" button to remove the movie from the list
    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.style.marginLeft = "10px";
    removeButton.addEventListener("click", () => {
      selectedMovies.removeChild(movieItem);
    });
    movieItem.appendChild(removeButton);
    selectedMovies.appendChild(movieItem);
  });
}

populateListData(listId);

function showAlert(message, color,timeout = 3000) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "20px";
  alertDiv.style.right = "20px";
  alertDiv.style.padding = "10px";
  alertDiv.style.backgroundColor = color;
  alertDiv.style.color = "white";
  alertDiv.style.zIndex = "1000";
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    document.body.removeChild(alertDiv);
  }, timeout);
}

async function searchMovies() {
  const searchInput = document.getElementById("searchMovie");
  const movieTitle = searchInput.value;

  if (!movieTitle) return;

  try {
    const response = await fetch(`/search/movi/${movieTitle}`);
    const data = await response.json();
    displaySearchResults(data.results);
  } catch (error) {
    console.log("Error searching for movies:", error);
  }
}

function displaySearchResults(movies) {
  const searchResults = document.getElementById("searchResults");
  searchResults.classList.add("horizontal-list");
  const selectedMovies = document.getElementById("selectedMovies");
  searchResults.innerHTML = "";

  if (movies.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found";
    searchResults.appendChild(li);
    return;
  }

  for (const movie of movies) {
    const li = document.createElement("li");
    li.textContent = `${movie.title} (${movie.release_date.slice(0, 4)})`;
    li.dataset.movieId = movie.id;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      const existingItem = document.querySelector(
        `#selectedMovies [data-movie-id="${movie.id}"]`
      );
      if (existingItem) {
        showAlert("Movie already added to the list","red");
        return;
      }

      const newItem = document.createElement("li");
      newItem.textContent = `${movie.title} (${movie.release_date.slice(
        0,
        4
      )})`;
      newItem.dataset.movieId = movie.id;

      // Create the "x" button to remove the movie from the list
      const removeButton = document.createElement("button");
      removeButton.textContent = "x";
      removeButton.style.marginLeft = "10px";
      removeButton.addEventListener("click", () => {
        selectedMovies.removeChild(newItem);
      });
      newItem.appendChild(removeButton);
      selectedMovies.appendChild(newItem);
    });
    searchResults.appendChild(li);
  }
}

async function updateList(listId, title, movies) {
  try {
    const response = await fetch(`/list/${listId}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        movies: movies,
      }),
    });
    if (!response.ok) {
      throw "Error updating the list";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error updating the list:", error);
  }
}

// Add event listener for form submission

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("listName");
  const title = titleInput.value;
  if (!title) {
    showAlert("Please enter a list title.", "red");
    return;
  }

  const selectedMovies = document.getElementById("selectedMovies");
  const movieIds = Array.from(selectedMovies.children).map(
    (item) => item.dataset.movieId
  );

  if (!movieIds) {
    showAlert("List is empty", "red");
    return;
  }

  const updatedList = await updateList(listId, title, movieIds);
  if (updatedList) {
    showAlert("List updated successfully", "green");

    // Redirect to the list details page
    setTimeout(() => {
      window.location.href = `/list/${updatedList._id}`;
    }, 3000);
  } else {
    showAlert("Failed to update the list", "red");
  }
});

const btn = document.querySelector('#editListForm button[type="button"]');
btn?.addEventListener("click", searchMovies);


