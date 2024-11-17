const jwt = require('jsonwebtoken');
const JWT_SECRET = "@admin";

const auth = async function (req, res, next) {
    try {
        const token = req.header('auth-token');
        if(!token)
        {
            res.status(401).send('Please authenticate using valid token.');
        }

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = {
    auth,
};