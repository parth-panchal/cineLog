(function ($) { 
    let searchForm = $('#searchForm'),
        searchOptionChoice = $('#searchOption'),
        searchTermInput = $('#searchTerm');

    // searchForm.submit(async (event) => {
    //     event.preventDefault();
    //     let searchOption = searchOptionChoice.val();
    //     let searchTerm = searchTermInput.val();

    //     // TODO:  Validate searchOption and searchTerm

    //     if(searchTerm && searchOption) {
    //         let requestConfig = {
    //             method: "GET",
    //             url: `/search/${searchOption}/${searchTerm}`,
    //             contentType: "application/json"
    //         };
    //         try {
    //         const result = await $.ajax(requestConfig);

    //         console.log(result);

    //         } catch (error) {
    //             console.log(error.responseJSON.error);
    //         }
    //     }
    // })

})(window.jQuery);