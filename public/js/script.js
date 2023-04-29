(function ($) { 
    let searchForm = $('#searchForm'),
        searchOption = $('#searchOption'),
        searchText = $('#searchText');

    searchForm.submit( event => {
        event.preventDefault();

        console.log(searchForm);
        console.log(searchOption);
        console.log(searchText);
    });

    loginButton.click(() => {
        window.location.href = '/login';
    });

    signupButton.click(() => {
        window.location.href = '/signup';
    });

})(window.jQuery);