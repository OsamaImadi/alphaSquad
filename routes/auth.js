const express = require('express');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
let jsonData = require('../users.json');
const router = express.Router();

dotenv.config();

router.post('/',async (req,res)=>{
    let user = jsonData.filter(obj => {
        return obj.email == req.body.email
      })
      if(!user[0]){return res.status(400).send("Invalid email or password")}
    if(user[0].password != req.body.password)
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({_id: user[0]._id, username: user[0].username}, process.env.JWT_PRIVATE_KEY);

    res.send(token);
})


module.exports = router;