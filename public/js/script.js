const checkString = (strVal, name) => {
    if (typeof strVal !== "string") throw `Error: ${name} must be a string`;
  
    if (strVal.trim().length === 0)
      throw `Error: ${name} cannot be an empty string or just spaces`;
  
    // This would make sense to check for strings, but commented out because
    // not sure if we need this
    // if (!isNaN(strVal.trim())) throw `Error: ${name} only contains digits`;
  
    return strVal.trim();
  };
  
  const checkStringArray = (arr, name) => {
    if (!Array.isArray(arr)) throw `Error: ${name} must be an array`;
  
    if (arr.length === 0) throw `Error: ${name} must have at least one element`;
  
    for (let index in arr) {
      arr[index] = validateString(arr[index], `${name} elements`);
    }
  
    return arr;
  };
  
  function isLetter(char) {
    return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
  }
  
  function isNumber(char) {
    return char >= "0" && char <= "9";
  }
  
  //vallidates that username is in the following format:
  //1. does not start with a number
  //2. can only contain letters, numbers, periods, and underscores
  //3. must be between 3 and 20 characters
  const checkUsername = (username) => {
    username = checkString(username, "Username");
    username = username.toLowerCase();
    if (!isLetter(username.charAt(0)))
      throw "Error: Username must start with a letter";
    for (let i = 0; i < username.length; i++) {
      const char = username.charAt(i);
      if (!isLetter(char) && !isNumber(char) && char !== "." && char !== "_")
        throw "Error: Username can only contain letters, numbers, periods, and underscores";
    }
    if (username.length < 3 || username.length > 20)
      throw "Error: Username must be between 3 and 20 characters";
    return username;
  };
  
  //adding a separate validation for rating, as it has different requirements
  //the idea is that when we say ratings, we're actually talking about how many 'stars' a user gives a movie,
  //so the rating must be between 0 and 5, and must be a multiple of 0.5.
  //I've seen some websites that allow users to give half stars, so I think this is a good idea.
  const checkRating = (rating) => {
    rating = checkNumber(parseInt(rating), "Rating");
    if (rating < 0.5 || rating > 5) throw "Error: Rating must be between 0 and 5";
    if (rating % 0.5 !== 0) throw "Error: Rating must be a multiple of 0.5";
    return rating;
  };
  
  const checkNumber = (numVal, name) => {
    if (typeof numVal !== "number" || isNaN(numVal))
      throw `Error: ${name} must be a valid number`;
    return numVal;
  };
  
  const checkNumberAndRoundOne = (numVal, name) => {
    checkNumber(numVal, name);
    const roundedNum = Math.floor(numVal * 10) / 10;
    return roundedNum;
  };
  
  // Validate that date is in MM/DD/YYYY format
  // Assume that dateVal is string
  // Will probably change depending on how we handle dates
  const checkDate = (dateVal, name) => {
    dateVal = checkString(dateVal, name);
  
    // Seperate the date into 3 parts
    // parts[0]: Year
    // parts[1]: Month
    // parts[2]: Day
    const parts = dateVal.split("-");
    if (parts.length !== 3) throw `Error: Invalid date for ${name}`;
  
    if (parts[0].length !== 4 || parts[1].length !== 2 || parts[2].length !== 2)
      throw `Error: Invalid format for ${name}: Must be in YYYY/MM/DD form`;
  
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
  
    if (isNaN(month) || isNaN(day) || isNaN(year))
      throw `Error: Invalid format for ${name}: Month, Day, and Year must all be valid numbers`;
  
    if (month < 0 || month > 12)
      throw `Error: Invalid format for ${name}: Month Invalid Range`;
    if (day < 0 || day > 31)
      throw `Error: Invalid format for ${name}: Day Invalid Range`;
    const currYear = new Date(Date.now()).getFullYear();
    if (year < 1900 || year > currYear)
      `Error: Invalid format for ${name}: Year Invalid Range (1900 - ${currYear})`;
    return dateVal;
  };
  
  // Validates that the given arguments are provided
  // name: Descriptive name detailing what the arguments are for
  // Note, this will throw an error for the int 0, do not use if expected input can be 0
  // Note, this does not return which arguments were not provided, just general case for all args passed
  const checkProvided = (name, ...args) => {
    for (let arg in args) {
      if (!args[arg]) throw `Error: All fields must be provided for ${name}`;
    }
  };
  
  const checkName = (name, variableName) => {
    checkString(name, variableName);
    if (name.length < 2 || name.length > 25)
      throw `${variableName} must be between 2 and 25 characters`;
    if (name.match(/\d/))
      throw `${variableName} must not contain numbers`;
    return name.toLowerCase();
  };
  
  const checkPassword = (password) => {
    checkString(password, "Password");
    if (password.length < 8) throw "password must be at least 8 characters";
    if (!password.match(/[A-Z]/))
      throw "password must contain at least one uppercase letter";
    if (!password.match(/\d/)) throw "password must contain at least one number";
    if (!password.match(/[^A-Za-z0-9]/))
      throw "password must contain at least one special character";
    return password;
  };
  
  const checkOperation = (operation) => {
    checkString(operation, "Operation");
    if (operation !== "add" && operation !== "remove")
      throw "Error: Operation must be either 'add' or 'remove'";
    return operation;
  };

(function ($) { 

    // ===================== Sign Up =====================

    let signupForm = $(`#signUpForm`),
        firstNameInput = $(`#firstNameInput`),
        lastNameInput = $(`#lastNameInput`),
        usernameInput = $(`#usernameInput`),
        passwordInput = $(`#passwordInput`),
        confirmPassInput = $(`#confirmPasswordInput`),
        signupErrorDiv = $(`#signupErrorDiv`);

    signupForm.submit(async (event) => {
        let firstName = firstNameInput.val();
        let lastName = lastNameInput.val();
        let username = usernameInput.val();
        let pass = passwordInput.val();
        let confirmPass = confirmPassInput.val();

        let errors = [];
        signupErrorDiv.text('');
        signupErrorDiv.attr("hidden", true);

        if(!firstName) {
            errors.push("You must enter a value for First Name");
        }

        if(!lastName) {
            errors.push("You must enter a value for Last Name");
        }

        if(!username) {
            errors.push("You must enter a value for Username");
        }

        if(!pass) {
            errors.push("You must enter a value for Password");
        }

        if(!confirmPass) {
            errors.push("You must enter a value for Confirm Password");
        }

        if(errors.length > 0) {
            event.preventDefault();
            signupErrorDiv.text(errors);
            signupErrorDiv.removeAttr("hidden");
            return;
        }

        try {
            firstName = checkName(firstName, "First Name");
        } catch (error) {
            errors.push(error);
        }

        try {
            lastName = checkName(lastName, "Last Name");
        } catch (error) {
            errors.push(error);
        }

        try {
            username = checkUsername(username);
        } catch (error) {
            errors.push(error);
        }

        try {
            pass = checkPassword(pass);
        } catch (error) {
            errors.push(error);
        }

        if(confirmPass !== pass) errors.push("Error: Password and Confirm Password do not match");

        if(errors.length > 0) {
            event.preventDefault();
            signupErrorDiv.text(errors);
            signupErrorDiv.removeAttr("hidden");
            return;
        }
        
    })

    // ===================== Sign Up =====================

    let loginForm = $('#loginForm'),
        loginErrorDiv = $('#loginErrorDiv');
    
    loginForm.submit(async (event) => {
        let username = usernameInput.val();
        let pass = passwordInput.val();

        let errors = [];
        loginErrorDiv.text('');
        loginErrorDiv.attr("hidden", true);

        if(!username) {
            errors.push("You must enter a value for Username");
        }

        if(!pass) {
            errors.push("You must enter a value for Password");
        }

        if(errors.length > 0) {
            event.preventDefault();
            loginErrorDiv.text(errors);
            loginErrorDiv.removeAttr("hidden");
            return;
        }

        try {
            username = checkUsername(username);
        } catch (error) {
            errors.push(error);
        }

        try {
            pass = checkPassword(pass);
        } catch (error) {
            errors.push(error);
        }

        if(errors.length > 0) {
            event.preventDefault();
            signupErrorDiv.text(errors);
            signupErrorDiv.removeAttr("hidden");
            return;
        }
    })

    // ===================== Search Bar =====================

    let searchForm = $('#searchForm'),
        searchOptionChoice = $('#searchOption'),
        searchTermInput = $('#searchTerm'),
        searchErrorDiv = $(`#searchFormErrorDiv`);
    
    searchForm.submit(async (event) => {
        let searchChoice = searchOptionChoice.val();
        let searchTerm = searchTermInput.val();

        let errors = [];
        searchErrorDiv.text('');
        searchErrorDiv.attr("hidden", true);

        if(!searchChoice) {
            errors.push("Search choice must only be 'Movies' or 'Users'");
        }

        if(!searchTerm) {
            errors.push("Search cannot be empty!");
        }

        if(errors.length > 0) {
            event.preventDefault();
            searchErrorDiv.text(errors);
            searchErrorDiv.removeAttr("hidden");
            return;
        }

        if(searchChoice !== 'movies' && searchChoice !== 'users') errors.push("Search choice must only be 'Movies' or 'Users'");

        try {
            searchTerm = checkString(searchTerm, "Search Term");
        } catch (error) {
            errors.push(error);
        }

        if(errors.length > 0) {
            event.preventDefault();
            searchErrorDiv.text(errors);
            searchErrorDiv.removeAttr("hidden");
            return;
        }
    })

    // ===================== Movie Page =====================

    let activityForm = $('#activityCreateForm'),
        activityRatingInput = $('#formCreateRating'),
        activityReviewInput = $('#formCreateReview'),
        activityDateInput = $(`#formCreateDate`),
        addToWatchlistBtn = $(`#addToWatchlistBtn`),
        addToLikesBtn = $(`#addToLikesBtn`),
        errorDiv = $(`#error`),
        backendErrorDiv = $(`#backendError`);

    activityForm.submit(async (event) => {
        event.preventDefault();
        let activityRating = activityRatingInput.val();
        let activityReview = activityReviewInput.val();
        let activityDate = activityDateInput.val();

        let errors = [];
        errorDiv.text('');
        errorDiv.attr("hidden", true);
        backendErrorDiv.text('');
        backendErrorDiv.attr("hidden", true);

        if(!activityRating) {
            errors.push("You must give a rating!");
        }

        if(!activityReview) {
            errors.push("You must give a review");
        }

        if(!activityDate) {
            errors.push("You must give a date!");
        }

        if(errors.length > 0) {
            errorDiv.text(errors);
            errorDiv.removeAttr("hidden");
            return;
        }

        try {
            activityRating = checkRating(activityRating);
        } catch (error) {
            errors.push(error);
        }

        try {
            activityReview = checkString(activityReview, "Review");
        } catch (error) {
            errors.push(error);
        }

        try {
            activityDate = checkDate(activityDate, "Date");
        } catch (error) {
            errors.push(error);
        }

        if(errors.length > 0) {
            errorDiv.text(errors);
            errorDiv.removeAttr("hidden");
            return;
        }

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

            if(result.success) {
                $('#activityModal').modal('hide');
                window.location.reload();
            } else {
                errorDiv.text('An error has occurred. Please try again later.');
                errorDiv.removeAttr("hidden");
                return;
            }
        } catch (error) {
            console.log(error.responseJSON.error);
            errorDiv.text(error.responseJSON.error);
            errorDiv.removeAttr("hidden");
            return;
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
        backendErrorDiv.text('');
        backendErrorDiv.attr("hidden", true);

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

            if(result.success) {
                addToWatchlistBtn.text('Added to Watchlist');
                addToWatchlistBtn.prop('disabled', true);
            } else {
                backendErrorDiv.text('An error has occurred. Please try again later.');
                backendErrorDiv.removeAttr("hidden");
                return;
            } 
            
        } catch (error) {
            console.log(error.responseJSON.error);
            backendErrorDiv.text(error.responseJSON.error);
            backendErrorDiv.removeAttr("hidden");
            return;
        }
    });

    addToLikesBtn.click(async () => {
        backendErrorDiv.text('');
        backendErrorDiv.attr("hidden", true);

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
            } else {
                backendErrorDiv.text('An error has occurred. Please try again later.');
                backendErrorDiv.removeAttr("hidden");
                return;
            }
            
        } catch (error) {
            console.log(error.responseJSON.error);
            backendErrorDiv.text(error.responseJSON.error);
            backendErrorDiv.removeAttr("hidden");
            return;
        }
    });
    
    // ===================== User Page =====================
    
    let addToFollowBtn = $('#addToFollowBtn');

    addToFollowBtn.click(async () => {
        backendErrorDiv.text('');
        backendErrorDiv.attr("hidden", true);

        let requestConfig = {
            method: 'PATCH',
            url: location.path,
            contentType: 'application/json',
        };

        try {
            const result = await $.ajax(requestConfig);

            if(result.success) {
                addToFollowBtn.text("Added to Following");
                addToFollowBtn.prop('disabled', true);
            } else {
                backendErrorDiv.text('An error has occurred. Please try again later.');
                backendErrorDiv.removeAttr("hidden");
                return;
            }

        } catch (error) {
            console.log(error.responseJSON.error);
            backendErrorDiv.text(error.responseJSON.error);
            backendErrorDiv.removeAttr("hidden");
            return;
        }
    })

})(window.jQuery);