const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();
const User = require("../model/userModel")

// @desc for registering a new user
// @route POST /register
// @access public

const registerUser = asyncHandler(async (req, res, next) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        return next(new Error("All fields are required!!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({username, email, password: hashedPassword});

    if(!user) {
        res.status(400);
        return next(new Error("There's an error in the database, try again after some time!"));
    }

    res.json({"msg" : "Registered successfully!!"});
})


// @desc Login user
// @route POST /login
// @access public

const loginUser = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password) {
        res.status(400);
        return next(new Error("All fields are required"));
    }

    const user = await User.findOne({username});
    if(!user) {
        res.status(404);
        return next(new Error("username does not exist"));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched) {
        res.status(404);
        return next(new Error("Wrong password"));
    }

    const token = jwt.sign( {user : {
        id: user._id,
        username: user.username,
        email: user.email
    }},
    process.env.JWT_SECRET,
    {expiresIn: "1h"}
    )

    res.status(200).json({"username": user.username, "userId": user._id ,token});
})

// @desc Fetching user info
// @route GET /user/:id
// @access public

const fetchProfile  = asyncHandler( async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) {
        res.status(404);
        return next(new Error("User not found!"));
    }

    res.status(200).json({"username": user.username, "email":  user.email, "id" : user._id});
})


module.exports = {registerUser, loginUser, fetchProfile};
