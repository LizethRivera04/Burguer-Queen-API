const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
    //checks if user has a valid token
    const token = req.header('x-access-token');
    console.log(token);
    if (!token) {
        return res.status(401).json({ msg: 'No tienes un token' });
    }
    //verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded);
    if (decoded.email === process.env.ADMIN_EMAIL && decoded.password === process.env.ADMIN_PASSWORD) {
        req.userId = decoded.id
        res.status(200)
        next()
    } else {
        res.status(403).json({ msg: 'No tienes autorización' })
    }

    //  console.log(decoded);


}

function verifyToken(req, res, next) {
    //checks if user has a valid token
    const token = req.header('x-access-token');
    if (!token) {
        return res.status(401).json({ token: false, msg: 'No cuentas con un token' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded)
    req.userId = decoded.id
    res.status(200)
    next()
}

module.exports = { verifyAdmin, verifyToken };