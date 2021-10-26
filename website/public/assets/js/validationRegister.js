window.addEventListener("load", function () {
    let formRegister = document.getElementById("formRegister");

    let inputName = document.querySelector("#name");
    let inputEmail = document.querySelector("#email");
    let inputPassword = document.querySelector("#passwordd");

    formRegister.addEventListener("submit", function (event) {
        let name = ValidarName(true);
        let email = ValidarEmail(true);
        let password = ValidarPassword(true);

        if (name != "" || email != "" || password != "") {
            event.preventDefault();
        }
    })

    inputName.addEventListener('input', function () {
        ValidarName(false);
    });


    inputEmail.addEventListener('input', function () {
        ValidarEmail(false);
    });

    inputPassword.addEventListener('input', function () {
        ValidarPassword(false);
    });

    function ValidarName(returnNeeded) {
        let nameError = document.querySelector(".validateName");
        if (inputName.value == "") {
            nameError.innerHTML = "El campo nombre no puede estar vacío.";
        } else if (inputName.value.length < 2) {
            nameError.innerHTML = "Ingrese nombre con mínimo de 2 caracteres.";
        } else if (inputName.value.length >= 2) {
            nameError.innerHTML = "";
        }
        if (result == true) {
            return nameError.innerHTML;
        }
    };  

    function ValidarEmail(result) {
        let emailError = document.querySelector(".validateEmail");
        if (inputEmail.value == "") {
            emailError.innerHTML =  "El campo correo no puede estar vacío";
        } else {
            let validate = /\S+@\S+\.\S+/;
            if (validate.test(inputEmail.value) == false) {
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
        let verifyPassword = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){8,}$/;
        if (passwordInput.value == "") {
            passwordError.innerHTML = "El campo contraseña no puede estar vacío.";
        } else if (!verifyPassword.test(passwordInput.value)) {
            passwordError.innerHTML = "La contraseña requiere un mínimo de 8 caracteres y debe contener letras mayúsculas, minúsculas, un número y un cáracter especial."+"<br>";
        } else if (verifyPassword.test(passwordInput.value)) {
            passwordError.innerHTML = "";
        }
        if (result == true) {
            return passwordError.innerHTML;
        }
    };
});