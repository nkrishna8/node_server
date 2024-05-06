const { Request, Response, NextFunction } = require('express')

const userModel = require("../models/userModel");
const { generateToken, verifyToken } = require("../utils/jwtUtils");
const { generatePasswordHash, verifyPassword } = require("../utils/passwordUtils");
const { responseCreator, errorCreator } = require("../utils/responseCreator");

/** 
@param {Request} req
@param {Response} res
@param {NextFunction} next
*/

const signup = async (req, res, next) => {
    // console.log("Signup hit",req.body);
    try {

        let data = req.body;
        // let {password,...data} = req.body;
        console.log("TRY HIT+++++", data);
        const passwordHash = await generatePasswordHash(data.password);
        data.password = passwordHash;
        const userData = await userModel.createUser(data);
        // console.log("userDatauserData==>>",userData);
        res.status(201);
        res.send(responseCreator("User Created", userData))
        // res.send({ success: true, data: userData });

    } catch (error) {
        next(error);
    }

}

const resetPassword = async (req, res, next) => {
    // console.log("Signup hit",req.body);
    try {

        let { username, name, password: pwd } = req.body;
        // let {password,...data} = req.body;
        // console.log("TRY HIT+++++", data);
        const passwordHashNew = await generatePasswordHash(pwd);
        // console.log("passwordHashNewpasswordHashNew",passwordHashNew, req.body);
        // return
        const userUpdateData = await userModel.updateMany({ username }, { $set: { password: passwordHashNew, name: name } });
        // console.log("userUpdateDatauserUpdateData==>>",userUpdateData);
        if (userUpdateData.modifiedCount) {
            res.status(200);
            res.send(responseCreator("Password Updated", userUpdateData))
        }
        else {
            errorCreator("Invalid", 403)
        }

    } catch (error) {
        next(error);
    }

}

const login = async (req, res, next) => {
    try {
        console.log("Login Hit", req.body);

        const { username, password } = req.body;
        // console.log(username, "usernameusername==>>>");
        const userData = await userModel.findUser(username);
        // console.log("==>>hit", userData);


        //Password Validation by Hashing
        let isPasswordValid = verifyPassword(password, userData.password)

        if (isPasswordValid) {

            const token = generateToken({ username, password });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600_000 })

            //Manual Token Send to Response
            // res.send(responseCreator(`${username} Login Successful`, { ...userData, token }));
            res.send(responseCreator(`${username} Login Successful`, userData));
        }

        //Normal Validation
        // if (password === userData.password) {
        //     res.send(responseCreator(`${username} Login Successful`, userData));
        // }
        else {
            // console.log("Else Invalid=>>>");
            res.send(errorCreator("Password Wrong!!", 401));
            // res.status(401);
            // res.send({ success: false, message: "Invalid User!!" });

        }

    } catch (error) {
        next(error);
    }

}

/** 
@param {Request} req
@param {Response} res
@param {NextFunction} next
*/

const loginWithCookie = async (req, res, next) => {
    try {

        // console.log("loginWithCookie Hit", req.body, req.cookies);
        const { token } = req.cookies;
        console.log("TOKEN==>", token);
        const { username } = verifyToken(token);             //Collect Username from The verifytoken() return values
        // console.log(username,"usernameusername");

        const user = await userModel.findUser(username);
        res.send(responseCreator(`${username} Login Successful With Cookie`, user));


    } catch (error) {
        next(error);
    }

}

const addFriend = async (req, res, next) => {
    try {
        const { username, id, name } = req.body;
        console.log(username, "addFriendaddFriendaddFriend+++");
        const userData = await userModel.updateFriendList(username, id, true);
        if (userData) {
            res.send(responseCreator(`You are now friends with ${name}`, userData.data));
        }

    } catch (error) {
        next(error);
    }

}

const removeFriend = async (req, res, next) => {
    try {
        // const {username}=req.locals.user;
        const { username, id, name } = req.body;
        console.log(username, "PPPPPP+++");
        const userData = await userModel.updateFriendList(username, id, false);
        if (userData) {

            res.send(responseCreator(`You are no longer friends with ${name}`, userData));

        }

    } catch (error) {
        next(error);
    }

}

/** 
@param {Request} req
@param {Response} res
@param {NextFunction} next
*/
const logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        // res.send("User Logout Successfully");
        res.send(responseCreator("User Logout Successfully!!"));


    } catch (error) {
        next(error);
    }

}

module.exports = { signup, login, removeFriend, addFriend, loginWithCookie, resetPassword, logout }