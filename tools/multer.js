const multer = require('multer');
const uuid = require('uuid/v4');
const path = require('path');

const storage = multer.diskStorage({
    //folder in wich the image will be saved
    destination: 'uploads',
    //rename of image
    filename: (req, file, callback) => {
        //receives err and name of file
        // rename of names with uuid + extension of file(.jpg, .png...)
        callback(null, uuid() + path.extname(file.originalname));
    }
})

module.exports = multer({ storage });