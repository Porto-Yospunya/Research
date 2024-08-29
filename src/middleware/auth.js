require('dotenv').config();

const jwt = require('jsonwebtoken');

const User = require('./../models/user.model');

const validateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "User is not authosized." });
            }

            next();
        });
    } else {
        res.redirect('/user/sign-in');
        // res.status(401).json({ message: "User is not authosized." })
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.token;
    res.locals.user = null;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) { next() };

            const user = await User.findById(decoded.id);
            res.locals.user = user;
            next();
        });
    } else {
        next();
    }
};

module.exports ={ validateToken, checkUser };