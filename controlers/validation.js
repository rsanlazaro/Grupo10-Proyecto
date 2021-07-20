var fs = require("fs");

var regex = new RegExp(/^[a-zA-Z ]+$/);
const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
var adminRegex = new RegExp(/^([^@\s]+)@((admin\.)+com)$/);
var users = [];
var errFlag = false;

if (fs.existsSync("db/users.json")) {
    fs.readFile("db/users.json", function (err, data) {
        users = JSON.parse(data);
    })
}
var errors = {
    userNameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    passwordConfirmationErrorMessage: "",
    generalErrorMessage: "",
    ismatchErrorMessage: ""
}

var data = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

exports.controler = {
    username: function (name) {
        var ret = regex.test(name);
        errFlag = ret ? false : true;
        return ret;

    },
    email: function (email) {
        var ret = emailRegex.test(email);
        errFlag = ret ? errFlag : true;
        return ret;
    },
    password: function (pass) {
        var ret = pass.length >= 8 ? true : false;
        errFlag = ret ? errFlag : true;
        return ret;
    },
    admin: function (email) {
        var ret = adminRegex.test(email);
        return ret;

    },
    isExist: function (email) {
        let userIndex = users.findIndex((item) => item.email == email);
        let retVal = false;
        if (userIndex >= 0) {
            retVal = true;
        } else {

        }
        return retVal;
    },
    isChanged: function (id, email) {
        let userIndex = users.findIndex((item) => item.userID == id);
        let retVal = true;
        if (userIndex >= 0) {
            if (users[userIndex].email === email) {
                retVal = false;
            }
        } else {

        }
        errFlag = retVal ? (this.isExist(Data.email) ? true : errFlag) : errFlag
        return retVal;
    },
    isMatch: function (password, password_confirmation) {
        let retVal = true;
        if (password !== password_confirmation) {
            retVal = false;
        }else{

        }
        errFlag = retVal ? errFlag : true;
        return retVal;
    },
    checkValid: function (Data, id) {

        errors['userNameErrorMessage'] = Data.name ? (this.username(Data.name) ? "" : '* Name is not valid') : "";
        errors['emailErrorMessage'] = Data.email ? (this.email(Data.email) ? "" : '* Email is not valid') : "";
        errors['passwordErrorMessage'] = Data.password ? (this.password(Data.password) ? "" : '* Password must be more than 8 digits') : "";
        errors['passwordConfirmationErrorMessage'] = Data.password_confirmation ? (this.password(Data.password_confirmation) ? "" : "* Password Confirmation must be more than 8 digits") : "";
        errors['generalErrorMessage'] = Data.email ? ((this.isExist(Data.email) && this.isChanged(id, Data.email)) ? '* This email registered before, please try with another email' : "") : "";
        errors['ismatchErrorMessage'] = this.isMatch(Data.password,Data.password_confirmation) ?"" :'* Password Does not match, please try again' ;
        console.log("her")
        console.log((Data.password !== Data.password_confirmation));
        return errors;
    },
    isError: function () {
        return errFlag;
    },
    savePassedData: function (Data) {
        if (Data === "") {

        } else {
            data['name'] = Data.name !== "" ? Data.name : "";
            data['email'] = Data.email !== "" ? Data.email : "";
            data['password'] = Data.password !== "" ? Data.password : "";
            data['passwordConfirmation'] = Data.password_confirmation !== "" ? Data.password_confirmation : "";
        }


        return data;
    }
}