const path = require('path');
exports.controller = {
    //check File Type
    checkFileType: (file, cb) => {
        //allowed exteion
        const fileTypes = /jpeg|jpg|png|gif/;

        //check extetion
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        //check mime
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb({
                message: 'Images Only'
            });
        }

    }
}