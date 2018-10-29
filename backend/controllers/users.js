const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
     const newUser = new User({
       username: req.body.username,
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       role: req.body.role,
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

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      if (users) {
        res.status(200).json({
          message: 'Users fetched successfully',
          users: users
        });
      } else {
        res.status(401).json({
          message: 'Failed to fetch users'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Unknown error occurred.',
        error: error
      });
    });
}
