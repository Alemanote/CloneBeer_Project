//Nav-bar Animation
$(function () {
    $('.navbar-toggler').on('click', function (event) {
        event.preventDefault();
        $(this).closest('.navbar-minimal').toggleClass('open');
    })
});

$(document).ready(function () {

    //Post Login  
    $('.login-form').on('submit', function (e) {
        e.preventDefault();

        let loginForm = $(e.currentTarget);
        let username = loginForm["0"].children["0"].children.username.value;
        let password = loginForm["0"][1].value;

        $.ajax({
            url: '/login',
            type: 'POST',
            data: {
                username,
                password
            },
            success: displaySuccessLogin,
            error: displayErrorLogin
        });
    });


    //Post signup
    $('.signup-form').on('submit', function (e) {
        e.preventDefault();

        let signupForm = $(e.currentTarget);
        let name = signupForm["0"].children["0"].childNodes[3].value;
        let username = signupForm["0"].children[1].children[1].value;
        let password = signupForm["0"].children[3].children[1].value;

        $.ajax({
            url: '/signup',
            type: 'POST',
            data: {
                name,
                username,
                password
            },
            success: displaySuccessSignup,
            error: displayErrorSignup
        });
    });
});

function displayErrorLogin(err) {
    if (err.status == 401) {
        $('#loginModal > div > div > div.modal-body > form > div.error-message-login').html('username or password incorrect');
        $('#loginModal > div > div > div.modal-body > form > div.error-message-login').addClass('display-active');
    }
}

function displayErrorSignup(err) {
    if (err.status == 401) {
        $('#signupModal > div > div > div.modal-body > form > div.error-message-signup').html('username is already registered');
        $('#signupModal > div > div > div.modal-body > form > div.error-message-signup').addClass('display-active');
    }
}

function displaySuccessLogin() {
    window.location.replace("/");
}

function displaySuccessSignup() {
    $('#signupModal').modal('hide');
    $('#loginModal').modal('show');
}