var fs = require("fs");
const multer = require('multer');
const path = require('path');
var validation = require("./validation");
var config = require("../controlers/config");
var helpFunction = require("../controlers/help");
var log = require("../controlers/log")
var cart = require("../controlers/cart")
var errors = {
    userNameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    generalErrorMessage: "",
    passwordConfirmationErrorMessage:"",
    ismatchErrorMessage: ""
}
var data = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

var users = [];
if (fs.existsSync("db/users.json")) {
    fs.readFile("db/users.json", function (err, data) {
        users = JSON.parse(data);
    })
}

//set storge engine
const storge = multer.diskStorage({
    destination: './public/upload/usersImges',
    filename: function (req, file, cb) {
        cb(null, `userID-${users.length == 0 ? 1 :Number(users[users.length - 1].userID) + 1}${Date.now()}-${file.originalname}`);
    }
});

//init upload 
const upload = multer({
    storage: storge,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        // checkFileType(file, cb);
        helpFunction.controler.checkFileType(file, cb);
    }
}).single("image");


exports.controler = {
    viwe: function (req, res) {
        if (req.session.name) {
            let user = req.session.userID;
            var userIndex = users.findIndex((item) => item.userID == user);
            console.log(users[userIndex])
            if (user) {
                req.session.name = `${users[userIndex].userID}${users[userIndex].name}`;
                req.session.userID = users[userIndex].userID;
                res.render('../views/users/profile.ejs', {
                    msg: '',
                    err: -1,
                    login: req.session.name ? 'ok' : 'no',
                    isAdmin: req.session.isAdmin === 'true'?'yes':'no',
                    userName: users[userIndex].name,
                    userEmail: users[userIndex].email,
                    pass: users[userIndex].password,
                    con_pass:users[userIndex].password_confirmation,
                    userID: users[userIndex].userID,
                    userImage: users[userIndex].imagename,
                    flag: false,
                    itemsCount:cart.controler.getCartItemsCount(req, res),
                    ...errors
                })
            } else {
                res.send({
                    error: "user not found"
                });

            }

        } else {
            res.send('<script> location.href = "/home.html" </script>');
        }

    },
    viewedit: (req, res) => {
        if (req.session.name) {
            let user = req.session.userID;
            var userIndex = users.findIndex((item) => item.userID == user);
            log.controler.updateSession(req,res);
            console.log(users[userIndex])
            if (user) {
                res.render('../views/users/profile.ejs',{
                    msg: 'Data updated',
                    err: false,
                     login: req.session.name ? 'ok' : 'no',
                     isAdmin: req.session.isAdmin === 'true'?'yes':'no',

                    userName: users[userIndex].name,
                    userEmail: users[userIndex].email,
                    pass: users[userIndex].password,
                    con_pass:users[userIndex].password_confirmation,
                    userID: users[userIndex].userID,
                    userImage: users[userIndex].imagename,
                    flag: false,
                    itemsCount:cart.controler.getCartItemsCount(req, res),
                    ...errors
                })
            } else {
                res.send({
                    error: "user not found"
                });

            }

        } else {
            res.send('<script> location.href = "/home.html" </script>');
        }
    },
    delete: function (req, res) {
        var userIndex = productArray.findIndex((item) => item.userID == req.params.id);
        var imageName = '';
        if (userIndex >= 0) {
            imageName = users[userIndex].userImage;
            users.splice(userIndex, 1);

            saveProductArrayToFile();
            if (imageName !== "") {
                try {
                    fs.unlinkSync(`public/upload/${imageName}`);



                } catch (e) {
                    res.status(400).send({
                        message: "Error deleting image!",
                        error: e.toString(),
                        req: req.body
                    });
                }
            }

            res.send({
                success: "user deleted"
            });
        } else {
            res.send({
                error: "user not found"
            });
        }
    },
    edit: (req, res) => {
        var userIndex = users.findIndex((item) => item.userID == req.params.id);

       
            upload(req, res, (error) => {
                if (error) {
                    res.render('../views/users/profile.ejs', {
                        msg: `Error: ${error.message}`,
                        login: req.session.name ? 'ok' : 'no',
                        isAdmin: req.session.isAdmin === 'true'?'yes':'no',
                        userName: `${users[userIndex].name}`,
                        userEmail: users[userIndex].email,
                        pass: users[userIndex].password,
                        con_pass:users[userIndex].password_confirmation,
                        userID: users[userIndex].userID,
                        userImage: users[userIndex].imagename,
                        err: true,
                        flag:false,
                        itemsCount:cart.controler.getCartItemsCount(req, res)
                    });
                } else {


                    if (config.controler.mode == 'devolopment') {
                        console.log(req.file);
                        console.log(req.body);
                    }

                    var imgName;
                    console.log("req.body -> ")
                    console.log(req.body)
                    errors =  validation.controler.checkValid(req.body,req.params.id);
                    console.log(validation.controler.isError())
                    if(!validation.controler.isError()){
                        if (req.file == undefined) {
                            imgName = users[userIndex].imagename;
                            users[userIndex].name = req.body.name;
                            users[userIndex].email = req.body.email;
                            users[userIndex].password = req.body.password;
                            users[userIndex].password_confirmation = req.body.password_confirmation;
                            users[userIndex].imagename = imgName;
                        } else {
                            if(users[userIndex].imagename !== ""){
                                try {
                                    fs.unlinkSync(`public/upload/usersImges/${users[userIndex].imagename}`);
        
                                } catch (e) {
                                    res.status(400).send({
                                        message: "Error deleting image!",
                                        error: e.toString(),
                                        req: req.body
                                    });
                                }
                            }else{

                            }
                           
                            imgName = `${req.file.filename}`
                            users[userIndex].name = req.body.name;
                            users[userIndex].email = req.body.email;
                            users[userIndex].password = req.body.password;
                            users[userIndex].password_confirmation = req.body.password_confirmation;
                            users[userIndex].imagename = imgName;
    
                        }
                        saveUsersArrayToFile();
                        res.send("<script> location.href = '/users/user/viewedit.html'</script>")
    
                    }else{

                        // if(!(validation.controler.isChanged(req.params.id,req.body.email))){
                        //     errors['isExistErrorMessage'] = false
                        // }
                        console.log(errors);
                        res.render('../views/users/profile.ejs', {
                            msg: "",
                            login: req.session.name ? 'ok' : 'no',
                            isAdmin: req.session.isAdmin === 'true'?'yes':'no',
                            userName: `${users[userIndex].name}`,
                            userEmail: users[userIndex].email,
                            pass: users[userIndex].password,
                            con_pass:users[userIndex].password_confirmation,
                            userID: users[userIndex].userID,
                            userImage: users[userIndex].imagename,
                            err: -1,
                            flag:false,
                            itemsCount:cart.controler.getCartItemsCount(req, res),
                            ...errors
                        });
                    }
                    

                }

            });

    }
}



function saveUsersArrayToFile() {
    fs.writeFile("db/users.json", JSON.stringify(users), function (err) {
        if (err)
            console.log(err)
    })
}