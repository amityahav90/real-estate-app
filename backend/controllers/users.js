const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
     const newUser = new User({
       username: req.body.username,
       password: hash
     });
      newUser.save()
       .then(result => {
         if (result) {
           res.status(200).json({
             message: 'User created successfully.',
             result: result
           });
         } else {
           res.status(401).json({
             message: 'User creation failed.'
           });
         }
       })
       .catch(error => {
          res.status(500).json({
            message: 'Unknown error occurred.'
          });
       });
  });
}
