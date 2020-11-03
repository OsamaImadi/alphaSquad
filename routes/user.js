const express = require('express');
const auth = require('../middlewares/auth');
const _ = require('lodash')
const fs= require('fs')
let jsonData = require('../users.json');

const router = express.Router();

router.get('/',auth,async(req,res)=>{
  try{
    res.status(200).send(jsonData);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.get('/:id',auth,async(req,res)=>{
  try{
    let user;
    user = jsonData.filter(obj => {
      return obj._id == req.params.id
    })
    res.status(200).send(user[0]);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.post('/', async(req,res)=>{
  try{
    let user = jsonData.filter(obj => {
      return obj.email == req.body.email
    })
    if(user[0]){return res.status(400).send("User Already exists")}

    jsonData.push(req.body)
    console.log(jsonData)
    fs.writeFile('users.json', JSON.stringify(jsonData), (err) => {
      if (err) {
          // throw err;
          return res.status(500).send(err.message)
      }
      console.log("JSON data is saved.");
  });

    res.status(201).send(req.body);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.put('/:id',auth,async(req,res)=>{
  try{
    let user = jsonData.filter(obj => {
      return obj.email == req.body.email
    })
    if(!user[0]){return res.status(404).send("User Not found")}
    for (var i = jsonData.length - 1; i >= 0; --i) {
      if (jsonData[i]._id == req.params.id) {
        console.log("Splicing")
          jsonData.splice(i,1);
      }
  }
  let userNew = {email:req.body.email, username:req.body.username, password:req.body.password, _id:req.params.id}
  
  jsonData.push(userNew)  
  console.log(jsonData)
    fs.writeFile('users.json', JSON.stringify(jsonData), (err) => {
      if (err) {
          // throw err;
          return res.status(500).send(err.message)
      }
      console.log("JSON data is saved.");
  });

    res.status(201).send(req.body);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.delete('/:id',auth, async(req,res)=>{
  try{
    let user = jsonData.filter(obj => {
      return obj._id == req.params.id
    })
    if(!user[0]){return res.status(404).send("User Not found")}
    for (var i = jsonData.length - 1; i >= 0; --i) {
      if (jsonData[i]._id == req.params.id) {
        console.log("Splicing")
          jsonData.splice(i,1);
      }
  }
  fs.writeFile('users.json', JSON.stringify(jsonData), (err) => {
    if (err) {
        // throw err;
        return res.status(500).send(err.message)
    }
    console.log("JSON data is saved.");
});
res.status(200).send("User Deleted")
}catch(err){
  res.status(500).send(err.message)
}
})

module.exports = router;