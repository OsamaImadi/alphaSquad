const express = require('express');
const { User } = require('../entities/user');
const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt')
const _ = require('lodash')

const router = express.Router();

router.get('/',auth,async(req,res)=>{
  try{
    let users = await User.find().select("-password").sort();
    res.status(200).send(users);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.get('/:id',auth,async(req,res)=>{
  try{
    let user = await User.findById(req.params.id).select("-password").sort();
    if(!user) return res.status(404).send('User not found')
    res.status(200).send(user);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.post('/',auth, async(req,res)=>{
  try{
    let password = null;
    password = bcrypt.hashSync(req.body.password, 10);

    let user = await User.findOne({ username: req.body.username});
    if(user) return res.status(400).send('User already registered');

    user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User already registered');

    user = new User();
    user.email = req.body.email;
    user.password = password;
    user.username = req.body.username;
    await user.save();

    let response = await User.findById(user._id).select("-password").sort();
    res.status(201).send(response);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.put('/:id',auth,async(req,res)=>{
  try{
    let password = null;
    password = bcrypt.hashSync(req.body.password, 10);
    let user = await User.findById(req.params.id).select("-password").sort();
    if(!user){
      return res.status(404).send('User not found')
    }
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.password = password || user.password;
    await user.save();

    let response = await User.findById(user._id).select("-password").sort();
    res.status(201).send(response);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.delete('/:id',auth, async(req,res)=>{
  try{
  let user = await User.findByIdAndRemove(req.params.id);
  if(!user) return res.status(404).send('User not found')
  let response = { email:user.email, username:user.username, _id:user._id,  mesage:"User Deleted"}
  res.status(200).send(response)
}catch(err){
  res.status(500).send(err.message)
}
})

module.exports = router;