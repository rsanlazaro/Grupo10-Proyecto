window.addEventListener("load", function () {
    let loginForm = document.getElementById("loginForm");

    let emailInput = document.querySelector("#email");
    let passwordInput = document.querySelector("#password");

    loginForm.addEventListener("submit", function (event) {
        let email = ValidarEmail(true);
        let password = ValidarPassword(true);

        if (email != "" || password != "") {
            event.preventDefault();
        }
    });

    emailInput.addEventListener('input', function () {
        ValidarEmail(false);
    });

    passwordInput.addEventListener('input', function () {
        ValidarPassword(false);
    });

    function ValidarEmail(result) {   
        let emailError = document.querySelector(".validateEmail");
        if (emailInput.value == "") {
            emailError.innerHTML = "El campo correo no puede estar vacío.";
        } else {
            let validate = /\S+@\S+\.\S+/;
            if (validate.test(emailInput.value) == false) {
                emailError.innerHTML = "Debes ingresar un correo válido.";
            } else {
                emailError.innerHTML = "";
            }
        }
        if (result == true) {
            return emailError.innerHTML;
        }
    };

    function ValidarPassword(result) {
        let passwordError = document.querySelector(".validatePassword");
        if (passwordInput.value == "") {
            passwordError.innerHTML = "El campo contraseña no puede estar vacío.";
        } else {
            passwordError.innerHTML = "";
        }
        if (result == true) {
            return passwordError.innerHTML;
        }
    };
});