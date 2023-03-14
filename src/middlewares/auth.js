const { Token, User } = require("../models");
const httpStatus = require("http-status");
const tokenTypes = require("../configuration/tokens");
const jwt = require('jsonwebtoken');
const config = require('../configuration/config');

module.exports.authCheck = async (req, res, next) => {
    try {
        let token;
        if (req.headers.cookie)
            token = req.headers.cookie.split("=")[1];
        const payload = jwt.verify(token, config.jwt.secret);
        const tokenDoc = await Token.findOne({ user: payload.sub, type: tokenTypes.REFRESH }).populate("user");
        req.user = tokenDoc.user;
        next();
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid or expired token" });
    }
};