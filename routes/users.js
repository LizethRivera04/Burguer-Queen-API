const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyAdmin, verifyToken } = require('../middleware/auth');
const { check } = require('express-validator');

//get/users
/* router.get('/',
    verifyAdmin,
    usersController.userList
) */

//create user , should be administrator and have a token
//POST/users
router.post('/',
    //checks if email is valid
    [check('email', 'Introduce un email valido ').isEmail(),
    //check if password is minimum of 6 characters
    check('password', 'El password debe tener min 6 caracteres').isLength({ min: 6 })
    ],
    verifyAdmin,
    usersController.userCreate
);


//obtain a list with the users, should be administrator and have a token
//GET/users
router.get('/',
    verifyAdmin,
    usersController.usersList
);


//obtain a user with id, should be administrator or user to modify and have a token
//GET/users/id
router.get('/:id',
    verifyToken,
    usersController.user
);


//modify a user with id, should be administrator or user to modify and have a token
//PUT/users/id
router.put('/:id',
    verifyToken,
    usersController.userModification
);

//delete a user with his id, should be administrator or user to delete and have a token
//DELETE/users/id
router.delete('/:id',
    verifyToken,
    usersController.userDeleted
);


module.exports = router;