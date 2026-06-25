const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel")

// @desc register a user
// @route POST /auth/register
// @access public

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({ where: {email: email} });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email is already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    console.log(`User created ${user}`);
    if(user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
});

// @desc login a user
// @route POST /auth/login
// @access public

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({ where: {email: email} })

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user.id
            }
        },
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password are invalid")
    }    
});

// @desc get a user
// @route GET /auth/profile
// @access public

const profile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const userProfile = await User.findByPk(id);

    if(!userProfile) {
        res.status(404);
        throw new Error("User profile not found.")
    }

    res.status(200).json({ 
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email
     })
});

module.exports = { register, login, profile };