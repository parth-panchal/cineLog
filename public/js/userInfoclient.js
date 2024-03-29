(function () {
    const edit_form = document.getElementById(editForm);
    const editButton = document.getElementById(editButton);
    const cancelButton = document.getElementById(editButton);
    const saveButton = document.getElementById(saveButton);
    //const editButton = document.getElementById(editButton);

    const changePasswordButton = document.getElementById(changePasswordButton);
    let firstName_input = document.getElementById(fName)
    let lastName_input = document.getElementById(lName)
    let userName_input = document.getElementById(username)
    let password_input = document.getElementById(newPassword);
    
    const disableFormFields = () => {
        userName_input.disabled = true;
        firstName_input.disabled = true;
        lastName_input.disabled = true;
    };

    const enableButton = () => {
        userName_input.disabled = false;
        firstName_input.disabled = false;
        lastName_input.disabled = false;
    }
    const showsave = () => {
        saveButton.style.display = "inline-block";
        cancelButton.style.display = "inline-block";
    }
    const hidesave = () => {
        saveButton.style.display = "none";
        cancelButton.style.display = "none";
    }
    const handleeditbtn = () => {
        disableFormFields();
        showsave();
    }
    const handlecancel = () => {
        enableButton();
        hidesave();
    }
    const handleChangePassword = () => {
        disableFormFields();
        password_input.disabled = false;
        password_input.value = "";
        password_input.placeholder = "New Password";
        password_input.focus();
        let confirm_password_input = document.createElement("input");
        confirm_password_input.type = "Password";
        confirm_password_input.name = "Confirm_Password";
        confirm_password_input.id = "Confirm_Password";
        confirm_password_input.placeholder = " Confirm Password";
        confirm_password_input.required = "true";
        password_input.after(confirm_password_input);
        showsave();
    }
    const handlesave = () => {
        edit_form.submit();
    }
    if(editButton) {
        editButton.addEventListener("click", (event) => {
            changePasswordButton.disabled = true;
            editButton.hidden = true;
            saveButton.hidden = false;
            cancelButton.hidden = false;
        });
    }
    if(saveButton) {
        saveButton.addEventListener("click", (event) => {
// code
        });
    }
    if(cancelButton) {
        cancelButton.addEventListener("click", (event) => {
            changePasswordButton.disabled = false;
            editButton.hidden = false;
            saveButton.hidden = true;
            cancelButton.hidden = true;
        });
    }
    if(edit_form) {
        edit_form.addEventListener("editButton", (event) => {
        event.preventDefault();
        valid = true;
        if(!firstName_input.value){
            valid = false
            firstName_input = ''
            err.hidden = false
            err.innerHTML = " First name not provided"
            return
        }
        else {
            valid = true
            err.hidden = true
        }

        if(!firstName_input.value.length < 2 || !firstName_input.value.length > 25 ){
            valid = false
            firstName_input = ''
            err.hidden = false
            err.innerHTML = " First name mustt be between 2 and 25 characters"
            return 
        }
        else {
            valid = true
            err.hidden = true
        }

        if(/\d/.test(firstName_input)){
            valid = false
            firstName_input = ''
            err.hidden = false
            err.innerHTML = " First name can not have numbers"
            return 
        }
        else {
            valid = true
            err.hidden = true
        }


        if(!lastName_input.value){
            valid = false
            lastName_input = ''
            err.hidden = false
            err.innerHTML = " Last name not provided"
            return
        }
        else {
            valid = true
            err.hidden = true
        }

        if(!lastName_input.value.length < 2 || !lastName_input.value.length > 25 ){
            valid = false
            lastName_input = ''
            err.hidden = false
            err.innerHTML = " Last name mustt be between 2 and 25 characters"
            return 
        }
        else {
            valid = true
            err.hidden = true
        }

        if(/\d/.test(lastName_input)){
            valid = false
            lastName_input = ''
            err.hidden = false
            err.innerHTML = " Last name can not have numbers"
            return 
        }
        else {
            valid = true
            err.hidden = true
        }

        }
        )
    }
})