var fs = require("fs");
var userInfo = [];
if (fs.existsSync("db/log.json")) {
    fs.readFile("db/log.json", function (err, data) {
        userInfo = JSON.parse(data);
    });
}

exports.controler = {

    setUserInfo:(userData) => {
        userInfo.push(userData);
        console.log(userInfo[0]['isadmin'])
        saveUserInfoToFile();
    },
    clearUserInfo:() => {
        userInfo = [];
        saveUserInfoToFile();
    },
    isAdmin:()=>{
        return userInfo[0]['isadmin'];
    },
    isExist: () => {
        let retValue = false;
        if(userInfo.length > 0){
            retValue = true;
        }else{

        }
        return retValue;
    },
    updateSession:(req,res) => {
        console.log('updateSession -> ')
        console.log(`${userInfo[0]['userID']}${userInfo[0]['name']}`)
        var varl = `${userInfo[0]['userID']}${userInfo[0]['name']}`;
         req.session.name = varl
         req.session.userID = `${userInfo[0]['userID']}`
         req.session.is_Admin = `${userInfo[0]['isadmin']}`
    }
}


function saveUserInfoToFile() {
    fs.writeFile("db/log.json", JSON.stringify(userInfo), function (err) {
        if (err) console.log(err);
    });
}