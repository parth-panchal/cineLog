function showAlert(message, timeout = 3000) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "20px";
  alertDiv.style.right = "20px";
  alertDiv.style.padding = "10px";
  alertDiv.style.backgroundColor = "red";
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
        showAlert("Movie already added to the list");
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

// Your addMovieToList function and event listeners go here

async function saveList(title, movies) {
  try {
    const response = await fetch("/profile/lists/newlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        movies: movies,
      }),
    });
    if (!response.ok) {
      throw "Error saving the list";
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Error saving the list:", error);
  }
}

// Add event listener for form submission
const form = document.getElementById("createListForm");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("listName");
  const title = titleInput.value;
  if (!title) {
    showAlert("Please enter a list title.");
    return;
  }

  const selectedMovies = document.getElementById("selectedMovies");
  const movieIds = Array.from(selectedMovies.children).map(
    (item) => item.dataset.movieId
  );

  if (!movieIds) {
    showAlert("List is empty");
    return;
  }

  const newList = await saveList(title, movieIds);
  if (newList) {
    showAlert("List created successfully");
    // Hide the "Create List" button
    const createListButton = document.querySelector(
      "#createListForm button[type='submit']"
    );
    createListButton.style.display = "none";

    // Create and show the "View List" button
    const viewListButton = document.createElement("button");
    viewListButton.textContent = "View List";
    viewListButton.addEventListener("click", () => {
      // Redirect to the list details page
      window.location.href = `/list/${newList._id}`;
    });
    createListButton.parentElement.appendChild(viewListButton);
  } else {
    showAlert("Failed to create the list");
  }
});

const btn = document.querySelector("#createListForm button[type='button']");
btn?.addEventListener("click", searchMovies);
