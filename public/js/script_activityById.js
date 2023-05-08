
const form = document.getElementById('update-form');
const deleteModal = document.getElementById('deleteModal');
const deleteButton = document.querySelector('#deleteModal .btn-danger');
// console.log("check1")


const saveChangesButton = document.querySelector('#editModal .btn-danger');
saveChangesButton.addEventListener('click', (event) => {
  event.preventDefault(); // prevent form submission
//   console.log("button clicked")

    const movieId = document.getElementById('movieId').value
    console.log(`${movieId}ljksdsjncsiodjidjsi&&&&&&&&&`)
    //const data_movieId = { movieId: movieId };

    const userId = document.getElementById('userId').value
    //const data_userId = { userId: userId };

    const review = document.getElementById('review').value; 
    //const data_review = { review: review }; 

    const rating = document.getElementById('rating').value; 
    //const data_rating = { rating: rating }; 

    const date = document.getElementById('date').value; 
    //const data_date = { date: date };
    // console.log("before window")
    const url_d = window.location.href;
    const activityId = url_d.split("/")[4];
    // console.log(`this is the url ${url_d}`)
    // console.log(`${activityId} activity id is this`)
    // activityId = '6456789826472b44ced10c41' //hardcoded
    const url = `/activity/${activityId}`; 
   
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
      console.log(`${movieId}^^^^^^^^^^^^^`)
        console.log("check 3")
        console.log(response);
        //location.reload(); // Reload the page to refresh the datajjjj
    })
    .catch(error => { 
        console.error(error);
    });
});




deleteButton.addEventListener('click', () => {
    const url_d = window.location.href;
    // console.log("hfghjghfhghjhgjfhghjkhjghghjlkhjghghjhjghfghjhjg")
    const activityId = url_d.split("/")[4];
    console.log(`this is the url ${url_d}`)
    // const activityId = '6456789826472b44ced10c41'; 
    const url = `/activity/${activityId}`; 
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      console.log("check21")
      if (!response) {
        
        throw new Error('Failed to delete log');//error in activity data files hence the code is throwing this error
      }
  
      return response.json(); 
    })
    .then(response => {
      
      console.log(response);
      //deleteModal.modal('hide');
    })
    .catch(error => {
      console.error(error);
    });
  });


// deleteButton.addEventListener('click', async () => {
//     try {
//       const activityId = '645532b1eebb1822419282ea'; // get the activity ID from the URL
//       const url = `/activity/${activityId}`; // set DELETE route URL with the activity ID
//       const response = await fetch(url, { method: 'DELETE' });
//       if (!response.ok) {
//         throw new Error('Failed to delete log');
//       }
//       const data = await response.json(); // parse response JSON
//       console.log(data); // handle successful response
//       deleteModal.modal('hide'); // hide the modal after successful deletion
//     } catch (error) {
//       console.error(error); // handle error
//     }
// });