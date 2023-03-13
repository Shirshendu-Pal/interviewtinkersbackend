const { User,Token, Pokemon } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const {generateAuthToken} = require("./token.service");
const bcrypt = require("bcryptjs");

const addCustomer = async (reqBody) => {

    const user = await User.create({ 
        name: reqBody.name,
        email: reqBody.email,
        password: reqBody.password 
    });

    return user;
    
};

const login = async (reqBody) => {
    const findUser = await User.findOne({email: reqBody.email})
    if (!(await findUser.isPasswordCorrect(reqBody.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid login credentials");
    return findUser;

}







module.exports = {
   
    addCustomer,
    login,

};