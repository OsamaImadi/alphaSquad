const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()
function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied due to no token');

    try{
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;