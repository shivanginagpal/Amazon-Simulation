'use strict'

const path = require('path');
const multer = require('multer');
let fs = require('fs-extra');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// SETTING STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let type = req.params.type;
        let path = `./uploads/${type}`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//'img' is the field name
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

const isEmpty = (prop) => {
    if (prop === "" || prop === null || typeof prop === "undefined" ||
        (typeof prop === "object" && Object.keys(prop).length === 0) ||
        (typeof prop === "string" && prop.trim().length === 0)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    upload,
    isEmpty
}