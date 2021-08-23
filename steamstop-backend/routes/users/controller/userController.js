const bcrypt = require('bcryptjs')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const dbErrorHelper = require('../lib/dbErrorHelper')

async function createUser(req, res) {
    try {
        let createdUser = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        })

        let genSalt = await bcrypt.genSalt(12);
        let hashedPassword = await bcrypt.hash(req.body.password, genSalt);

        createdUser.password = hashedPassword

        await createdUser.save();

        res.json({
            message: 'user created',
        })
    } catch (e) {
        res.status(500).json({ message: dbErrorHelper(e) });
    }
}

async function login(req, res) {
    try {
        console.log("1")
        let foundUser = await User.findOne({ email: req.body.email }).select("")

        if (!foundUser) {
            throw Error('user not found, please sign up!')
        }
        console.log("2")
        let comparedPassword = await bcrypt.compare(req.body.password, foundUser.password);

        console.log("3")
        if (!comparedPassword) {
            throw Error('check email and/or password')
        }

        let jwtToken = jwt.sign(
            {
                username: foundUser.username,
                email: foundUser.email
            },
            process.env.JWT_USER_SECRET_KEY
        );

        res.cookie("jwt-cookie", jwtToken), {
            expires: new Date(Date.now() + 360000),
            httpOnly: false,
            secure: false,
        }

        res.json({
            user: {
                email: foundUser.email,
                username: foundUser.username,
            }
        })
    } catch (e) {
        res.status(500).json({ message: dbErrorHelper(e) });
    }
}

async function getAllUsers(req, res) {
    try {
        let getUsers = await User.find({});
        res.json({ payload: getUsers });
    } catch (e) {
        res.status(500).json({ message: dbErrorHelper(e) });
    }
}

module.exports = {
    createUser,
    login,
    getAllUsers,
}