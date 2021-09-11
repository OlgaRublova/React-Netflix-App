const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//  register
router.post("/register", async (req, res) => {

    //  creating a new user using created "User" model
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //  hashing the password
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    })

    try {
        //  send our user to our db
        const user = await newUser.save();

        res.status(201).json(user)  // "201" - successfully created
    } catch (err) {
        res.status(500).json(err)
    }
})


//  login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        //  if user email doesn't match any in the system, throw the error
        !user && res.status(401).json("Wrong password or username");

        //  password decryption
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        //  if hashed user password doesn't match any hashed password in the system, throw the error
        originalPassword !== req.body.password && res.status(401).json("Wrong password or username");

        //  create an access token
        const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.SECRET_KEY,
            {expiresIn: "5d"}
        );

        //  store password to localStorage, so it wouldn't be shown in the results.
        //  _doc is the whole body info
        const {password, ...info} = user._doc;
        res.status(200).json({ ...info, accessToken });

    } catch (err) {
        res.status(500).json(err)
    }
})

//  it's important to export router to be able to use authRoute in app.use("/api/auth", authRoute)
module.exports = router;