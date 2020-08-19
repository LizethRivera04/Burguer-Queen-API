const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { verifyAdmin, verifyToken } = require('../middleware/auth');
const { check } = require('express-validator');
const multer = require('../tools/multer')

//Create a products if is the admin with token
//POST/products
router.post('/',
    [
        check('name', 'Introduce el nombre del producto').isLength({ min: 2 }),
        check('price', 'Introduce el precio del producto').isLength({ min: 1 })
        /*  check('image', 'Introduce la imagen del producto'),
         check('type', 'Introduce el tipo/categoria del producto'), */
    ],
    verifyAdmin,
    //name of field
    multer.single('image'),
    productsController.productCreate
);


//Modify a products if is admin with token
//PUT/products/id
router.put('/:id',
    [
        check('name', 'Introduce el nombre del producto').isLength({ min: 2 }),
        check('price', 'Introduce el precio del producto').isLength({ min: 1 }),
        check('image', 'Introduce la imagen del producto').isLength({ min: 1 }),
        check('type', 'Introduce el tipo/categoria del producto').isLength({ min: 1 })
    ],
    verifyAdmin,
    //multer.single('image'),
    productsController.productUpdate
);


//Obtain all products if have token
//GET/products
router.get('/',
    verifyToken,
    productsController.productsList
);


//Obtain a product if have token
//GET/products/id
router.get('/:id',
    verifyToken,
    productsController.product
);


//Delete a product if have token
//DELETE/products
router.delete('/:id',
    verifyAdmin,
    productsController.productDelete
);

module.exports = router