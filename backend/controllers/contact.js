const Contact = require('../models/contact');

exports.createContact = (req, res, next) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
    assetId: req.body.assetId
  });
  contact.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          message: 'success'
        });
      } else {
        res.status(401).json({
          message: 'failed'
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

exports.getAllMessages = (req, res, next) => {
  Contact.find()
    .then(messages => {
      if (messages) {
        res.status(200).json({
          message: 'Messages fetched successfully',
          messages: messages
        });
      } else {
        res.status(401).json({
          message: 'Failed to find any messages'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
}
