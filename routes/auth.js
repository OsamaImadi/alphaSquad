const express = require('express');
const jwt = require("jsonwebtoken");
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
const { User } = require('../entities/user');
const router = express.Router();

dotenv.config();

router.post('/',async (req,res)=>{
    let user = await User.findOne({ email: req.body.email});
    if(!user) {return res.status(400).send('Invalid email or password');}

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(validPassword)
    if(!validPassword) return res.status(400).send('Invalid email or password');

   const token = user.generateAuthToken();

    res.send(token);
})


module.exports = router;