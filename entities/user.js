const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const userSchema = new mongoose.Schema({
    username: { 
      type: String,
      minlength: 3,
      maxlength: 255,
      // required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 255,
    }
  });

  userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, username: this.username}, process.env.JWT_PRIVATE_KEY);
    return token;
}

const User = mongoose.model('User', userSchema);

  
exports.userSchema = userSchema;
exports.User = User;