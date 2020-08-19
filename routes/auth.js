const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { validationEmpty } = require('../middleware/error');

//authentication user 
//POST/auth/login
router.post('/',
    //checks if email is valid
    [check('email', 'Introduce un email valido ').isEmail(),
    //check if password is minimum of 6 characters
    check('password', 'El password debe tener min 6 caracteres').isLength({ min: 6 })
    ],
    validationEmpty,
    authController.userAuthentication
);


module.exports = router;