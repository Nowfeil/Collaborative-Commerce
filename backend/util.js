const jwt = require('jsonwebtoken');
const config = require('./config.js');

const getToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        config.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = { getToken };
