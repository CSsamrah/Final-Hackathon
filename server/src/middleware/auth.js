const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.jwtSecret;

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
};

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = verifyToken(token);
        req.userId = decodedToken.userId; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authenticateUser;
