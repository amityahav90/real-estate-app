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
             user: result
           });
         } else {
           res.status(401).json({
             message: 'User creation failed.'
           });
         }
       })
       .catch(error => {
          res.status(500).json({
            message: 'Unknown error occurred.',
            error: error
          });
       });
  });
}

exports.updateUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const updatedUser = new User({
        _id: req.params.id,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        password: hash
      });

      User.findOneAndUpdate({ _id: req.params.id }, updatedUser, { new: true })
        .then(result => {
          if (result) {
            res.status(200).json({
              message: "Update Successfully!",
              user: result
            });
          } else {
            res.status(401).json({
              message: "Not an authorized user."
            });
          }
        })
        .catch(error => {
          res.status(500).json({
            message: 'User update has failed.',
            error: error
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

exports.getUserById = (req, res, next) => {
  const userId = req.params.id;
  User.findOne({ _id: userId })
    .then(result => {
      if (result) {
        res.status(200).json({
          message: 'User fetched successfully',
          user: result
        });
      } else {
        res.status(401).json({
          message: 'Failed to fetch user'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(deletedUser => {
      console.log(deletedUser);
      if (deletedUser.n > 0) {
        res.status(200).json({
          message: 'User deleted successfully.',
          userId: req.params.id
        });
      } else {
        res.status(401).json({
          message: 'Failed to delete user.'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
}
