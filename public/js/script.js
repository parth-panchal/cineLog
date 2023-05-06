(function ($) { 
    let searchForm = $('#searchForm'),
        searchOptionChoice = $('#searchOption'),
        searchTermInput = $('#searchTerm');

    // ===================== Movie Page =====================

    let activityForm = $('#activityCreateForm'),
        activityRatingInput = $('#formCreateRating'),
        activityReviewInput = $('#formCreateReview'),
        activityDateInput = $(`#formCreateDate`),
        addToWatchlistBtn = $(`#addToWatchlistBtn`),
        addToLikesBtn = $(`#addToLikesBtn`)
    
    activityForm.submit(async (event) => {
        event.preventDefault();
        let activityRating = activityRatingInput.val();
        let activityReview = activityReviewInput.val();
        let activityDate = activityDateInput.val();

        // TODO: Validate above
        let requestConfig = {
            method: "PATCH",
            url: activityForm.attr("action"),
            contentType: "application/json",
            data: JSON.stringify({
                type: "activity",
                rating: activityRating,
                review: activityReview,
                date: activityDate
            })
        };

        try {
            const result = await $.ajax(requestConfig);

            console.log(result);
            if(result.success) {
                $('#activityModal').modal('hide');
                window.location.reload();
            }
        } catch (error) {
            console.log(error.responseJSON.error);
        }

    });

    // Shows the value of the slider
    // Made with help from: 
    //  - https://stackoverflow.com/questions/10004723/html5-input-type-range-show-range-value
    //  - https://www.w3schools.com/jsref/event_oninput.asp
    //  - https://stackoverflow.com/questions/28932238/how-to-get-input-range-during-change-with-jquery
    activityRatingInput.on('input change', () => {
        $('#ratingValue').val(activityRatingInput.val()); 
    });

    addToWatchlistBtn.click(async () => {
        let requestConfig = {
            method: "PATCH",
            url: location.path,
            contentType: "application/json",
            data: JSON.stringify({
                type: "watchlist",
            })
        };

        try {
            const result = await $.ajax(requestConfig);

            console.log(result);
            if(result.success) {
                addToWatchlistBtn.text('Added to Watchlist');
                addToWatchlistBtn.prop('disabled', true);
            }
        } catch (error) {
            console.log(error.responseJSON.error);
        }
    });

    addToLikesBtn.click(async () => {
        let requestConfig = {
            method: "PATCH",
            url: location.path,
            contentType: "application/json",
            data: JSON.stringify({
                type: "likes",
            })
        };

        try {
            const result = await $.ajax(requestConfig);

            if(result.success) {
                addToLikesBtn.text("Added to Likes");
                addToLikesBtn.prop('disabled', true);
            }
        } catch (error) {
            console.log(error.responseJSON.error);
        }
    }); 

})(window.jQuery);