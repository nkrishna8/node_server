const userModel = require("../models/userModel");
const { verifyToken } = require("../utils/jwtUtils");

module.exports = async (req, res, next) => {

    try {
        const { token }= req.cookies;
        const { username } = verifyToken(token);
        const { password, ...user } = await userModel.findUser(username);

        // save some data in response object use response.locals
        res.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
}