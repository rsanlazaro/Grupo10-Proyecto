var fs = require("fs");
const {
    config
} = require("process");
var validation = require("./validation");
var log = require("./log");
var isFoundBefore = false;
var isMatch = true;
var errorFlag = false;
//------------------------

// var cookieParser = require('cookie-parser');
// var session = require('express-session');
//-----------------------------------------------
//-----------------------------------------------
// app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));
//-----------------------------------------------

var errors = {
    userNameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    passwordConfirmationErrorMessage: "",
    generalErrorMessage: "",
    ismatchErrorMessage:""
}
var data = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}


exports.controler = {
    register: function (req, res) {
        if (req.session.name) {
            res.send("<script>location.href= 'products/productList.html'</script>")
        } else {

            data['name'] = req.body.name;
            data['email'] = req.body.email;
            data['password'] = req.body.password;
            data['passwordConfirmation'] = req.body.password_confirmation;
            
            // var validName = validation.controler.username(req.body.name);
            // var validEmail = validation.controler.email(req.body.email);
           
            // var validPassword = validation.controler.password(req.body.password);
            // var validPasswordConfirmation = validation.controler.password(req.body.password_confirmation);
            var id;
            if (users.length == 0) {
                id = 1;
            } else {
                id = Number(users[users.length - 1].userID) + 1;
            }
             errors =  validation.controler.checkValid(req.body,id);
             console.log(validation.controler.isError())
             if(!validation.controler.isError()){
                var isAdmin = validation.controler.admin(req.body.email);
                console.log('ok');
                console.log('isAdmin -> ' + isAdmin);

                var newqq = {};
               

                Object.assign(newqq, {
                    userID: `${id}`
                }, req.body, {
                    isadmin: `${isAdmin}`
                }, {
                    imagename: ""
                });
                users.push(newqq);
                saveUsersArrayToFile();

                res.send("<script>location.href= '/login.html'</script>")
             }else{
                res.render("auth/register.ejs", {
                    ...errors,
                    ...data
                })
             }

            // if (validName && validEmail && validPassword && validPasswordConfirmation) {
            // var userIndex = users.findIndex((item) => item.email == req.body.email);
            
            //     var isAdmin = validation.controler.isExist(req.body.email)
            //     if (isAdmin) {
            //         console.log("This email registered before, please try with another email");
            //         isFoundBefore = true;
            //         errorFlag = true;
            //     } else {
            //         if ((req.body.password) != (req.body.password_confirmation)) {
            //             console.log('Password Does not match, please try again');
            //             isMatch = false;
            //             errorFlag = true;
            //         } else {

            //             console.log('ok');
            //             console.log('isAdmin -> ' + isAdmin);

            //             var newqq = {};
            //             var id;
            //             if (users.length == 0) {
            //                 id = 1;
            //             } else {
            //                 id = Number(users[users.length - 1].userID) + 1;
            //             }

            //             Object.assign(newqq, {
            //                 userID: `${id}`
            //             }, req.body, {
            //                 isadmin: `${isAdmin}`
            //             }, {
            //                 imagename: ""
            //             });
            //             users.push(newqq);
            //             saveUsersArrayToFile();

            //             res.send("<script>location.href= '/login.html'</script>")




            //         }

            //     }
            // } else {
            //     errorFlag = true;
            // }
            // if (errorFlag) {
            //     console.log('validName ' + validName)
            //     console.log('validEmail ' + validEmail)
            //     console.log('validPassword ' + validPassword)
            //     console.log('validPasswordConfirmation ' + validPasswordConfirmation)
            //     console.log('isFoundBefore ' + isFoundBefore)
            //     console.log('isMatch ' + isMatch)
               
            //     console.log('isFoundBefore ' + isFoundBefore)
            //     console.log('isMatch ' + isMatch)
            //     validName ? errors['userNameErrorMessage'] = "" : errors['userNameErrorMessage'] = '* Name is not valid';
            //     validEmail ? errors['emailErrorMessage'] = "" : errors['emailErrorMessage'] = '* Email is not valid';
            //     validPassword ? errors['passwordErrorMessage'] = "" : errors['passwordErrorMessage'] = "* Password must be more than 8 digits";
            //     validPasswordConfirmation ? errors['passwordConfirmationErrorMessage'] = "" : errors['passwordConfirmationErrorMessage'] = "* Password Confirmation must be more than 8 digits";
            //     isFoundBefore ? errors['generalErrorMessage'] = '* This email registered before, please try with another email' : errors['generalErrorMessage'] = "";
            //      isMatch ?  errors['ismatchErrorMessage'] ="" : errors['ismatchErrorMessage'] = '* Password Does not match, please try again';
            //     errorFlag = false;
            //     res.render("auth/register.ejs", {
            //         ...errors,
            //         ...data
            //     })
            // }

        }

    },
    login: function (req, res) {

        if (req.session.name) {
            res.send("<script>location.href= 'products/productList.html'</script>")
        } else {
            let user = users.find(q => q.email == req.body.email && q.password == req.body.password);
            var userIndex = users.findIndex((item) => item.email == req.body.email);
            if (user) {

                // var userInfo = []
                if (!log.controler.isExist()) {
                    log.controler.setUserInfo({
                        userID: users[userIndex].userID,
                        name: users[userIndex].name,
                        isadmin: users[userIndex].isadmin

                    })
                }

                sessiondId = `${users[userIndex].userID}${users[userIndex].name}`;
                req.session.name = sessiondId;
                req.session.userID = `${users[userIndex].userID}`
                req.session.is_Admin = `${users[userIndex].isadmin}`
                console.log(' req.session.userID -> ' + req.session.userID);
                console.log(req.session)

                console.log(' req.session.is_Admin -> ' + req.session.is_Admin);
                if (req.session.sessiondId) {
                    req.session.sessiondId++;

                } else {
                    req.session.sessiondId = 1;

                }
                if (`${users[userIndex].isadmin}` === 'true') {
                    res.send("<script>location.href= '/admin/showproduct.html'</script>")
                } else {
                    res.send("<script>location.href= 'products/productList.html'</script>")
                }

                // res.render("products/productList.ejs", {
                //     login: "ok",
                //     reload: true
                // });

                //generate session id ( random string or number)
                //add cookie with session id
                //user.sessiondId= 

            } else {
                res.render("auth/login.ejs", {
                    errormessage: "email or password not correct"
                })
            }
        }

    },
    loginView: function (req, res) {
        if (req.session.name) {

            res.send("<script>location.href= 'products/productList.html'</script>")

        } else {
            res.render("auth/login.ejs", {
                errormessage: ""
            })
        }

    },

    registerView: function (req, res) {
        if (req.session.name) {
            res.send("<script>location.href= 'products/productList.html'</script>")
        } else {
            res.render("auth/register.ejs", {
                ...errors,
                ...data
            })
        }

    }
}


var users = [];
if (fs.existsSync("db/users.json")) {
    fs.readFile("db/users.json", function (err, data) {
        users = JSON.parse(data);
    })
}

function saveUsersArrayToFile() {
    fs.writeFile("db/users.json", JSON.stringify(users), function (err) {
        if (err)
            console.log(err)
    })
}