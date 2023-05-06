//following
(function ($) {
  let form = document.querySelector('form[action="/profile/following"]');
  if (form) {
    form.addEventListener("submit", function (event) {
      let method = form.querySelector('input[name="_method"]');
      let followingId = form.querySelector('input[name="followingId"]');
      let operation = form.querySelector('input[name="operation"]');
      if (method.value !== "PATCH") {
        console.error("Invalid form method:", method.value);
        event.preventDefault(); // prevent form submission
      }
      if (!followingId.value) {
        console.error("Invalid movie ID:", followingId.value);
        event.preventDefault(); // prevent form submission
      }
      if (operation.value !== "remove") {
        console.error("Invalid operation:", operation.value);
        event.preventDefault(); // prevent form submission
      }
    });
  }
})(window.jQuery);

//likes
(function ($) {
  let form = document.querySelector('form[action="/profile/likes"]');
  if (form) {
    form.addEventListener("submit", function (event) {
      let method = form.querySelector('input[name="_method"]');
      let movieId = form.querySelector('input[name="movieId"]');
      let operation = form.querySelector('input[name="operation"]');
      if (method.value !== "PATCH") {
        console.error("Invalid form method:", method.value);
        event.preventDefault(); // prevent form submission
      }
      if (!movieId.value) {
        console.error("Invalid movie ID:", movieId.value);
        event.preventDefault(); // prevent form submission
      }
      if (operation.value !== "remove") {
        console.error("Invalid operation:", operation.value);
        event.preventDefault(); // prevent form submission
      }
    });
  }
})(window.jQuery);

//watchlist
(function ($) {
  let form = document.querySelector('form[action="/profile/watchlist"]');
  if (form) {
    form.addEventListener("submit", function (event) {
      let method = form.querySelector('input[name="_method"]');
      let movieId = form.querySelector('input[name="movieId"]');
      let operation = form.querySelector('input[name="operation"]');
      if (method.value !== "PATCH") {
        console.error("Invalid form method:", method.value);
        event.preventDefault(); // prevent form submission
      }
      if (!movieId.value) {
        console.error("Invalid movie ID:", movieId.value);
        event.preventDefault(); // prevent form submission
      }
      if (operation.value !== "remove") {
        console.error("Invalid operation:", operation.value);
        event.preventDefault(); // prevent form submission
      }
    });
  }
})(window.jQuery);
