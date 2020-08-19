const { validationResult } = require('express-validator');

//validation of empty fields
function validationEmpty(req, res, next) {
    const err = validationResult(req);
    // console.log(err);//<.0
    if (!err.isEmpty()) {
        res.status(400).json({ errors: err })
    } else {
        next();
    }

}


//validation of valid status
function invalidStatus(req, res, next) {
    const { products, status, client } = req.body;
    //validation products or client isn´n empty
    const err = validationResult(req);
    // console.log(err);//<.0
    if (!err.isEmpty()) {
        res.status(400).json({ errors: err })
    } else if (status != 'pending' && status != 'canceled' && status != 'delivering' && status != 'delivered') {
        res.status(400).json({ msg: 'Agrega un status válido' })
    } else {
        next()
    }
}





module.exports = { validationEmpty, invalidStatus }
