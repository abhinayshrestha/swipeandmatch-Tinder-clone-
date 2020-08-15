const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHead = req.get('Authorization');
    if(!authHead){
        const error = new Error('Please login to continue');
        error.statusCode = 401;
        throw error;
    }
    const token = authHead.split(" ")[1];
    let decode;
    try{
       decode = jwt.verify(token,'secret');
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decode){
        const error = new Error('Please login to continue');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decode.userId;
    next();
}