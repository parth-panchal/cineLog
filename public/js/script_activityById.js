
const form = document.getElementById('update-form');
const deleteModal = document.getElementById('deleteModal');
const deleteButton = document.querySelector('#deleteModal .btn-danger');



const saveChangesButton = document.querySelector('#editModal .btn-danger');
saveChangesButton.addEventListener('click', (event) => {
    event.preventDefault(); // prevent form submission
    const old_moviedId = document.getElementById('old_movieId').value
    const old_review = document.getElementById('old_review').value
    const old_rating = document.getElementById('old_rating').value
    const old_date = document.getElementById('old_date').value

    const movieId = document.getElementById('movieId').value
    const userId = document.getElementById('userId').value
    const review = document.getElementById('review').value; 

    const rating = document.getElementById('rating').value; 
    const date = document.getElementById('date').value; 
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
      console.log(error_div.innerHTML)
      return;
    }else {
      error_div.hidden = true;
    }

    if(rating === old_rating && review === old_review && date === old_date) {
      event.preventDefault();
      valid = false;
      rating = '';
      error_div.hidden = false;
      error_div.innerHTML = 'All the fields are same as before. Kindly make some changes if you want to';
      console.log(error_div.innerHTML)
      return;
    }else {
      error_div.hidden = true;
    }


    if(!rating || !movieId || !review || !date) {
      event.preventDefault();
      valid = false;
      rating = '';
      error_div.hidden = false;
      error_div.innerHTML = 'All the elements should have some input';
      console.log(error_div.innerHTML)
      return;
    }else {
      error_div.hidden = true;
    }


    if (rating < 0.5 || rating > 5) {
      event.preventDefault();
      valid = false;
      rating = '';
      error_div.hidden = false;
      error_div.innerHTML = 'Rating should be between 0 and 5';
      console.log(error_div.innerHTML)
      return;
    } else {
      error_div.hidden = true;
    }

    if (rating % 0.5 !== 0) {
      event.preventDefault();
      valid = false;
      rating = '';
      error_div.hidden = false;
      error_div.innerHTML = "Error: Rating must be a multiple of 0.5";
      console.log(error_div.innerHTML)
      return;
    } else {
      error_div.hidden = true;
    };

    
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
      // console.log(`${movieId}^^^^^^^^^^^^^`)
      //   console.log("check 3")
      alert("Activity has been edited!");
      location.reload();
        console.log(response);
    })
    .catch(error => { 
        console.error(error);
    });
});

deleteButton.addEventListener('click', () => {
    const url_d = window.location.href;
    const activityId = url_d.split("/")[4];
    console.log(`this is the url ${url_d}`)
    const url = `/activity/${activityId}`; 
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      console.log("check21")
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