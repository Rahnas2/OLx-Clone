const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,res,cb) =>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image!'), false)
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter})

module.exports = upload