
const form = document.getElementById('update-form');
const deleteModal = document.getElementById('deleteModal');
const deleteButton = document.querySelector('#deleteModal .btn-danger');

const saveChangesButton = document.querySelector('#editModal .btn-danger');
saveChangesButton.addEventListener('click', (event) => {
  event.preventDefault(); // prevent form submission
  const old_review = document.getElementById('old_review').innerHTML
  const old_rating = document.getElementById('old_rating').innerHTML
  const old_date = document.getElementById('old_date').innerHTML

  const movieId = document.getElementById('movieId').innerHTML;
  const userId = document.getElementById('userId').value
  let review = document.getElementById('review').value;

  let rating = document.getElementById('rating').value;
  let date = document.getElementById('date').value;
  const url_d = window.location.href;
  const activityId = url_d.split("/")[4];
  const url = `/activity/${activityId}`;
  let error_div = document.getElementById('err_c');
  let valid = true;

  if(movieId !== old_moviedId) {
    event.preventDefault();
    valid = false;
    rating = '';
    error_div.hidden = false;
    error_div.innerHTML = 'No changes can be made to movieId';
    return;
  }else {
    error_div.hidden = true;
  }

  if (rating === old_rating && review === old_review && date === old_date) {
    event.preventDefault();
    valid = false;
    rating = '';
    error_div.hidden = false;
    error_div.innerHTML = 'All the fields are same as before. Kindly make some changes if you want to';
    return;
  } else {
    error_div.hidden = true;
  }


  if (!rating || !movieId || !review || !date) {
    event.preventDefault();
    valid = false;
    rating = '';
    error_div.hidden = false;
    error_div.innerHTML = 'All the elements should have some input';
    return;
  } else {
    error_div.hidden = true;
  }
  if (typeof parseInt(rating) !== "number" || isNaN(parseInt(rating))) {
    event.preventDefault();
    valid = false
    rating = ''
    error_div.hidden = false
    error_div.innerHTML = 'Rating Should be a number'
    return
  } else {
    //valid=true
    error_div.hidden = true
  }

  if (rating < 0.5 || rating > 5) {
    event.preventDefault();
    valid = false;
    rating = '';
    error_div.hidden = false;
    error_div.innerHTML = 'Rating should be between 0 and 5';
    return;
  } else {
    error_div.hidden = true;
  }

  if (rating % 0.5 !== 0) {
    event.preventDefault();
    valid = false;
    rating = '';
    error_div.hidden = false;
    error_div.innerHTML = "Rating must be a multiple of 0.5";
    return;
  } else {
    error_div.hidden = true;
  };
  if (typeof review !== "string") {
    event.preventDefault();
    valid = false
    review = ''
    error_div.hidden = false
    error_div.innerHTML = 'Review Should be a String'
    return
  } else {
    valid = true
    error_div.hidden = true
  }
  const parts = date.split("-");
  if (parts.length !== 3) {
    event.preventDefault();
    valid = false
    date = ''
    error_div.hidden = false
    error_div.innerHTML = 'Enter Valid Date YYYY/MM/DD'
    return
  }
  if (parts[0].length !== 4 || parts[1].length !== 2 || parts[2].length !== 2) {
    event.preventDefault();
    valid = false
    date = ''
    error_div.hidden = false
    error_div.innerHTML = 'Enter Valid Date YYYY/MM/DD'
    return
  }
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    event.preventDefault();
    valid = false
    date = ''
    error_div.hidden = false
    error_div.innerHTML ='Month, date and year should be a number'
    return
  }
  if (month < 0 || month > 12) {
    event.preventDefault();
    valid = false
    date = ''
    error_div.hidden = false
    error_div.innerHTML = 'Check Month'
    return
  }
  if (day < 0 || day > 31) {
    event.preventDefault();
    valid = false
    date = ''
    error_div.hidden = false
    error_div.innerHTML = 'Check Date'
    return
  }
  const currYear = new Date(Date.now()).getFullYear();
  if (year < 1900 || year > currYear) {
    event.preventDefault();
    valid = false
    date = ''
    error_div.hidden = false
    error_div.innerHTML = 'Check Year'
    return
  }
  else {
    error_div.hidden = true
  }
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      movieId: movieId,
      userId: userId,
      review: review,
      rating: rating,
      date: date
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update');
      }
      return response.json();
    })
    .then(response => {
      alert("Activity has been edited!");
      location.reload();
      //console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
});

deleteButton.addEventListener('click', () => {
  const url_d = window.location.href;
  const activityId = url_d.split("/")[4];
  const url = `/activity/${activityId}`;
  fetch(url, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response) {

        throw new Error('Failed to delete log');
      }

      return response.json();
    })
    .then(response => {
      //console.log(response);
      alert("Activity has been deleted!");
      //deleteModal.modal('hide');
    })
    .catch(error => {
      console.error(error);
    });
});