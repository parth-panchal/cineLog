(function ($) { 
    let searchForm = $('#searchForm'),
        searchOption = $('#searchOption'),
        searchText = $('#searchText');

    searchForm.submit( event => {
        event.preventDefault();

        console.log(searchForm);
        console.log(searchOption);
        console.log(searchText);
    })

})(window.jQuery);