const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, req.body.price? '../public/assets/img/products':'../public/assets/img/profile');
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`; 
		cb(null, fileName);
	}
})

  const multerMid = multer({ //multer settings
    storage: storage, 
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if(!acceptedExtensions.includes(ext)) {
			callback(null, false)
        }
        callback(null, true)
    }
});


module.exports = multerMid;


