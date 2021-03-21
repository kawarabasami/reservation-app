
const config = require('../config'); // 末尾に"/index"はつけなくても動く(自動的に付与される)
const User = require('../model/user');
const jwt = require('jsonwebtoken');

function notAuthorized(res) {
    return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'You need to login!' }] });
}

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return notAuthorized(res);
    }

    // verify a token symmetric
    const tokenOnly = token.split(" ")[1];
    jwt.verify(tokenOnly, config.SECRET, function (err, decodedToken) {
        if (err) {
            return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid Token!' }] });;
        }

        User.findById(decodedToken.userId, function (err, foundUser) {
            if (err) {
                return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid Token!' }] });;;
            }

            if (!foundUser) {
                return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid Token!' }] });;;
            }

            next();
        })
    });
}