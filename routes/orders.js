const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/auth');
const { validationEmpty, invalidStatus } = require('../middleware/error');
const { check } = require('express-validator');


//Save a new order if have a token
//POST/order
router.post('/',
    [
        check('products', 'Tienes que agregar al menos un producto').isLength({ min: 1 })
    ],
    verifyToken,
    validationEmpty,
    orderController.orderCreate
)


//Update a order if have a token
//PUT/order/id
router.put('/:id',
    [
        check('client', 'Tienes que agregar el nombre del cliente').isLength({ min: 1 }),
        check('products', 'Tienes que agregar al menos un producto').isLength({ min: 1 }),
        check('status', 'Tienes que agregar un status válido').isLength({ min: 1 })
    ],
    verifyToken,
    invalidStatus,
    orderController.orderUpdate
);


//Get a list of all orders if have a token
//GET/order
router.get('/',
    verifyToken,
    orderController.orderList
)


//Get a order if have a token
//GET/order/id
router.get('/:id',
    verifyToken,
    orderController.order
)


//Delete order if have a token
//DELETE/order/id
router.delete('/:id',
    verifyToken,
    orderController.orderDelete
)




module.exports = router;