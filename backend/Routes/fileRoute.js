const express = require('express');
const router = express.Router();
const fileController = require('../controller/fileController');
const multer = require('multer');
const authCheck = require('../middleware/auth-check');

const fileFilter = (req , file , cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'png') {
        cb(null, true);
    }
    else{
        cb(new Error('Invalid image format'), false);
    }
}
const storage = multer.diskStorage({
    destination : (req , file, cb) => {
         cb(null, './public/uploads');   
    },
    filename : (req, file, cb) => {
        const fileName = Date.now()+ '.' +file.mimetype.split('/')[1];        
        cb(null , fileName);
    }
});

const multerConfig = multer({ 
    storage : storage, 
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});

router.get('/',authCheck,fileController.getFile);
router.post('/upload',authCheck,multerConfig.single('photo') ,fileController.fileUpload);
router.put('/',authCheck,fileController.deleteFile);
router.put('/profilepic',authCheck,multerConfig.single('profilepic'),fileController.deleteProfilePic);


module.exports = router;